import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Sendemail.css';



const SendEmail = () => {
  const location = useLocation();
  const { email, orderId } = location.state || {}; // Get email and orderId from state
  const [message, setMessage] = useState(`Dear Customer,\n\nYour order ${orderId} has been canceled. If you have any questions, feel free to reach out.\n\nThank you!`);
  const navigate = useNavigate();

  // Function to send email
  const handleSendEmail = async () => {
    try {
      await axios.post('http://localhost:2001/api/send-email', {
        email,
        message,
      });
      alert("Email sent successfully!");
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Email sent Successfully.");
    }
  };

  return (
    <div className="Chamu_sendEmailContainer">
      {/* Dashboard Button */}
      <button 
        className="Chamu_dashboardButton" 
        onClick={() => navigate("/report")}
        style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Dashboard
      </button>
      <h2 className="Chamu_heading">Send Email</h2>
      <p>To: {email}</p>
      <textarea
        rows="10"
        cols="50"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
};

export default SendEmail;
