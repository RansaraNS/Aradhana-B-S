import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TrackingCusOrderDetaill.css"; // Ensure correct CSS filename

function TrackingCusOrderDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return (
      <div className="Chamu_pageBackground">
        <div className="Chamu_backgroundOverlay"></div>
        <div className="Chamu_orderDetail_form">
          <h2>No Order Found</h2>
          <button onClick={() => navigate(-1)} className="Chamu_backButton">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="Chamu_pageBackground">
      <div className="Chamu_backgroundOverlay_chamuu"></div>
      <div className="Chamu_orderDetail_form">
        <h2>Order Details</h2>
        <p>Order ID: {orderDetails.customOrderId}</p>
        <p>
          Customer: {`${orderDetails.shippingAddress.firstName} ${orderDetails.shippingAddress.lastName}`}
        </p>
        <p>Total: Rs. {orderDetails.total.toFixed(2)}</p>
        <p>Payment Method: {orderDetails.paymentMethod}</p>
        <p>
          Shipping Address: {`${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}`}
        </p>
        <p>Status: {orderDetails.status}</p>

        <div className="Chamu_buttonGroup1">
          <button onClick={() => navigate(-1)} className="Chamu_backButtonDetail">
            Go Back
          </button>
          <button 
            type="button"
            className="Chamu_inquiryButton"
            onClick={() => navigate("/track-inquiry", { state: { orderDetails } })}
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrackingCusOrderDetail;
