import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF generation
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import aradhanabooklogo from "../../Images/Aradhana Books & Stationary Logo.png"; // Import logo for PDF
import './CancelOrders.css'; // Import CSS file

const CancelOrders = () => {
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [canceledCount, setCanceledCount] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch canceled orders from the backend
  useEffect(() => {
    const fetchCanceledOrders = async () => {
      try {
        const response = await axios.get('http://localhost:2001/api/orders/canceled');
        setCanceledOrders(response.data);
        setCanceledCount(response.data.length);
      } catch (err) {
        console.error("Error fetching canceled orders:", err);
      }
    };

    fetchCanceledOrders();
  }, []);

  // Function to navigate to SendEmail page
  const handleSendEmail = (customerEmail, orderId) => {
    navigate('/send-email', {
      state: { email: customerEmail, orderId }, // Pass necessary data
    });
  };

  // Function to generate PDF for all canceled orders
  const generateCanceledOrdersPDF = () => {
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

    // Title for canceled orders
    doc.setFont("Jura", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Canceled Orders", 70, 40);

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
    canceledOrders.forEach((order, index) => {
      const rowY = startY + (index + 1) * 10; // Adjust row height
      doc.text(order.customOrderId, 10, rowY);
      doc.text(`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`, 50, rowY);
      doc.text(order.shippingAddress.phone, 100, rowY);
      doc.text(order.shippingAddress.email, 130, rowY); // Add email
      doc.text(`Rs. ${order.total.toFixed(2)}`, 170, rowY);
    });

    // Save the PDF
    doc.save('CanceledOrders.pdf');
  };

  return (
    <div className="Chamu_cancelOrdersContainer">

      {/* Dashboard Button */}
      <button 
        className="Chamu_dashboardButton" 
        onClick={() => navigate("/report")}
        style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Dashboard
      </button>
      <h2 className="Chamu_heading">Canceled Orders</h2>
      <p className="Chamu_descriptionAdd">
        On this page, you can view all orders that have been canceled.<br />
        This allows you to keep track of the orders that did not complete the processing. <br />
        You can monitor which orders were canceled and their details.
      </p>

      {/* Display count */}
      <p className="Chamu_count">
        Total Canceled Orders: {canceledCount}
        <button className="Chamu_DownloadAllButton" onClick={generateCanceledOrdersPDF} style={{ marginLeft: '10px' }}>
          Download All as PDF
        </button>
      </p>

      {canceledOrders.length === 0 ? (
        <p className="Chamu_noOrders">No orders have been canceled.</p>
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
            {canceledOrders.map(order => (
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
                <td className="Chamu_tableCell">{order.status}</td>
                <td className="Chamu_tableCell">
                  <button className="Chamu_sendEmailButton" onClick={() => handleSendEmail(order.shippingAddress.email, order.customOrderId)}>
                    Send Email
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

export default CancelOrders;
