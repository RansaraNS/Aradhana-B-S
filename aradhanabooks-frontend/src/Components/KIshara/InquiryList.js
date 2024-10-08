import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./InquiryList.css"; // Import the CSS file

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get("/api/inquiries");
        setInquiries(response.data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/inquiries/${id}`);
      setInquiries(inquiries.filter(inquiry => inquiry._id !== id));
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const handleMarkAsRead = (id) => {
    // Update the local state immediately to give instant feedback
    setInquiries(inquiries.map(inquiry => 
      inquiry._id === id ? { ...inquiry, read: true } : inquiry
    ));

    
  };

  return (
    <div className="Chamu_inquiryListContainer">
      {/* Dashboard Button */}
      <button 
        className="Chamu_dashboardButton" 
        onClick={() => navigate("/report")}
        style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Dashboard
      </button>
      <h2 className="Chamu_List">Inquiry List</h2>
      <div className="Chamu_inquiryGrid">
        {inquiries.map((inquiry) => (
          <div className={`Chamu_inquiryBox ${inquiry.read ? 'read' : ''}`} key={inquiry._id}>
            <h4>Order ID: {inquiry.orderId}</h4>
            <p>Customer Name: {inquiry.customerName}</p>
            <p>Contact Number: {inquiry.contactNumber}</p>
            <p>Inquiry Type: {inquiry.inquiryType}</p>
            <p>Description: {inquiry.description}</p>
            <br />
            <hr />
            <div className="Chamu_buttonGroup">
              {/* Only show the Mark as Read button if the inquiry is not read */}
              {!inquiry.read && (
                <button onClick={() => handleMarkAsRead(inquiry._id)}>Mark as Read</button>
              )}
              <button onClick={() => handleDelete(inquiry._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InquiryList;
