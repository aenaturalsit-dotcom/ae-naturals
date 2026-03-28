// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export function useProducts(categorySlug?: string) {
  return useQuery({
    // 1. Generic query key. The data is implicitly scoped to the current 
    // tenant domain, so we don't need the store slug here anymore.
    queryKey: ['products', 'catalog'],
    
    queryFn: async () => {
      // 2. Pointing to the new dynamic endpoint. 
      // apiClient will automatically attach the 'x-tenant-domain' header.
      const response: any = await apiClient.get('/products/catalog');
      
      const data = response?.data || response;
      return Array.isArray(data?.products) ? data.products : (Array.isArray(data) ? data : []); 
    },
    
    // 3. Use `select` to filter the data client-side. 
    // React Query memoizes this and only returns the filtered subset.
    select: (products) => {
      if (categorySlug && products.length > 0) {
        return products.filter((p: any) => p.category?.slug === categorySlug);
      }
      return products;
    },
    
    // 4. Keep staleTime high. Products don't change every second.
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}