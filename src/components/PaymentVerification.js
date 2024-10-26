import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentVerification() {
  const [statusMessage, setStatusMessage] = useState('Verifying payment...');
  const [isVerified, setIsVerified] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const reference = query.get('reference');

  useEffect(() => {
    const verifyPayment = async () => {
      if (reference) {
        try {
          const response = await axios.get(`http://localhost:8080/api/payments/verify/${reference}`);
          
          if (response.data.status === true) {
            setIsVerified(true);
            setStatusMessage(response.data.message || 'Payment verified successfully!');
          } else {
            setIsVerified(false);
            setStatusMessage(response.data.message || 'Payment was not completed. Please try again.');
          }
        } catch (error) {
          setIsVerified(false);
          setStatusMessage('Error verifying payment. Please try again.');
          console.error(error);
        }
      } else {
        setStatusMessage('No payment reference found. Payment was likely canceled.');
      }
    };

    verifyPayment();
  }, [reference]);

  const handleRetry = () => {
    navigate('/payment'); // Redirect user back to Payment Portal for retry
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6">Payment Status</h2>
        <p className={isVerified ? "text-green-500" : "text-red-500"}>{statusMessage}</p>
        
        {!isVerified && (
          <button
            onClick={handleRetry}
            className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out font-semibold"
          >
            Retry Payment
          </button>
        )}
      </div>
    </div>
  );
}

export default PaymentVerification;
