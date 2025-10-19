// src/app/api/paypal/capture/route.ts
import { client } from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { orderID } = body;

  if (!orderID) {
    return NextResponse.json(
      { error: "Order ID is required" },
      { status: 400 }
    );
  }

  try {
    const PaypalClient = client();
    const req = new paypal.orders.OrdersCaptureRequest(orderID);
    req.requestBody({});

    const response = await PaypalClient.execute(req);

    // Check if the capture was successful
    if (response.result.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Failed to capture payment." },
        { status: 500 }
      );
    }

    // Here you can add logic to update your database, etc.
    // e.g., save the transaction details, update order status to 'paid'

    return NextResponse.json({
      success: true,
      details: {
        id: response.result.id,
        status: response.result.status,
        payer: response.result.payer,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
