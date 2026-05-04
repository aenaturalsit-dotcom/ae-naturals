// src/types/cashfree.d.ts

declare module '@cashfreepayments/cashfree-js' {
  export interface CashfreeCheckoutOptions {
    paymentSessionId: string;
    returnUrl?: string;
  }

  export interface CashfreeInstance {
    checkout: (options: CashfreeCheckoutOptions) => void;
  }

  export function load(config: {
    mode: 'sandbox' | 'production';
  }): Promise<CashfreeInstance | null>;
}