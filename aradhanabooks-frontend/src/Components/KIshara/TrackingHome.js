import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TrackingHome.css";

function TrackingHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderDetails, setOrderDetails] = useState(null); // Store order details after search
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm) {
      alert("Please enter an Order ID or Phone Number");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:2001/track/${searchTerm}`
      );
      if (response.data) {
        setOrderDetails(response.data); // Set order details to display
        setError("");
      }
    } catch (error) {
      console.error(error);
      setOrderDetails(null); // Reset order details if an error occurs
      setError("Order not found or invalid Order ID/Phone Number");
    }
  };

  return (
    <div className="Chamu_container">
      <h1 className="Chamu_titleHome">Welcome to Tracking Portal</h1>

      <p className="Chamu_descriptionHome">
        As an admin, you can easily manage and track the status of all orders
        here. Search for specific orders by Order ID or Phone Number, update
        order stages, and generate detailed reports to streamline the packing
        and shipping process. Stay on top of all the orders with real-time
        tracking updates.
      </p>

      <div className="Chamu_searchContainer">
        <input
          type="text"
          placeholder="Enter Order ID or Phone Number"
          className="Chamu_searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="Chamu_searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>

      {orderDetails && (
        <div className="Chamu_statusContainer2">
          <h3>Order Details</h3>
          <p>Order ID: {orderDetails.customOrderId}</p>
          <p>
            Customer:{" "}
            {`${orderDetails.shippingAddress.firstName} ${orderDetails.shippingAddress.lastName}`}
          </p>
          <p>Total: Rs. {orderDetails.total.toFixed(2)}</p>
          <p>Payment Method: {orderDetails.paymentMethod}</p>
          <p>
            Shipping Address:{" "}
            {`${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}`}
          </p>
          <p>Status: {orderDetails.status}</p>
        </div>
      )}

      {error && (
        <div className="Chamu_errorMessage">
          <p>{error}</p>
        </div>
      )}
      <button
        type="button"
        className="Chamu_buttonHome"
        onClick={() => navigate("/report")}
      >
        Tracking Portal
      </button>
    </div>
  );
}

export default TrackingHome;
