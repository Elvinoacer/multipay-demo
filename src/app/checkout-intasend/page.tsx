// app/payments/page.tsx
import StkPushForm from "@/components/StkPushForm";
import CheckoutForm from "@/components/CheckoutForm";

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Intasend Payment Options
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StkPushForm />
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
