import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TrackingPortalCus.css"; // Separate CSS for customer side

function TrackingPortalCus() {
  const [searchTerm, setSearchTerm] = useState("");
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
        setError("");
        // Navigate to the order detail page with order details as state
        navigate("/CusOrderDetail", { state: { orderDetails: response.data } });
      }
    } catch (error) {
      console.error(error);
      setError("Order not found or invalid Order ID/Phone Number");
    }
  };

  return (
    <div className="Chamu_custrack_container">
       <div className="Chamu_Upper_Part">
        <img
          src={require("../../Images/cus2.png")}
          alt="Tracking Portal"
          className="Chamu_cus_image2"
        />
      <div className="Chamu_content">
        <h1 className="Chamu_cus_title">Track Your Order Here!</h1>

        <p className="Chamu_cus_intro">
            Thank you for choosing Aradhana Book & Stationery! We appreciate your trust in us and are committed to providing you with the best service possible. Our tracking portal allows you to monitor the status of your order in real time, giving you peace of mind as you await your purchase.
          Enter your Order ID or Phone Number to check the status of your order.
          You can track its progress from pending to delivery, and stay updated
          on the shipping details.
        </p>

        <div className="Chamu_searchContainerCus">
          <input
            type="text"
            placeholder="Enter Order ID or Phone Number"
            className="Chamu_searchInputCus"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="Chamu_searchButtonCus" onClick={handleSearch}>
            Search
          </button>
        </div>

        {error && (
          <div className="Chamu_errorMessageCus">
            <p>{error}</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default TrackingPortalCus;
