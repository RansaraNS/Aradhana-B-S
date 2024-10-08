import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Modal from "react-modal";
import "./AdminComplaintsReport.css";
import aradhanabooklogo from '../../Images/Aradhana Books & Stationary Logo.png';  
Modal.setAppElement("#root");  

export default function ComplaintsReport() {
  const [complaints, setComplaints] = useState([]);
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [completedComplaints, setCompletedComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [dateFilter, setDateFilter] = useState("");  
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [pdfType, setPdfType] = useState("all");  
  const [selectedComplaint, setSelectedComplaint] = useState(null);  
  const [modalIsOpen, setModalIsOpen] = useState(false); 

  useEffect(() => {
    async function fetchComplaints() {
      try {
        const response = await axios.get("http://localhost:2001/complaint/display");
        const allComplaints = response.data;

        setComplaints(allComplaints);

        const pending = allComplaints.filter(complaint => complaint.status === "pending");
        const completed = allComplaints.filter(complaint => complaint.status === "completed");

        setPendingComplaints(pending);
        setCompletedComplaints(completed);

        setPendingCount(pending.length);
        setCompletedCount(completed.length);
      } catch (err) {
        console.error("Error fetching complaints:", err.message);
        alert("Failed to fetch complaints. Please check the console for more details.");
      }
    }

    fetchComplaints();
  }, []);

  useEffect(() => {
    const filtered = complaints.filter(complaint => {
      const matchStatus = statusFilter === "all" || complaint.status === statusFilter;
      const matchSearch = complaint.referenceNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDate = !dateFilter || complaint.createdAt.startsWith(dateFilter);  
      return matchStatus && matchSearch && matchDate;
    });
    setFilteredComplaints(filtered);
  }, [searchTerm, statusFilter, dateFilter, complaints]);

  const totalComplaints = complaints.length;
  const completedPercentage = totalComplaints ? (completedCount / totalComplaints) * 100 : 0;

  const generatePDF = () => {
    const doc = new jsPDF();
    let selectedComplaints = [];
    let totalCompleted = 0;  
    let totalPending = 0;     

    doc.addImage(aradhanabooklogo, 'PNG', 15, 3, 30, 20);  
    doc.setFont("Jura", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Aradhana Books & Stationary®", 60, 15);
    
    doc.setFont("Jura", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Experience the Difference in Every Aisle", 80, 20);
    
    doc.line(10, 25, 200, 25);  

    if (pdfType === "completed") {
      selectedComplaints = completedComplaints;
      totalCompleted = completedComplaints.length;
      doc.setFontSize(16); 
      doc.text("Completed Complaints Admin Report Summary", 105, 30, { align: "center" });
      doc.setFontSize(12);  
      doc.text(`Total Completed Complaints: ${totalCompleted}`, 105, 40, { align: "center" });
    } else if (pdfType === "pending") {
      selectedComplaints = pendingComplaints;
      totalPending = pendingComplaints.length;
      doc.setFontSize(16);  
      doc.text("Pending Complaints Admin Report Summary", 105, 30, { align: "center" });
      doc.setFontSize(12);
      doc.text(`Total Pending Complaints: ${totalPending}`, 105, 40, { align: "center" });
    } else if (pdfType === "all") {
      selectedComplaints = complaints;
      const totalComplaintsCount = complaints.length;
      totalCompleted = completedCount; 
      totalPending = pendingCount; 
      doc.setFontSize(16);
      doc.text("All Complaints Admin Report Summary", 105, 30, { align: "center" });
      doc.setFontSize(12);
      doc.text(`Total Complaints: ${totalComplaintsCount}`, 105, 40, { align: "center" });
      doc.text(`Total Completed Complaints: ${totalCompleted}`, 105, 45, { align: "center" });
      doc.text(`Total Pending Complaints: ${totalPending}`, 105, 50, { align: "center" });
    } 
  
    const tableData = selectedComplaints.map(complaint => [
      complaint.status,
      complaint.referenceNo,
      complaint.subject,
      new Date(complaint.createdAt).toLocaleDateString(),
      complaint.description,
      complaint.username,
      complaint.email,
      complaint.contactNo,
      complaint.adminReply || "No reply"
    ]);
  
    doc.autoTable({
      head: [['Status', 'Reference No', 'Subject', 'Date', 'Description', 'Client Name', 'Client Email', 'Client Contact No','Admin Reply']],
      body: tableData,
      startY: 60,
      theme: 'grid',
      columnStyles: {
        0: { cellWidth: 15 },  
        1: { cellWidth: 15 } ,
        2: { cellWidth: 20 },
        3: { cellWidth: 15 } ,
        4: { cellWidth: 30 } ,   
        5: { cellWidth: 15 } ,
        6: { cellWidth: 20 } ,
        7: { cellWidth: 20 } ,
        8: { cellWidth: 30 } 
      },

      headStyles: {
        fillColor: [32,132,52],  
        textColor: [255, 255, 255],  
        fontSize: 12,
        fontStyle: 'bold',
      },
     
    });
  
    doc.save(`${pdfType}_complaints_summary.pdf`);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDateFilter = (e) => {
    setDateFilter(e.target.value);
  };

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedComplaint(null);
  };

  return (
    <div className="iresha-containerRE">
      <h2 className="iresha-headingRE">Complaints Summary Report</h2>

      <div className="iresha-report-summaryRE">
        <p><strong>Total Complaints:</strong> {totalComplaints}</p>
        <p><strong>Pending Complaints:</strong> {pendingCount}</p>
        <p><strong>Completed Complaints:</strong> {completedCount}</p>
        <p><strong>Completion Rate:</strong> {completedPercentage.toFixed(2)}%</p>
      </div>

      <div className="iresha-pdf-selectionRE">
        <select value={pdfType} onChange={(e) => setPdfType(e.target.value)} className="iresha-select">
          <option value="all">All Complaints</option>
          <option value="completed">Completed Complaints</option>
          <option value="pending">Pending Complaints</option>
        </select>
        <button className="iresha-btn iresha-btn-generateRE" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>

      <div className="iresha-searchRE">
        <input
          type="text"
          placeholder="Search: Reference No"
          value={searchTerm}
          onChange={handleSearch}
          className="iresha-inputRE"
        />
        <select value={statusFilter} onChange={handleStatusFilter} className="iresha-selectRE">
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={handleDateFilter}
          className="iresha-date-filterRE"
          placeholder="Filter by Date"
        />
      </div>

      <div className="iresha-report-tableRE">
        <h3>Complaints List</h3>
        {filteredComplaints.length > 0 ? (
          <table className="iresha-tableRE">
            <thead>
              <tr>
                <th>Reference No</th>
                <th>Status</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Description</th>
                <th>Admin Reply</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map(complaint => (
                <tr key={complaint._id} onClick={() => openModal(complaint)} style={{ cursor: "pointer" }}>
                  <td>{complaint.referenceNo}</td>
                  <td>{complaint.status}</td>
                  <td>{complaint.subject}</td>
                  <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td>{complaint.description}</td>
                  <td>{complaint.adminReply || "Pending Stage"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No complaints found.</p>
        )}
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modalRE">
        <h2>Complaint Details</h2>
        {selectedComplaint && (
          <div>
            <p><strong>Reference No:</strong> {selectedComplaint.referenceNo}</p>
            <p><strong>User Name:</strong> {selectedComplaint.username}</p>
            <p><strong>User Email:</strong> {selectedComplaint.email}</p>
            <p><strong>User Contact No:</strong> {selectedComplaint.contactNo}</p>
            <p><strong>Status:</strong> {selectedComplaint.status}</p>
            <p><strong>Subject:</strong> {selectedComplaint.subject}</p>
            <p><strong>Date:</strong> {new Date(selectedComplaint.createdAt).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {selectedComplaint.description}</p>
            <p><strong>Admin Reply:</strong> {selectedComplaint.adminReply || "No reply"}</p>
          </div>
        )}
        <button className="iresha-btn-closeRE" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}
