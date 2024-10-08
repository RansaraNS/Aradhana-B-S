import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './AdminReplyComplaint.css';

export default function ReplyComplaint() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState({});
  const [reply, setReply] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchComplaint() {
      try {
        const response = await axios.get(`http://localhost:2001/complaint/get/${id}`);
        setComplaint(response.data.complaint);
      } catch (err) {
        console.error("Error fetching complaint:", err);
      }
    }

    fetchComplaint();
  }, [id]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:2001/complaint/admin/reply/${id}`, { reply });
      alert("Reply added successfully");
      navigate("/admin/complaints");
    } catch (err) {
      console.error("Error response:", err.response);
      alert("Failed to add reply: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="iresha-containerAR">
      <div className="iresha-container2AR"> 
        <h2 className="iresha-headingAR">Reply to Complaint</h2>
        <div className="iresha-complaint-detailAR">
          <strong>Reference No:</strong> {complaint.referenceNo} <br />
          <strong>Username:</strong> {complaint.username} <br />
          <strong>Email:</strong> {complaint.email} <br />
          <strong>Contact Number:</strong> {complaint.contactNo} <br />
          <strong>Subject:</strong> {complaint.subject} <br />
          <strong>Description:</strong> {complaint.description} <br />
        </div>
        <form onSubmit={handleReplySubmit} className="iresha-reply-formAR">
          <div className="iresha-form-groupAR">
            <label htmlFor="reply" className="iresha-form-labelAR">Reply:</label>
            <textarea
              id="reply"
              className="iresha-form-controlAR"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="iresha-btnAR  iresha-btn-primaryAR">Submit Reply</button>
        </form>
      </div>
    </div>
  );
}
