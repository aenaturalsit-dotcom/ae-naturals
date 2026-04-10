// src/components/ui/ProductCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { useAddToCart } from "@/hooks/useAddToCart";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    oldPrice?: number;
    images: string[];
    rating?: number;
    reviewCount?: number;
    // 🔥 FIX: Accept either an object OR a string
    category?: { name: string } | string; 
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { handleAddToCart, isAdding } = useAddToCart();

  // Calculate discount percentage if oldPrice exists
  const discountPercent = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // 🔥 Helper to safely extract the category name regardless of data shape
  const categoryName = typeof product.category === 'string' 
    ? product.category 
    : product.category?.name;

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      
      {/* --- IMAGE & BADGES --- */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.images?.[0] || "/placeholder-product.png"}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-sm">
            {discountPercent}% OFF
          </div>
        )}
      </Link>

      {/* --- CONTENT DETAILS --- */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Rating & Category Row */}
        <div className="flex justify-between items-center mb-2">
          {product.rating && (
            <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-xs font-bold text-yellow-700">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span>{product.rating.toFixed(1)}</span>
              {product.reviewCount ? (
                <span className="text-yellow-600/70 font-medium border-l border-yellow-200 pl-1 ml-0.5">
                  ({product.reviewCount})
                </span>
              ) : null}
            </div>
          )}
          {/* 🔥 Safe Category Render */}
          {categoryName && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
              {categoryName}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-snug line-clamp-2 mb-3 group-hover:text-[#006044] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex-grow" /> {/* Spacer */}

        {/* Pricing */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-black text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.oldPrice && (
            <span className="text-sm font-medium text-gray-400 line-through">
              ₹{product.oldPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(product)}
          disabled={isAdding}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-[#006044] text-white py-2.5 rounded-xl font-bold text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isAdding ? (
            <span className="animate-pulse">ADDING...</span>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              ADD TO CART
            </>
          )}
        </button>
      </div>
    </div>
  );
}