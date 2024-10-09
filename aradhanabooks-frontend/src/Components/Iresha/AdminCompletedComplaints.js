import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminCompletedComplaints.css';

export default function CompletedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getCompletedComplaints() {
      try {
        const response = await axios.get("http://localhost:2001/complaint/completed");
        setComplaints(response.data);
      } catch (err) {
        console.error("Error fetching completed complaints:", err);
        alert("Failed to fetch completed complaints");
      }
    }
    getCompletedComplaints();
  }, []);

  const filteredComplaints = complaints.filter(complaint =>
    complaint.referenceNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return ( 
    <div className="iresha-containerADC">
      <h2 className="iresha-headingADC">Completed Complaints</h2>
      <input
        type="text"
        placeholder="Search by Reference No"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="iresha-selectADC"
      />
      {filteredComplaints.length > 0 ? (
        <ul className="iresha-complaint-listADC">
          {filteredComplaints.map((complaint) => (
            <li key={complaint._id} className="iresha-complaint-itemADC">
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
                    className="iresha-attachmentADC"
                  />
                </>
              ) : (
                <p>No attachment</p>
              )}
              <br/><br/><strong>Admin Reply:</strong> {complaint.adminReply} <br />
              <hr className="iresha-dividerADC" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed complaints found.</p>
      )}
    </div>
  );
}
