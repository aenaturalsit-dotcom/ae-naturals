"use client";

import React, { useState } from "react";
import { ShoppingCart, Loader2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    variants?: any[]; // 🔥 Added to check real inventory
    stock?: number;   // Base product fallback stock
  };
  variantId?: string;
  // We remove the default = 100 to allow the logic to rely on DB data
  stock?: number; 
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  variantId,
  stock: propStock,
}) => {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * 🔥 SMART STOCK RESOLUTION
   * 1. If a specific variant is selected, use its stock.
   * 2. If no variant is selected (e.g., on a Product Card), sum up ALL variant stock.
   * 3. Fallback to the base product stock if no variants exist.
   */
  const calculateAvailableStock = () => {
    // Priority 1: Specific variant stock
    if (variantId && product.variants) {
      const selectedVariant = product.variants.find(v => v.id === variantId);
      return selectedVariant?.stock ?? 0;
    }

    // Priority 2: Aggregate stock from all variants (for Product Cards)
    if (product.variants && product.variants.length > 0) {
      return product.variants.reduce((acc, v) => acc + (v.stock || 0), 0);
    }

    // Priority 3: Fallback to prop or base product stock
    return propStock ?? product.stock ?? 0;
  };

  const availableStock = calculateAvailableStock();

  const cartItem = items.find(
    (item) =>
      item.productId === product.id &&
      (item.variantId || undefined) === (variantId || undefined)
  );

  const currentQuantity = cartItem?.quantity || 0;

  /* ---------------- ACTIONS ---------------- */

  const handleAddInitial = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (availableStock <= 0) return;

    setIsProcessing(true);
    await addItem({
      productId: product.id,
      variantId,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      quantity: 1,
    });
    setIsProcessing(false);
  };

  const handleIncrease = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentQuantity >= availableStock) return;

    setIsProcessing(true);
    await updateQuantity(product.id, currentQuantity + 1, variantId);
    setIsProcessing(false);
  };

  const handleDecrease = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsProcessing(true);
    if (currentQuantity === 1) {
      await removeItem(product.id, variantId);
    } else {
      await updateQuantity(product.id, currentQuantity - 1, variantId);
    }
    setIsProcessing(false);
  };

  /* ---------------- UI STATES ---------------- */

  if (availableStock <= 0) {
    return (
      <button
        disabled
        className="w-full h-12 rounded-xl bg-zinc-100 text-zinc-400 text-sm font-bold tracking-wide cursor-not-allowed border border-zinc-200"
      >
        OUT OF STOCK
      </button>
    );
  }

  if (currentQuantity > 0) {
    return (
      <div
        className="flex items-center justify-between w-full h-12 rounded-xl border-2 border-[#006044] bg-white px-1 overflow-hidden"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
      >
        <button
          onClick={handleDecrease}
          disabled={isProcessing}
          className="h-full w-12 flex items-center justify-center text-[#006044] hover:bg-zinc-50 transition active:scale-90"
        >
          <Minus className="w-5 h-5 stroke-[3px]" />
        </button>

        <span className="text-lg font-black text-[#006044] w-10 text-center">
          {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : currentQuantity}
        </span>

        <button
          onClick={handleIncrease}
          disabled={isProcessing || currentQuantity >= availableStock}
          className="h-full w-12 flex items-center justify-center text-[#006044] hover:bg-zinc-50 transition active:scale-90 disabled:opacity-30"
        >
          <Plus className="w-5 h-5 stroke-[3px]" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddInitial}
      disabled={isProcessing}
      className="w-full h-12 rounded-xl bg-[#006044] text-white text-sm font-black tracking-widest flex items-center justify-center gap-3 hover:bg-[#004d36] shadow-lg shadow-green-100 active:scale-95 transition-all"
    >
      {isProcessing ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          ADD TO CART
        </>
      )}
    </button>
  );
};