// src/app/api/payu/callback/route.ts
import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client'; // ✅ Import your apiClient

export async function POST(req: Request) {
  try {
    // 1. Extract the POST form data sent by PayU
    const formData = await req.formData();
    const paymentData = Object.fromEntries(formData.entries());
    
    const txnid = paymentData.txnid as string;
    const status = paymentData.status as string;

    const baseUrl = req.headers.get('origin') || 'http://localhost:3001';

    if (status !== 'success') {
      return NextResponse.redirect(`${baseUrl}/checkout?error=payment_failed`);
    }

    // 2. ✅ Use apiClient instead of fetch
    // Note: apiClient already knows your backend URL and parses JSON automatically!
    const response = await apiClient.post('/payments/verify', {
      provider: 'PAYU',
      orderId: txnid, 
      paymentData: paymentData
    });

    // 3. Extract the data (assuming your interceptor returns response.data directly)
    const result = response.data || response; 

    // 4. Redirect user to your final visual success page
    if (result.success) {
      const finalOrderId = result.orderId || txnid;
      return NextResponse.redirect(`${baseUrl}/order-success/${finalOrderId}`); 
    } else {
      return NextResponse.redirect(`${baseUrl}/checkout?error=hash_mismatch`);
    }
  } catch (error: any) {
    console.error('PayU Callback Error:', error?.response?.data || error.message);
    const baseUrl = req.headers.get('origin') || 'http://localhost:3001';
    return NextResponse.redirect(`${baseUrl}/checkout?error=server_error`);
  }
}