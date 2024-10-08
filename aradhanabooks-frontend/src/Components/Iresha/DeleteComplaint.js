import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DeleteComplaint({ id }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:2001/complaint/delete/${id}`);
      alert("Complaint Deleted");
      navigate("/display");
    } catch (err) {
      alert("Error deleting complaint");
      console.error(err);
    }
  };

  return (
    <button onClick={handleDelete} className="iresha-btn iresha-btn-delete">
      Delete
    </button>
  );
}
