import React, { useState } from "react";
import axios from "axios";
import "./WcReqForm.css";

function WcReqForm() {
  const [customername, setCustomerName] = useState("");
  const [customeremail, setCustomerEmail] = useState("");
  const [customerphone, setCustomerPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [customeraddress, setCustomerAddress] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!customername.match(/^[A-Za-z\s]+$/)) {
      newErrors.customername = "Customer name should contain letters only.";
    }

    if (!customeremail) {
      newErrors.customeremail = "Email is required.";
    } else if (!customeremail.includes("@")) {
      newErrors.customeremail = "Email must contain an '@' symbol.";
    } else if (!customeremail.endsWith(".com")) {
      newErrors.customeremail = "Email must end with '.com'.";
    } else if (
      !customeremail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/)
    ) {
      newErrors.customeremail =
        "Please enter a valid email address (e.g., example@domain.com).";
    }
    

    if (!customerphone.match(/^0\d{9}$/)) {
      newErrors.customerphone =
        "Phone number should be exactly 10 digits and start with 0.";
    }

    if (!companyName.match(/^[A-Za-z\s]+$/)) {
      newErrors.companyName = "Company name should contain letters only.";
    }

    if (!customeraddress.trim()) {
      newErrors.customeraddress = "Customer address is required.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const requestData = {
      customername,
      customeremail,
      customerphone,
      companyName,
      customeraddress,
      description,
    };

    axios
      .post("http://localhost:2001/wcustomer/addRequest", requestData)
      .then((response) => {
        alert("Customer Request added successfully");
        setCustomerName("");
        setCustomerEmail("");
        setCustomerPhone("");
        setCompanyName("");
        setCustomerAddress("");
        setDescription("");
        setErrors({});
      })
      .catch((error) => {
        console.error("There was an error adding the customer!", error);
      });
  };

  return (
    <div className="piyumal_fullPage">
    <div className="piyumal_wholesaleForm">
      <form onSubmit={handleSubmit} className="piyumal__form_wholesaleForm">
        <h2 className="piyumal__heading_customerForm">Customer Request Form</h2>
        <div className="form-group_customerForm">
          <label className="piyumal__label_customerForm">
            Name:
            <input
              type="text"
              name="customername"
              value={customername}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              placeholder="Enter Customer Name"
              className="piyumal__input_name"
            />
            {errors.customername && (
              <span className="piyumal__error_name">{errors.customername}</span>
            )}
          </label>
        </div>
        <div className="form-group_customerEmail">
          <label className="piyumal__label_email">
            Email:
            <input
              type="email"
              name="customeremail"
              value={customeremail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
              placeholder="Enter Customer Email"
              className="piyumal__input_email"
            />
            {errors.customeremail && (
              <span className="piyumal__error_email">{errors.customeremail}</span>
            )}
          </label>
        </div>
        <div className="form-group_customerPhone">
          <label className="piyumal__label_customerPhone">
            Customer Phone:
            <input
              type="text"
              name="customerphone"
              value={customerphone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
              placeholder="Enter Customer Contact"
              className="piyumal__input_customerPhone"
            />
            {errors.customerphone && (
              <span className="piyumal__error_customerPhone">{errors.customerphone}</span>
            )}
          </label>
        </div>
        <div className="form-group_CompanyName">
          <label className="piyumal__label_CompanyName">
            Company Name:
            <input
              type="text"
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              placeholder="Enter Company Name"
              className="piyumal__input_CompanyName"
            />
            {errors.companyName && (
              <span className="piyumal__error_CompanyName">{errors.companyName}</span>
            )}
          </label>
        </div>
        <div className="form-group_customerAddress">
          <label className="piyumal__label_customerAddress">
            Address:
            <input
              type="text"
              name="customeraddress"
              value={customeraddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              required
              placeholder="Enter Company Address"
              className="piyumal__input_customerAddress"
            />
            {errors.customeraddress && (
              <span className="piyumal__error_customerAddress">{errors.customeraddress}</span>
            )}
          </label>
        </div>
        <div className="form-group_customerDes">
          <label className="piyumal__label_customerDes">
            Description:
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter a brief description"
              className="piyumal__input_customerDes"
            />
            {errors.description && (
              <span className="piyumal__error_des">{errors.description}</span>
            )}
          </label>
        </div>
        <button type="submit" className="piyumal__button_AddCustomer">
          Add Customer Request
        </button>
      </form>
    </div>
    </div>
  );
}

export default WcReqForm;
