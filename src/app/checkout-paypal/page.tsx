"use client";

import { useCartStore } from "@/stores/paypal/cartStore";
import PayPalButton from "@/components/PayPalButton";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotal());
  const paymentStatus = useCartStore((state) => state.paymentStatus);
  const errorMessage = useCartStore((state) => state.errorMessage);

  // For demo, add some items on mount or via buttons
  // In real app, add via addItem

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <PayPalButton />
      {paymentStatus === "processing" && <p>Processing...</p>}
      {paymentStatus === "success" && <p>Payment successful!</p>}
      {paymentStatus === "error" && <p>Error: {errorMessage}</p>}
    </div>
  );
}
