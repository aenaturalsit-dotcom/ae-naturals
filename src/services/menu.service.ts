// src/services/menu.service.ts
import { apiClient } from '@/lib/api-client';

export interface MenuItem {
  id: string;
  label: string;
  slug: string;
  type: string;
}

export interface MenuGroup {
  id: string;
  title: string;
  image?: string;
  link?: string;
  items: MenuItem[];
}

export interface MenuData {
  id: string;
  name: string;
  slug: string;
  groups: MenuGroup[];
}

export const menuService = {
  async getMegaMenu(slug: string): Promise<MenuData | null> {
    try {
      // If your apiClient interceptor already injects x-store-id, you don't need the headers object here.
      // I've included it just in case it's needed for server-side calls where localStorage/cookies might not auto-attach.
      const { data } = await apiClient.get(`/menus/${slug}`, {
        headers: {
          'x-store-id': process.env.NEXT_PUBLIC_STORE_ID as string,
        }
      });
      
      return data;
    } catch (error) {
      console.error(`Failed to fetch mega menu (${slug}):`, error);
      return null;
    }
  }
};