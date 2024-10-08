import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

const CardPayment = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  require('./tailwind.css')

  // Get the subtotal, shippingCharges, and total from the location state
  const { subtotal, shippingCharges, total } = location.state || { subtotal: 0, shippingCharges: 0, total: 0 };

  const onSubmit = (data) => {
    console.log(data); // Process card payment details 
    navigate('/payment-success'); // Redirect to success page after processing payment
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex justify-center items-center py-12">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Payment Information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Card Number *</label>
              <input
                type="text"
                className={`w-full border ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                } rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="1234 5678 9012 3456"
                {...register('cardNumber', { 
                  required: 'Card number is required',
                  pattern: {
                    value: /^\d{16}$/,
                    message: 'Card number must be 16 digits',
                  }
                })}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-2 ">{errors.cardNumber.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Expiry Date *</label>
                <input
                  type="text"
                  className={`w-full border ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  placeholder="MM/YY"
                  {...register('expiryDate', { 
                    required: 'Expiry date is required',
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                      message: 'Invalid expiry date format (MM/YY)',
                    }
                  })}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-2">{errors.expiryDate.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">CVV *</label>
                <input
                  type="text"
                  className={`w-full border ${
                    errors.cvv ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  placeholder="123"
                  {...register('cvv', { 
                    required: 'CVV is required',
                    pattern: {
                      value: /^\d{3,4}$/,
                      message: 'CVV must be 3 or 4 digits',
                    }
                  })}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-2">{errors.cvv.message}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name on Card *</label>
              <input
                type="text"
                className={`w-full border ${
                  errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                } rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="John Doe"
                {...register('nameOnCard', { required: 'Name on card is required' })}
              />
              {errors.nameOnCard && (
                <p className="text-red-500 text-sm mt-2 ">{errors.nameOnCard.message}</p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="mb-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-700 mt-4">
                <span>Shipping</span>
                <span>Rs. {shippingCharges}</span>
              </div>
            </div>
            <hr />
            <div className="flex justify-between text-gray-900 font-bold mt-4">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div> 
 
        
          <button
            type="submit"
            className="bg-pink-700 hover:bg-pink-800 text-white w-full rounded-lg py-3 mt-6 font-semibold shadow-md hover:shadow-lg"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardPayment;
