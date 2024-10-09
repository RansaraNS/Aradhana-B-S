import React from "react";
import { useNavigate } from "react-router-dom";
import "./TrackingHomeCus.css";

function TrackingHomeCus() {
  const navigate = useNavigate();

  return (
    <div className="Chamu_cus_container">
      <img
        src={require("../../Images/CusHome.png")}
        alt="Tracking Portal"
        className="Chamu_cus_image"
      />

      <h1 className="Chamu_cus_title">Track Your Order Here!</h1>

      <p className="Chamu_cus_description">
        Welcome to our tracking portal! Easily monitor the status of your order
        using the Order ID. Stay updated on its journey from packing to shipping
        until it reaches you. Enter your Order ID and track your order in
        real-time.
      </p>

      <button
        type="button"
        className="Chamu_cus_buttonHome"
        onClick={() => navigate("/CusTrack")}
      >
        Go to Tracking Portal
      </button>
    </div>
  );
}

export default TrackingHomeCus;
