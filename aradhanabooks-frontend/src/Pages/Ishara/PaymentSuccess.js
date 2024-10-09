import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-6">Your order has been placed successfully. Thank you for choosing our shop!</p>
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded-lg"
          onClick={() => navigate('/dashboard')}
        > 
          Return to Profile
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
