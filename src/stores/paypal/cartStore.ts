// src/stores/paypal/cartStore.ts
import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  getTotal: () => number;
  paymentStatus: "idle" | "processing" | "success" | "error";
  setPaymentStatus: (status: CartState["paymentStatus"]) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [
    {
      id: "1",
      name: "cardigan",
      price: 50,
      quantity: 2,
    },
  ],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  getTotal: () => {
    const total = get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    console.log("Cart Total:", total); // Debug log
    return total;
  },
  paymentStatus: "idle",
  setPaymentStatus: (status) => set({ paymentStatus: status }),
  errorMessage: "",
  setErrorMessage: (message) => set({ errorMessage: message }),
}));
