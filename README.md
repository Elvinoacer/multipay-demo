# Next.js Payments Integration Demo

This is a sample project demonstrating how to integrate multiple payment gateways into a Next.js application. It includes examples for handling payments with both PayPal and IntaSend.

## Features

- **PayPal Checkout**: Full order creation and payment capture flow.
- **IntaSend Payments**:
  - Generate a generic checkout link for card and bank payments.
  - Initiate M-Pesa payments using STK Push.
- **Modern Frontend**: A clean, responsive, and accessible UI built with Tailwind CSS.
- **State Management**: Client-side state managed with Zustand.

## Technologies Used

- [Next.js](https://nextjs.org/) – React Framework
- [React](https://reactjs.org/) – UI Library
- [TypeScript](https://www.typescriptlang.org/) – Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) – Utility-First CSS Framework
- [Zustand](https://github.com/pmndrs/zustand) – Minimalist State Management
- [IntaSend Node SDK](https://github.com/IntaSend/intasend-node) – for IntaSend payments
- [PayPal Checkout Server SDK](https://github.com/paypal/Checkout-NodeJS-SDK) – for PayPal payments

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

Install the necessary packages using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

This project requires API keys and credentials to connect to the payment services. Create a file named `.env.local` in the root of your project.

Copy the following content into your `.env.local` file:

```env
#-------------------------------------
# PayPal API Credentials
#-------------------------------------
# Found in your PayPal Developer Dashboard
PAYPAL_CLIENT_ID=YOUR_PAYPAL_LIVE_CLIENT_ID
PAYPAL_CLIENT_SECRET=YOUR_PAYPAL_LIVE_SECRET_KEY
NEXT_PUBLIC_PAYPAL_CLIENT_ID=YOUR_PAYPAL_LIVE_CLIENT_ID

#-------------------------------------
# IntaSend API Credentials
#-------------------------------------
# Found in your IntaSend Dashboard -> Settings -> API Keys
INTASEND_PUBLISHABLE_KEY=YOUR_INTASEND_PUBLISHABLE_KEY
INTASEND_SECRET_KEY=YOUR_INTASEND_SECRET_KEY

#-------------------------------------
# Application URL
#-------------------------------------
# Your local development URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Replace the placeholder values (`YOUR_..._KEY`) with your actual credentials from the PayPal and IntaSend dashboards.

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

The following API routes are defined in the application:

- `/api/paypal/create`: Creates a PayPal order.
- `/api/paypal/capture`: Captures a completed PayPal payment.
- `/api/intasend/checkout`: Generates a generic IntaSend checkout link.
- `/api/intasend/stk-push`: Initiates an M-Pesa STK Push transaction.
- `/api/intasend-webhook`: (Placeholder) Receives the final transaction status from IntaSend.

## Author

- **elvin**