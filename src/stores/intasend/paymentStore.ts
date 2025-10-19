import { create } from "zustand";

type ActionState = {
  loading: boolean;
  error: string | null;
};

interface PaymentState {
  stkState: ActionState & { paymentData: any | null };
  checkoutState: ActionState & { checkoutUrl: string | null };
  initiateStkPush: (data: any) => Promise<void>;
  generateCheckoutLink: (data: any) => Promise<void>;
  reset: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  stkState: {
    loading: false,
    error: null,
    paymentData: null,
  },
  checkoutState: {
    loading: false,
    error: null,
    checkoutUrl: null,
  },

  async initiateStkPush(data) {
    set((state) => ({ stkState: { ...state.stkState, loading: true, error: null } }));
    try {
      const response = await fetch("/api/intasend/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to initiate STK Push");
      }
      set((state) => ({ stkState: { ...state.stkState, paymentData: result } }));
    } catch (err) {
      set((state) => ({ stkState: { ...state.stkState, error: (err as Error).message } }));
    } finally {
      set((state) => ({ stkState: { ...state.stkState, loading: false } }));
    }
  },

  async generateCheckoutLink(data) {
    set((state) => ({ checkoutState: { ...state.checkoutState, loading: true, error: null } }));
    try {
      const response = await fetch("/api/intasend/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to generate checkout link");
      }
      set((state) => ({ checkoutState: { ...state.checkoutState, checkoutUrl: result.url } }));
    } catch (err) {
      set((state) => ({ checkoutState: { ...state.checkoutState, error: (err as Error).message } }));
    } finally {
      set((state) => ({ checkoutState: { ...state.checkoutState, loading: false } }));
    }
  },

  reset: () =>
    set({
      stkState: { loading: false, error: null, paymentData: null },
      checkoutState: { loading: false, error: null, checkoutUrl: null },
    }),
}));
