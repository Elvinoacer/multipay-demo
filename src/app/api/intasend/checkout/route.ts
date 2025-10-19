// app/api/intasend/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import IntaSend from "intasend-node";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // We only expect amount and currency from the client for a generic checkout link
    const { amount, currency = "KES" } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "A valid amount is required" },
        { status: 400 }
      );
    }

    if (
      !process.env.INTASEND_PUBLISHABLE_KEY ||
      !process.env.INTASEND_SECRET_KEY
    ) {
      return NextResponse.json(
        { error: "IntaSend keys not configured" },
        { status: 500 }
      );
    }

    const intasend = new IntaSend(
      process.env.INTASEND_PUBLISHABLE_KEY,
      process.env.INTASEND_SECRET_KEY,
      process.env.NODE_ENV !== "production" // Test mode in non-prod
    );

    // The host and redirect_url should preferably be set in your environment variables
    const host = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const collection = intasend.collection();
    const resp = await collection.charge({
      first_name: "Elvin", // Placeholder
      last_name: "Omondi", // Placeholder
      email: "omondielvin@gmail.com", // Placeholder
      host: host,
      amount: Number(amount),
      currency,
      redirect_url: `${host}/payment-success`, // Crucial parameter
      api_ref: `checkout-${Date.now()}`, // Simple unique reference
    });

    return NextResponse.json(resp);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to generate checkout link" },
      { status: 500 }
    );
  }
}
