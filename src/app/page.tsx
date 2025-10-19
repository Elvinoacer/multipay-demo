import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Multi-Gateway Payment Demo
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          This application demonstrates how to integrate multiple payment gateways
          into a Next.js project. Choose a provider below to test a payment flow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PayPal Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              PayPal Checkout
            </h2>
            <p className="text-gray-600 mb-6 flex-grow">
              Demonstrates a standard client/server flow to create and capture a
              PayPal order using the official PayPal SDK.
            </p>
            <Link href="/checkout-paypal">
              <span className="inline-block w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Go to PayPal Demo
              </span>
            </Link>
          </div>

          {/* IntaSend Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              IntaSend Payments
            </h2>
            <p className="text-gray-600 mb-6 flex-grow">
              Explore two IntaSend methods: generating a checkout link for
              cards/banks and initiating an M-Pesa STK Push.
            </p>
            <Link href="/checkout-intasend">
              <span className="inline-block w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Go to IntaSend Demo
              </span>
            </Link>
          </div>
        </div>

        <footer className="mt-16">
          <a
            href="https://github.com/Elvinoacer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-gray-500 hover:text-gray-800 hover:underline transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>Follow me on GitHub</span>
          </a>
        </footer>
      </div>
    </main>
  );
}