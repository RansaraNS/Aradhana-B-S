import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";  
import './DisplayComplaints.css';
import { Link } from "react-router-dom";
import aradhanabooklogo from '../../Images/Aradhana Books & Stationary Logo.png';
 

export default function DisplayComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [sortOption, setSortOption] = useState("newest"); 
  const [currentPage, setCurrentPage] = useState(1);   
  const complaintsPerPage = 2;   
  useEffect(() => {
    function getComplaints() {
      axios
        .get("http://localhost:2001/complaint/display")
        .then((res) => {
          setComplaints(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getComplaints();
  }, []);

  const generatePDF = async (complaint) => {
    const doc = new jsPDF();

    doc.addImage(aradhanabooklogo, 'PNG', 15, 3, 30, 20);
    doc.setFont("Jura", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Aradhana Books & Stationary®", 60, 15);
    const headerText = "Complaint Details";
    const textWidth = doc.getTextWidth(headerText);
    doc.text(headerText, (doc.internal.pageSize.getWidth() - textWidth) / 2, 30);
    doc.setFont("Jura", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Experience the Difference in Every Aisle", 80, 20);
    doc.line(10, 35, 200, 35);

    doc.setFontSize(12);
    doc.text(`Reference No: ${complaint.referenceNo}`, 10, 40);
    doc.text(`Username: ${complaint.username}`, 10, 50);
    doc.text(`Email: ${complaint.email}`, 10, 60);
    doc.text(`Contact Number: ${complaint.contactNo}`, 10, 70);
    doc.text(`Subject: ${complaint.subject}`, 10, 80);
    doc.text(`Description: ${complaint.description}`, 10, 90);
    doc.text(`Status: ${complaint.status}`, 10, 100);
    doc.text(`Date: ${formatDate(complaint.createdAt)}`, 10, 110);

    if (complaint.adminReply) {
      doc.text(`Admin Reply: ${complaint.adminReply}`, 10, 120);
    }

    if (complaint.attachment) {
      try {
        const imgUrl = `http://localhost:2001/uploads/${complaint.attachment}`;
        const imageData = await convertImageToBase64(imgUrl);
        doc.addImage(imageData, 'JPEG', 10, 130, 150, 100);
      } catch (error) {
        console.error("Error loading image for PDF:", error);
      }
    }
    doc.save(`complaint_${complaint.referenceNo}.pdf`);
  };

  const convertImageToBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/jpeg");
        resolve(dataURL);
      };
      img.onerror = (err) => {
        reject(err);
      };
    });
  };

  const deleteComplaint = async (id) => {
    try {
      await axios.delete(`http://localhost:2001/complaint/delete/${id}`);
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
      alert("Complaint Deleted");
    } catch (err) {
      alert("Error deleting complaint");
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const sortedComplaints = [...complaints].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOption === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Pagination
 const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = sortedComplaints
    .filter((complaint) =>
      showCompleted ? complaint.status === "completed" : complaint.status === "pending"
    )
    .slice(indexOfFirstComplaint, indexOfLastComplaint);

  const nextPage = () => {
    if (currentPage < Math.ceil(sortedComplaints.length / complaintsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="iresha-containerDis">
      <h2 className="iresha-headingDis">Complaints List</h2>

      <div className="iresha-sort-barDis">
        <label htmlFor="sort">Sort By:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="iresha-btn-groupDis">
        <button
          onClick={() => setShowCompleted(false)}
          className="iresha-btn-updateDis"
        >
          Pending Complaints
        </button>
        <button
          onClick={() => setShowCompleted(true)}
          className="iresha-btn-updateDis"
        >
          Completed Complaints
        </button>
      </div>
      <div className="iresha-complaints-contentDis">
        <ul className="iresha-complaint-listDis">
          {currentComplaints.length > 0 ? (
            currentComplaints.map((complaint, index) => (
              <li
                key={index}
                className={`iresha-complaint-itemDis ${showCompleted ? "iresha-completed-complaint-itemDis" : ""}`}
              >
                <strong>Reference No:</strong> {complaint.referenceNo} <br />
                <strong>Username:</strong> {complaint.username} <br />
                <strong>Email:</strong> {complaint.email} <br />
                <strong>Contact Number:</strong> {complaint.contactNo} <br />
                <strong>Subject:</strong> {complaint.subject} <br />
                <strong>Description:</strong> {complaint.description} <br />
                <strong>Status:</strong> {complaint.status} <br />
                <strong>Date:</strong> {formatDate(complaint.createdAt)} <br />
                {complaint.attachment ? (
                  <>
                    <strong>Attachment:</strong><br/>
                    <img
                      src={`http://localhost:2001/uploads/${complaint.attachment}`}
                      alt="Complaint Attachment"
                      className="iresha-attachmentDis"
                    />
                  </>
                ) : (
                  <p>No attachment</p>
                )}
                {showCompleted && complaint.adminReply && (
                  <div className="iresha-admin-replyDis">
                    <strong>Admin Reply:</strong>
                    <p>{complaint.adminReply}</p>
                  </div>
                )}
                {showCompleted || (
                  <>
                    <Link
                      to={`/complaint/update/${complaint._id}`}
                      className="iresha-btn-updateDis"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => generatePDF(complaint)}
                      className="iresha-btn-pdfDis"
                    >
                      Generate PDF
                    </button>
                    <button
                      onClick={() => deleteComplaint(complaint._id)}
                      className="iresha-btn-deleteDis"
                    >
                      Delete
                    </button>
                  </>
                )}
                {showCompleted && (
                  <button
                    onClick={() => generatePDF(complaint)}
                    className="iresha-btn-pdfDis"
                  >
                    Generate PDF
                  </button>
                )}
                <hr className="iresha-dividerDis" />
              </li>
            ))
          ) : (
            <p>No complaints found.</p>
          )}
        </ul>
        <div className="pagination-buttons">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(complaints.length / complaintsPerPage)}>Next</button>
        </div>
      </div>
    </div>
  );
}
