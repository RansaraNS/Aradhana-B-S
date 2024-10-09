import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf"; // Import jsPDF
import aradhanabooklogo from "../../Images/Aradhana Books & Stationary Logo.png";
import './InProgressOrders.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const InProgressOrders = () => {
  const [orders, setOrders] = useState([]);
  const [inProgressCount, setInProgressCount] = useState(0);
  const navigate = useNavigate(); // Use navigate to handle navigation

  // Fetch "In Progress" orders from the backend
  useEffect(() => {
    const fetchInProgressOrders = async () => {
      try {
        const response = await axios.get('http://localhost:2001/api/orders/in-progress');
        setOrders(response.data);
        setInProgressCount(response.data.length);
      } catch (err) {
        console.error("Error fetching In Progress orders:", err);
      }
    };

    fetchInProgressOrders();
  }, []);

  // Function to remove an order and update its status to Cancelled
  const handleRemove = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (confirmCancel) {
      try {
        await axios.put(`http://localhost:2001/api/orders/cancel/${orderId}`);
        setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
        setInProgressCount((prevCount) => prevCount - 1); // Update the in-progress count
      } catch (err) {
        console.error("Error cancelling the order:", err);
      }
    }
  };

  // Function to generate PDF for a single order
  const generatePDF = (order) => {
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
    
    // Order details heading
    doc.setFont("Arial", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Order Details", 10, 40);
    
    // Adding order details
    doc.setFont("Arial", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order ID: ${order.customOrderId}`, 10, 50);
    doc.text(`Customer Name: ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`, 10, 60);
    doc.text(`Phone Number: ${order.shippingAddress.phone}`, 10, 70);
    doc.text(`Email: ${order.shippingAddress.email}`, 10, 80); // Added email
    doc.text(`Total: Rs. ${order.total.toFixed(2)}`, 10, 90);
    
    // Save the PDF
    doc.save(`Order_${order.customOrderId}.pdf`);
  };

  // Function to generate PDF for all in-progress orders
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

    // Title and subtitle
    doc.setFont("Jura", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("In Progress Orders", 70, 40);
    
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
    doc.save('InProgressOrders.pdf');
  };

  return (
    <div className="Chamu_inProgressOrdersContainer">
      {/* Dashboard Button */}
      <button 
        className="Chamu_dashboardButton" 
        onClick={() => navigate("/report")}
        style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Dashboard
      </button>

      <h2 className="Chamu_heading">In Progress Orders</h2>
      <p className="Chamu_descriptionAdd">
        On this page, you can view all orders that are currently in progress.<br />
        These orders have been sent to Delivery Management for processing and are awaiting completion. <br />
        This functionality ensures that you can easily monitor the progress of orders and stay informed about their delivery timeline.
      </p>

      <p className="Chamu_count">
        Total In Progress Orders: {inProgressCount}
        <button className="Chamu_DownloadAllButton" onClick={generateAllOrdersPDF} style={{ marginLeft: '10px' }}>
          Download All as PDF
        </button>
      </p>
      {orders.length === 0 ? (
        <p className="Chamu_noOrders">No orders are currently in progress.</p>
      ) : (
        <table className="Chamu_ordersTable">
          <thead>
            <tr className="Chamu_tableHeader2">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Total</th>
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
                <td className="Chamu_tableCell">{order.status}</td>
                <td className="Chamu_tableCell">
                  <button className="Chamu_RemoveButton" onClick={() => handleRemove(order._id)}>Remove</button>
                  <button className="Chamu_GeneratePDFButton" onClick={() => generatePDF(order)}>PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InProgressOrders;
