import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./InquiryDetail.css"

function InquiryDetail() {
  const { id } = useParams();
  const [inquiry, setInquiry] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await axios.get(`http://localhost:2001/api/inquiries/${id}`);
        setInquiry(response.data);
      } catch (error) {
        console.error("Error fetching inquiry:", error);
        setError("Failed to fetch inquiry details.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:2001/api/inquiries/${id}`);
      alert("Deleted Successfully");
      navigate("/CusTrack");
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      setError("Failed to delete inquiry.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="chamu_fulpage">
    <div className="Chamu_inquiryDetail">
      <h2>Inquiry Details</h2>
      <p>Order ID: {inquiry.orderId}</p>
      <p>Customer Name: {inquiry.customerName}</p>
      <p>Contact Number: {inquiry.contactNumber}</p>
      <p>Inquiry Type: {inquiry.inquiryType}</p>
      <p>Description: {inquiry.description}</p>
      
      <button className="chamu_updateBtn" onClick={() => navigate(`/inquiry/update/${id}`)}>Update</button>
      <button className="chamu_deleteBtn" onClick={handleDelete}>Delete</button>
    </div>
    </div>
  );
}

export default InquiryDetail;