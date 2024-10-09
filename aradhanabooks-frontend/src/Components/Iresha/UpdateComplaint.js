import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateComplaint.css";
import updateImage from '../../Images/update.png';  

export default function UpdateComplaint() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2001/complaint/get/${id}`
        );
        const complaint = response.data.complaint;
        setUsername(complaint.username);
        setEmail(complaint.email);
        setContactNo(complaint.contactNo.toString());
        setSubject(complaint.subject);
        setDescription(complaint.description);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchComplaintData();
  }, [id]);

  const validateFields = () => {
    if (/\d/.test(username)) {
      alert("Username cannot contain numbers");
      return false;
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      alert("Invalid email address");
      return false;
    }
    if (!contactNo.match(/^\d{9}$/)) {
      alert("Contact number must be exactly 9 digits without 0/+94");
      return false;
    }
    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("contactNo", contactNo);
    formData.append("subject", subject);
    formData.append("description", description);
    if (attachment) {
      formData.append("attachment", attachment);
    }

    try {
      await axios.put(`http://localhost:2001/complaint/update/${id}`, formData);
      alert("Complaint Updated");
      navigate("/complaint/display");
    } catch (err) {
      alert("Error updating complaint");
      console.error(err);
    }
  };

  return (
    <div className="iresha-containerUp">
      <img src={updateImage} alt="Update" className="iresha-imageUp" />  
      <form onSubmit={handleUpdate}>
        <div className="iresha-form-groupUp">
          <h1 className="iresha-headerUp">Update Complaint</h1>

          <label htmlFor="username" className="iresha-form-labelUp">
            Name:
          </label>
          <input
            type="text"
            className="iresha-form-controlUp"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
 

          <label htmlFor="email" className="iresha-form-labelUp">
            Email:
          </label>
          <input
            type="email"
            className="iresha-form-controlUp"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="contactNo" className="iresha-form-labelUp">
            Contact No: (Without 0/+94)
          </label>
          <input
            type="text"
            className="iresha-form-controlUp"
            id="contactNo"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />

          <label htmlFor="subject" className="iresha-form-labelUp">
            Subject:
          </label>
          <select
            className="iresha-form-controlUp"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="" disabled>
              Select Subject
            </option>
            <option value="Delay my books">Delay my books</option>
            <option value="Wrong Item Sent">Wrong Item Sent</option>
            <option value="Damaged Product Received">
              Damaged Product Received
            </option>
            <option value="Order Not Delivered on Time">
              Order Not Delivered on Time
            </option>
            <option value="Request for Return/Refund">
              Request for Return/Refund
            </option>
            <option value="Unable to Upload Review or Rating">
              Unable to Upload Review or Rating
            </option>
            <option value="Problem with Order Tracking">
              Problem with Order Tracking
            </option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="description" className="iresha-form-labelUp">
            Description:
          </label>
          <input
            type="text"
            className="iresha-form-controlUp"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="attachment" className="iresha-form-labelUp">
            Attachment:
          </label>
          <input
            type="file"
            className="iresha-form-controlUp"
            id="attachment"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
        </div>

        <button type="submit" className="iresha-btn iresha-btn-primaryUp">
          Update
        </button>
      </form>
    </div>
  );
}
