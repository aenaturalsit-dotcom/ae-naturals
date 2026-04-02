// src/app/checkout/[orderId]/page.tsx
"use client";
import { paymentService } from "@/services/payment.service";
import React, { useEffect, useState } from "react";

export default function CheckoutProcess({ params }: { params: Promise<{ orderId: string }> }) {
  // ✅ UNWRAP THE PARAMS USING React.use()
  const resolvedParams = React.use(params);
  const orderId = resolvedParams.orderId;

  useEffect(() => {
    // Now orderId is a real string, not undefined!
    if (!orderId) return;

    const initiate = async () => {
      try {
        const response = await paymentService.initiatePayment(orderId, "PAYU");
        // ... handle response
      } catch (error) {
        console.error(error);
      }
    };

    initiate();
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006044]"></div>
      <p className="mt-4 text-gray-600">Redirecting to secure payment...</p>
    </div>
  );
}