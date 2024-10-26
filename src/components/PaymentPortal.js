import React, { useState } from 'react';
import axios from 'axios';

function PaymentPortal() {
  const [email, setEmail] = useState('');
  const [amountNaira, setAmountNaira] = useState(''); // Amount in Naira
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const amountKobo = parseFloat(amountNaira) * 100; // Convert to kobo

    try {
      // Make API call to initialize payment on the backend
      const response = await axios.post('http://localhost:8080/api/payments/initialize', {
        email,
        amount: amountKobo,
      });
      
      // Redirect user to Paystack if initialization is successful
      if (response.data && response.data.data && response.data.data.authorization_url) {
        window.location.href = response.data.data.authorization_url;
      } else {
        setError('Failed to initialize payment. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during payment initialization.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Pay Annual Subscription</h2>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-semibold text-gray-700">Amount (₦)</label>
            <input
              type="number"
              name="amount"
              value={amountNaira}
              onChange={(e) => setAmountNaira(e.target.value)}
              className="mt-1 p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount in Naira"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out font-semibold tracking-wider"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default PaymentPortal;
