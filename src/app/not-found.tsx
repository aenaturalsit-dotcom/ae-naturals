"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import Lottie from "lottie-react";
import notFoundAnimation from "@/assets/animations/404.json"; // place your JSON here

export default function NotFound() {
  const { openSearch } = useUIStore();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50">
      
      <div className="max-w-xl w-full text-center space-y-6">
        
        {/* Animated Illustration */}
        <div className="w-64 h-64 mx-auto">
          <Lottie 
            animationData={notFoundAnimation} 
            loop={true}
            className="w-full h-full"
          />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          Page not found
        </h1>

        <p className="text-lg text-gray-600 font-medium">
          We couldn’t find what you’re looking for.
        </p>

        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Try searching for products or return to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          
          <button
            onClick={openSearch}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#217A6E] hover:bg-[#1b6157] text-white font-semibold rounded-full shadow-md transition-all"
          >
            <Search size={18} />
            Search Products
          </button>

          <Link 
            href="/"
            className="px-6 py-3 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold rounded-full shadow-sm transition"
          >
            Go Home
          </Link>

        </div>

      </div>
    </div>
  );
}