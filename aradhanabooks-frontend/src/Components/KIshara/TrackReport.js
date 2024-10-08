import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TrackReport.css";

import pendingImage from "../../Images/pending.png";
import inProgressImage from "../../Images/in_progress.png";
import completedImage from "../../Images/completed.png";
import cancelledImage from "../../Images/cancelled.png";

// Backend API URL
const API_URL = "http://localhost:2001/api/orders/stageCounts";

function TrackReport() {
  // State to hold the order counts for each stage
  const [orderCounts, setOrderCounts] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
  });

  const navigate = useNavigate();

  // Fetch order counts from the backend
  const fetchOrderCounts = async () => {
    try {
      const response = await axios.get(API_URL);
      setOrderCounts(response.data); // Update state with the fetched counts
    } catch (error) {
      console.error("Error fetching order counts:", error);
    }
  };

  useEffect(() => {
    fetchOrderCounts(); // Fetch counts when the component loads
  }, []);

  // Handle clicking on stage images to navigate to specific pages
  const handleStageClick = (stage) => {
    if (stage === "AllOrders") {
      navigate(`/alltracking`); // Navigate to the All Orders page
    } else {
      navigate(`/${stage.toLowerCase()}`); // Navigate to the specific stage page
    }
  };

  // Handle clicking on the Customer Inquiry button
  const handleInquiryClick = () => {
    navigate('/inquiries'); // Navigate to the Inquiry List page
  };

  return (
    <div className="Chamu_reportContainer">
      {/* Graphical tracking portal */}
      <div className="Chamu_graphContainer">
        {/* Customer Inquiry Button */}
        <button className="Chamu_CusInq" onClick={handleInquiryClick}>
          Customer Inquiry
        </button>
        <h2 className="Chamu_graphHeading"> Admin Tracking Portal Overview</h2>
        <p className="Chamu_descriptionAdd">
          "This graphical overview provides a snapshot of the current status of all orders within the Packing & Shipping Management system.<br /> Each stage Pending, In Progress, Completed, and Cancelled—displays the total number of orders,<br /> allowing administrators to quickly assess the workflow and take necessary actions."
        </p>

        
        
        <button className="Chamu_viewButtonAll" onClick={() => handleStageClick("AllOrders")}>
          All Orders
        </button>
        <br />
        
        <br />
        

        <div className="Chamu_stages">
          {/* Pending Stage */}
          <div
            className="Chamu_stageItem"
            onClick={() => handleStageClick("PendingOrders")}
            style={{ cursor: "pointer" }}
          >
            <img src={pendingImage} alt="Pending" className="Chamu_stageImage" />
            <div className="Chamu_stageInfo">
              <h3>Pending</h3>
              <p className="Chamu_orderCount">{orderCounts.pending}</p>
            </div>
          </div>

          {/* In Progress Stage */}
          <div
            className="Chamu_stageItem"
            onClick={() => handleStageClick("in-progress")}
            style={{ cursor: "pointer" }}
          >
            <img src={inProgressImage} alt="In Progress" className="Chamu_stageImage" />
            <div className="Chamu_stageInfo">
              <h3>In Progress</h3>
              <p className="Chamu_orderCount">{orderCounts.inProgress}</p>
            </div>
          </div>

          {/* Completed Stage */}
          <div
            className="Chamu_stageItem"
            onClick={() => handleStageClick("completed")}
            style={{ cursor: "pointer" }}
          >
            <img src={completedImage} alt="Completed" className="Chamu_stageImage" />
            <div className="Chamu_stageInfo">
              <h3>Completed</h3>
              <p className="Chamu_orderCount">{orderCounts.completed}</p>
            </div>
          </div>

          {/* Cancelled Stage */}
          <div
            className="Chamu_stageItem"
            onClick={() => handleStageClick("cancel")}
            style={{ cursor: "pointer" }}
          >
            <img src={cancelledImage} alt="Cancelled" className="Chamu_stageImage" />
            <div className="Chamu_stageInfo">
              <h3>Cancelled</h3>
              <p className="Chamu_orderCount">{orderCounts.cancelled}</p>
            </div>
          </div>
        </div>
      

      </div>

      <br /><br /><br /><br /><br />
      
    </div>
  );
}

export default TrackReport;
