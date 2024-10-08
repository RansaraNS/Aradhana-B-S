import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import CHeader from '../../Components/Sasin/HomeHead';
import CFooter from '../../Components/Sasin/HomeFoot';

const RefundProcess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state;
  require('./tailwind.css')

  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!deliveryStatus) errors.deliveryStatus = 'Delivery status is required.';
    if (!refundReason) errors.refundReason = 'Refund reason is required.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const refundData = {
        orderId: order._id,
        total: order.total,
        reason: refundReason,
        deliveryStatus: deliveryStatus,
        description: description,
        refundDate: new Date(), 
      };

      try {
        // Send refund request
        await axios.post('http://localhost:2001/api/refunds/create', refundData);

        // Update the order to mark refund as requested
        await axios.patch(`http://localhost:2001/api/orders/${order._id}/request-refund`);

        navigate('/orders'); // Redirect after successful submission
      } catch (error) {
        console.error('Error submitting refund request:', error.response?.data || error.message);
      }
    }
  };

  return (
    <div><CHeader /> <div  className='py-8 '></div>
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Refund Process</h1>

      {/* Order Information */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold">Order #{order.customOrderId}</h2>
        <p className="text-sm text-gray-600">Total: LKR {order.total}</p>
        <ul className="list-disc list-inside">
          {order.items.map(({ item, quantity }) => (
            <li key={item._id}>{quantity} x {item.itemName}</li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Delivery Status */}
        <div className="bg-white shadow-md p-4 rounded-lg mb-6 relative">
          <label className="block font-bold mb-2">Delivery Status</label>
          <select
            className={`w-full p-2 border rounded ${errors.deliveryStatus ? 'border-red-500' : 'border-gray-300'}`}
            value={deliveryStatus}
            onChange={(e) => setDeliveryStatus(e.target.value)}
          >
            <option value="">Select delivery status</option>
            <option value="Delivered">Delivered</option>
            <option value="In Transit">In Transit</option>
            <option value="Not Delivered">Not Delivered</option>
          </select>
          {errors.deliveryStatus && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <FaExclamationTriangle className="mr-1" /> {errors.deliveryStatus}
            </p>
          )}
        </div>

        {/* Reason for Refund */}
        <div className="bg-white shadow-md p-4 rounded-lg mb-6 relative">
          <label className="block font-bold mb-2">Select the reason from the list below</label>
          <select
            className={`w-full p-2 border rounded ${errors.refundReason ? 'border-red-500' : 'border-gray-300'}`}
            value={refundReason}
            onChange={(e) => setRefundReason(e.target.value)}
          >
            <option value="">Select reason</option>
            <option value="Received wrong item">Received wrong item</option>
            <option value="Damaged product">Damaged product</option>
            <option value="Not as described">Not as described</option>
            <option value="Other">Other</option>
          </select>
          {errors.refundReason && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <FaExclamationTriangle className="mr-1" /> {errors.refundReason}
            </p>
          )}
        </div>

        {/* Refund Amount */}
        <div className="bg-white shadow-md p-4 rounded-lg mb-6 relative">
          <label className="block font-bold mb-2">Refund Amount</label>
          <input
            type="text"
            value={`LKR ${order.total}`}
            readOnly
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
          <FaInfoCircle className="absolute right-4 top-4 text-gray-400" title="This amount is auto-calculated." />
        </div>

        {/* Description */}
        <div className="bg-white shadow-md p-4 rounded-lg mb-6 relative">
          <label className="block font-bold mb-2">Description</label>
          <textarea
            placeholder="Provide additional details..."
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded text-white font-semibold ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#c21c63] hover:bg-[#a41b53]'
          } transition duration-200`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Refund Request'}
        </button>
      </form>
    </div><CFooter /></div>
  );
};

export default RefundProcess;
