// src/stores/intasend/paymentStore.ts (Zustand store)
import { create } from "zustand";

interface PaymentState {
  loading: boolean;
  error: string | null;
  paymentData: any | null;
  checkoutUrl: string | null;
  initiateStkPush: (data: any) => Promise<void>;
  generateCheckoutLink: (data: any) => Promise<void>;
  reset: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  loading: false,
  error: null,
  paymentData: null,
  checkoutUrl: null,
  async initiateStkPush(data) {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/intasend/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to initiate STK Push");
      const result = await response.json();
      set({ paymentData: result });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  async generateCheckoutLink(data) {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/intasend/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to generate checkout link");
      const result = await response.json();
      set({ checkoutUrl: result.url, paymentData: result });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  reset: () =>
    set({ loading: false, error: null, paymentData: null, checkoutUrl: null }),
}));
