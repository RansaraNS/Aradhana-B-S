import React from "react";
import { Link } from "react-router-dom";
import "./AdminDisplayComplaint.css";
import adminComplaintImage from '../../Images/adminComplaint.png'

export default function AdminDisplayComplaints() {
  return (
    <div className="iresha-containerAD">
      <div className="iresha-leftAD">
        <h2 className="iresha-headingAD">Admin - Complaints Dashboard</h2>
        <div className="iresha-dashboardAD">
          <Link to="/admin/complaints/pending" className="iresha-btnAD">
            View Pending Complaints
          </Link>
          <Link to="/admin/complaints/completed" className="iresha-btnAD">
            View Completed Complaints
          </Link>
          <Link to="/admin/complaints/report" className="iresha-btnAD">
            Generate Complaints Report
          </Link>
        </div>
      </div>
      <div className="iresha-rightAD">
        <img src={adminComplaintImage} alt="Admin Complaints" className="iresha-imageAD" />
      </div>
    </div>
  );
}
