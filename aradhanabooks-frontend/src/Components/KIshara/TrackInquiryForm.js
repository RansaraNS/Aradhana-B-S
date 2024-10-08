import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TrackInquiryForm.css";

function TrackInquiryForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};

  const [contactNumber, setContactNumber] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [description, setDescription] = useState("");
  const [contactError, setContactError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Regular expression to validate contact number
    const contactNumberPattern = /^0\d{9}$/;
    if (!contactNumberPattern.test(contactNumber)) {
      setContactError("Contact number must be a 10-digit number starting with 0.");
      return;
    }

    // Create the inquiry object
    const inquiryData = {
      orderId: orderDetails.customOrderId,
      customerName: `${orderDetails.shippingAddress.firstName} ${orderDetails.shippingAddress.lastName}`,
      contactNumber,
      inquiryType,
      description,
    };

    try {
      // Submit the inquiry to the server
      const response = await axios.post("/api/inquiries", inquiryData);
      const inquiryId = response.data.inquiry._id; // Adjust according to your API response structure

      // Navigate to InquiryDetail page with the inquiry ID
      navigate(`/inquiry/${inquiryId}`);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      // Handle error (e.g., show a notification)
    }
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    // Remove any error message when the user starts editing the input
    setContactError("");

    // Ensure only digits are entered
    if (!isNaN(value)) {
      setContactNumber(value);
    }
  };

  return (
    <div className="chamu_form_inquiry">
      <div className="Chamu_inquiryFormContainer">
        <h2>Submit Your Inquiry</h2>
        <form onSubmit={handleSubmit}>
          <div className="Chamu_formGroup">
            <label>Order ID</label>
            <input
              type="text"
              value={orderDetails.customOrderId}
              readOnly
              className="Chamu_readOnlyInput"
            />
          </div>

          <div className="Chamu_formGroup">
            <label>Customer Name</label>
            <input
              type="text"
              value={`${orderDetails.shippingAddress.firstName} ${orderDetails.shippingAddress.lastName}`}
              readOnly
              className="Chamu_readOnlyInput"
            />
          </div>

          <div className="Chamu_formGroup">
            <label>Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={handleContactNumberChange}
              placeholder="Enter your contact number"
              required
            />
            {contactError && <p className="Chamu_errorMessage">{contactError}</p>}
          </div>

          <div className="Chamu_formGroup">
            <label>Inquiry Type</label>
            <select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              required
            >
              <option value="">Select Inquiry Type</option>
              <option value="Order Status">Order Status</option>
              <option value="Shipping Delay">Shipping Delay</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Product Issue">Product Issue</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="Chamu_formGroup">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your inquiry"
              required
            ></textarea>
          </div>

          <button type="submit" className="Chamu_submitButtonForm">
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}

export default TrackInquiryForm;
