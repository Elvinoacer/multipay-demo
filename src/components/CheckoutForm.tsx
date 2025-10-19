// components/CheckoutForm.tsx
"use client";

import { useState } from "react";
import { usePaymentStore } from "@/stores/intasend/paymentStore";

export default function CheckoutForm() {
  const [amount, setAmount] = useState("");

  const { checkoutState, generateCheckoutLink } = usePaymentStore();
  const { loading, error, checkoutUrl } = checkoutState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateCheckoutLink({
      amount: parseFloat(amount),
      currency: "KES",
      // The first_name, last_name, and email can be collected on the IntaSend-hosted page
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Generate Card/Bank Checkout Link
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="amount"
          type="number"
          placeholder="Amount (KES)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-500 text-gray-900"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading || !amount}
          className="w-full bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Generating..." : "Generate Payment Link"}
        </button>
      </form>
      {error && <p className="mt-4 text-red-600 bg-red-100 p-3 rounded-lg text-center">{error}</p>}
      {checkoutUrl && (
        <div className="mt-4 text-center">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            Proceed to Checkout
          </a>
        </div>
      )}
    </div>
  );
}
