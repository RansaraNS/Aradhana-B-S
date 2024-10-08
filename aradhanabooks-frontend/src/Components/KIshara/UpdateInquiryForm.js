import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateInquiryForm.css";

function UpdateInquiryForm() {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState({
    orderId: "",
    customerName: "",
    contactNumber: "",
    inquiryType: "",
    description: "",
  });
  const [contactNumberError, setContactNumberError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await axios.get(`/api/inquiries/${id}`);
        setInquiry(response.data);
      } catch (error) {
        console.error("Error fetching inquiry:", error);
      }
    };

    fetchInquiry();
  }, [id]);

  const handleChange = (e) => {
    setInquiry({ ...inquiry, [e.target.name]: e.target.value });
  };

  const validateContactNumber = (number) => {
    const contactNumberPattern = /^0\d{9}$/; // Regex for validating contact number
    return contactNumberPattern.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate contact number
    if (!validateContactNumber(inquiry.contactNumber)) {
      setContactNumberError("Contact number must be 10 digits and start with 0.");
      return;
    } else {
      setContactNumberError("");
    }

    try {
      await axios.put(`/api/inquiries/${id}`, inquiry);
      navigate(`/inquiry/${id}`); // Redirect to inquiry detail page after updating
    } catch (error) {
      console.error("Error updating inquiry:", error);
    }
  };

  return (
    <div className="chamu_form_inquiry">
      <div className="Chamu_inquiryFormContainer">
        <h2>Update Inquiry</h2>
        <form onSubmit={handleSubmit}>
          <div className="Chamu_formGroup">
            <label>Order ID:</label>
            <input
              type="text"
              name="orderId"
              value={inquiry.orderId}
              onChange={handleChange}
              required
              className="Chamu_readOnlyInput"
              readOnly
            />
          </div>
          <div className="Chamu_formGroup">
            <label>Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={inquiry.customerName}
              onChange={handleChange}
              required
              className="Chamu_readOnlyInput"
              readOnly
            />
          </div>
          <div className="Chamu_formGroup">
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={inquiry.contactNumber}
              onChange={handleChange}
              required
            />
            {contactNumberError && (
              <p className="error-message">{contactNumberError}</p>
            )}
          </div>
          <div className="Chamu_formGroup">
            <label>Inquiry Type:</label>
            <select
              name="inquiryType"
              value={inquiry.inquiryType}
              onChange={handleChange}
              required
            >
              <option value="">Select Inquiry Type</option>
              <option value="Order Status">Order Status</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Product Query">Product Query</option>
              <option value="Cancellation">Cancellation</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>
          <div className="Chamu_formGroup">
            <label>Description:</label>
            <textarea
              name="description"
              value={inquiry.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="Chamu_submitButtonForm">
            Update Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateInquiryForm;
