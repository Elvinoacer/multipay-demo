// app/api/intasend/stk-push/route.ts
import { NextRequest, NextResponse } from "next/server";
import IntaSend from "intasend-node";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, amount, phone_number, api_ref } =
      body;

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
      // process.env.NODE_ENV !== "production" // Test mode in non-prod
      false
    );

    // The host and callback_url should preferably be set in your environment variables
    const host = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const collection = intasend.collection();
    const resp = await collection.mpesaStkPush({
      first_name,
      email,
      amount: Number(amount),
      phone_number,
      api_ref: `stk-${Date.now()}`,
      callback_url: `${host}/api/intasend-webhook`,
    });

    return NextResponse.json(resp);
  } catch (error: any) {
    console.error(
      "IntaSend STK Push Error:",
      error.response?.data || error.message || error
    );
    return NextResponse.json(
      {
        error:
          error.response?.data?.detail || "Failed to initiate M-Pesa STK Push",
      },
      { status: error.response?.status || 500 }
    );
  }
}
