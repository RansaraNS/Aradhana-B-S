import React, { useState } from "react";
import "./AddComplaint.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddComplaint() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [subject, setSubject] = useState(""); 
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const navigate = useNavigate();

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
    if (subject === "") {
      alert("Please select a subject");
      return false;
    }
    return true;
  };

  function clearForm() {
    setUsername("");
    setEmail("");
    setContactNo("");
    setSubject("");
    setDescription("");
    setAttachment(null);
  }

  function sendData(e) {
    e.preventDefault();

    if (!validateFields()) return;

    const currentDate = new Date().toISOString();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("contactNo", contactNo);
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("createdAt", currentDate);
    if (attachment) formData.append("attachment", attachment);

    axios
   .post("http://localhost:2001/complaint/add", formData)
   .then(() => {
     alert("Complaint Added");
     clearForm();
   })
   .catch((err) => {
     alert("Error adding complaint: " + err.message);
   });
  }

  return (
    <div className="iresha-containerF">
      <div className="iresha-form-sectionF">
        <form onSubmit={sendData}>
          <h1>Complaint Form</h1>

          <div className="iresha-form-groupF">
            <label htmlFor="username" className="iresha-form-labelF">Name:</label>
            <input
              type="text"
              className="iresha-form-controlF"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="iresha-form-groupF">
            <label htmlFor="email" className="iresha-form-labelF">Email:</label>
            <input
              type="email"
              className="iresha-form-controlF"
              placeholder="abc@gmail.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="iresha-form-groupF">
            <label htmlFor="contactNo" className="iresha-form-labelF">Contact No: (Without 0/+94)</label>
            <input
              type="text"
              className="iresha-form-controlF"
              placeholder="712345678"
              id="contactNo"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>

          <div className="iresha-form-groupF">
            <label htmlFor="subject" className="iresha-form-labelF">Subject:</label><br/>
            <select
              className="iresha-form-group-selectF"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="" disabled>Select Subject</option>
              <option value="Delay my books">Delay my books</option>
              <option value="Wrong Item Sent">Wrong Item Sent</option>
              <option value="Damaged Product Received">Damaged Product Received</option>
              <option value="Order Not Delivered on Time">Order Not Delivered on Time</option>
              <option value="Request for Return/Refund">Request for Return/Refund</option>
              <option value="Unable to Upload Review or Rating">Unable to Upload Review or Rating</option>
              <option value="Problem with Order Tracking">Problem with Order Tracking</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="iresha-form-groupF">
            <label htmlFor="description" className="iresha-form-labelF">Description:</label>
            <textarea
              className="iresha-form-control-desF"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="iresha-form-groupF">
            <label htmlFor="attachment" className="iresha-form-labelF">Attachment (optional):</label>
            <input
              type="file"
              className="iresha-form-controlF"
              id="attachment"
              onChange={(e) => setAttachment(e.target.files[0])}
            />
          </div>

          <button type="submit" className="iresha-btnF">
            Submit
          </button>
          <button
            type="button"
            className="iresha-btnF"
            onClick={() => navigate("/complaint/display")}
          >
            View Complaints
          </button>
        </form>
      </div>

      <div className="iresha-image-sectionF">
      </div>
    </div>
  );
}
