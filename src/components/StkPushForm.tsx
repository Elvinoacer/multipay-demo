// components/StkPushForm.tsx
"use client";

import { useState } from "react";
import { usePaymentStore } from "@/stores/intasend/paymentStore";

export default function StkPushForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    amount: "",
    phone_number: "",
    api_ref: "test",
  });

  const { initiateStkPush, loading, error, paymentData } = usePaymentStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await initiateStkPush({ ...formData, amount: parseFloat(formData.amount) });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Pay with M-Pesa STK Push
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="first_name"
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-500 text-gray-900"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <input
            name="last_name"
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-500 text-gray-900"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-500 text-gray-900"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="amount"
            type="number"
            placeholder="Amount (KES)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-500 text-gray-900"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <input
            name="phone_number"
            placeholder="Phone Number (e.g., 2547...)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-500 text-gray-900"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-800 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Processing..." : "Pay with M-Pesa"}
        </button>
      </form>
      {error && <p className="mt-4 text-red-600 bg-red-100 p-3 rounded-lg text-center">{error}</p>}
      {paymentData && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-gray-700 mb-2">Payment Status:</h3>
          <pre className="text-sm text-gray-800 whitespace-pre-wrap break-all">
            {JSON.stringify(paymentData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
