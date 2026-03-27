"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore"; // 🔥 Import Cart Store
import apiClient from "@/lib/api-client";
import { AuthResponse } from "@/types/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuth, logout, _hasHydrated } = useAuthStore();
  const { fetchCart } = useCartStore(); // 🔥 Get fetchCart action
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await apiClient.get<any, AuthResponse>("/auth/me");
        
        if (res && res.access_token) {
          // 1. Restore Auth State
          setAuth(res.user, res.access_token);
          
          // 2. 🔥 FETCH CART NOW: Now that we have a token, grab the user's cart
          await fetchCart(); 
        } else {
          logout();
        }
      } catch (err) {
        console.warn("No active session. Remaining as guest.");
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (_hasHydrated) {
      initAuth();
    }
  }, [_hasHydrated, setAuth, logout, fetchCart]);

  if (!_hasHydrated || loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-[#006044] font-bold animate-pulse">Loading Session...</p>
      </div>
    );
  }

  return <>{children}</>;
}