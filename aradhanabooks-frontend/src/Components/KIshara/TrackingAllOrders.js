import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrackingAllOrders.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const TrackingAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch all orders from the backend
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get('http://localhost:2001/api/orders/tracking/all'); // API call to fetch all orders
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching all orders:", err);
      }
    };

    fetchAllOrders();
  }, []);

  // Function to handle viewing order details
  const handleViewOrder = (orderId) => {
    navigate(`/order/status/${orderId}`); // Navigate to the order details page using useNavigate
  };

  return (
    <div className="Chamu_allOrdersContainer">
      {/* Dashboard Button */}
      <button 
        className="Chamu_dashboardButton" 
        onClick={() => navigate("/report")}
        style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Dashboard
      </button>
      <h2 className="Chamu_heading">All Orders</h2>
      <p className="Chamu_descriptionAdd">
        Here you can view all orders, regardless of their stage. 
        The table below displays each order's details.
      </p>

      {orders.length === 0 ? (
        <p className="Chamu_noOrders">No orders found.</p>
      ) : (
        <table className="Chamu_ordersTable">
          <thead>
            <tr className="Chamu_tableHeader2">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th>Shipping Address</th>
              <th>Actions</th> {/* Added Actions column for buttons */}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="Chamu_tableRow">
                <td className="Chamu_tableCell">{order.customOrderId}</td>
                <td className="Chamu_tableCell">{`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}</td>
                <td className="Chamu_tableCell">Rs. {order.total.toFixed(2)}</td>
                <td className="Chamu_tableCell">{order.paymentMethod}</td>
                <td className="Chamu_tableCell">
                  {`${order.shippingAddress.address}, ${order.shippingAddress.district}, ${order.shippingAddress.city}`}
                  <br />
                  Phone: {order.shippingAddress.phone}
                  <br />
                  Email: {order.shippingAddress.email}
                </td>
                <td className="Chamu_tableCell">
                  <button 
                    className="Chamu_viewButton" 
                    onClick={() => handleViewOrder(order._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TrackingAllOrders;
