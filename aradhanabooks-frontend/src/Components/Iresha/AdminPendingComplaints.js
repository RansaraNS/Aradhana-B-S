import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminPendingComplaints.css";  

export default function PendingComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getPendingComplaints() {
      try {
        const response = await axios.get("http://localhost:2001/complaint/pending");
        setComplaints(response.data);
      } catch (err) {
        console.error("Error fetching pending complaints:", err);
        alert("Failed to fetch pending complaints");
      }
    }
    getPendingComplaints();
  }, []);

  const filteredComplaints = complaints.filter(complaint =>
    complaint.referenceNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="iresha-containerADP">
      <h2 className="iresha-headingADP">Pending Complaints</h2>
      <input
        type="text"
        placeholder="Search by Reference No"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="iresha-selectADP"
      />
      {filteredComplaints.length > 0 ? (
        <ul className="iresha-complaint-listADP">
          {filteredComplaints.map((complaint) => (
            <li key={complaint._id} className="iresha-complaint-itemADP">
              <strong>Reference No:</strong> {complaint.referenceNo} <br />
              <strong>Username:</strong> {complaint.username} <br />
              <strong>Email:</strong> {complaint.email} <br />
              <strong>Contact Number:</strong> {complaint.contactNo} <br />
              <strong>Subject:</strong> {complaint.subject} <br />
              <strong>Description:</strong> {complaint.description} <br />
              <strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()} <br />  
              {complaint.attachment ? (
                <>
                  <strong>Attachment:</strong>
                  <img
                    src={`http://localhost:2001/uploads/${complaint.attachment}`}
                    alt="Complaint Attachment"
                    className="iresha-attachmentADP"
                  />
                </>
              ) : (
                <p>No attachment</p>
              )}
              <Link
                to={`/admin/complaint/reply/${complaint._id}`}
                className="iresha-btn iresha-btn-replyADP"
              >
                Reply
              </Link>
              <hr className="iresha-dividerADP" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending complaints found.</p>
      )}
    </div>
  );
}
