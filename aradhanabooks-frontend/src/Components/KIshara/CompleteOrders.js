import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf"; // Import jsPDF
import aradhanabooklogo from "../../Images/Aradhana Books & Stationary Logo.png"; // Import logo for the PDF
import './CompleteOrders.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const CompleteOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); // Use navigate for redirection
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0); // Add state for count

  // Fetch orders with status 'Received'
  useEffect(() => {
    const fetchCompleteOrders = async () => {
      try {
        const response = await axios.get('http://localhost:2001/api/orders/status/received'); // Fetch orders with status 'received'
        const completedOrders = response.data;
        setOrders(completedOrders);
        setCompletedOrdersCount(completedOrders.length); // Set the count of completed orders
      } catch (err) {
        console.error('Error fetching received orders:', err);
      }
    };

    fetchCompleteOrders();
  }, []);

  // Function to handle viewing order details
  const handleViewOrder = (orderId) => {
    navigate(`/order/status/${orderId}`); // Navigate to the order details page
  };

  // Function to generate PDF for all completed orders
  const generateAllOrdersPDF = () => {
    const doc = new jsPDF();

    // Add header image
    doc.addImage(aradhanabooklogo, 'PNG', 15, 3, 30, 20);

    // Title and subtitle
    doc.setFont("Jura", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Aradhana Books & Stationary®", 60, 15);

    doc.setFont("Jura", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Experience the Difference in Every Aisle", 80, 20);

    // Line
    doc.line(10, 25, 200, 25);

    // Title for completed orders
    doc.setFont("Jura", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Completed Orders", 70, 40);

    // Table Header
    const headers = ["Order ID", "Customer Name", "Phone Number", "Email", "Total"];
    doc.setFont("Arial", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const startY = 50;
    headers.forEach((header, index) => {
      doc.text(header, 10 + index * 40, startY);
    });

    // Table Rows
    doc.setFont("Arial", "normal");
    doc.setFontSize(12);
    orders.forEach((order, index) => {
      const rowY = startY + (index + 1) * 10; // Adjust the row height as needed
      doc.text(order.customOrderId, 10, rowY);
      doc.text(`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`, 50, rowY);
      doc.text(order.shippingAddress.phone, 100, rowY);
      doc.text(order.shippingAddress.email, 130, rowY); // Added email to table
      doc.text(`Rs. ${order.total.toFixed(2)}`, 170, rowY);
    });

    // Save the PDF
    doc.save('CompletedOrders.pdf');
  };

  return (
    <div className="Chamu_completeOrdersContainer">
      {/* Dashboard Button */}
      <button 
        className="Chamu_dashboardButton" 
        onClick={() => navigate("/report")}
        style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Dashboard
      </button>
      <h2 className="Chamu_heading">Completed Orders</h2>
      <p className="Chamu_descriptionAdd">
        Below are all the orders that are in "Completed" status (originally "Received").
      </p>

      {/* Display order count */}
      <p className="Chamu_orderCount2">
        Total Completed Orders: {completedOrdersCount}
        <button className="Chamu_DownloadAllButton" onClick={generateAllOrdersPDF} style={{ marginLeft: '10px' }}>
          Download All as PDF
        </button>
      </p>

      {orders.length === 0 ? (
        <p className="Chamu_noOrders">No completed orders found.</p>
      ) : (
        <table className="Chamu_ordersTable">
          <thead>
            <tr className="Chamu_tableHeader2">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th>Shipping Address</th>
              <th>Status</th>
              <th>Actions</th>
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
                <td className="Chamu_tableCell Chamu_completedStatus">Completed</td> {/* Show "Completed" status */}
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

export default CompleteOrders;
