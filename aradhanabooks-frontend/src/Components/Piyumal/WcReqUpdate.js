import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./WcReqUpdate.css";

const WcReqUpdate = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    customername: "",
    customeremail: "",
    customerphone: "",
    companyName: "",
    customeraddress: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:2001/wcustomer/get/${id}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the customer data!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCustomer = {
      customername: customer.customername,
      customeremail: customer.customeremail,
      customerphone: customer.customerphone,
      companyName: customer.companyName,
      customeraddress: customer.customeraddress,
      description: customer.description,
    };

    axios
      .put(`http://localhost:2001/wcustomer/update/${id}`, updatedCustomer)
      .then(() => {
        navigate(`/wc/${id}`);
      })
      .catch((error) => {
        console.error("There was an error updating the customer data!", error);
      });
  };

  return (
    <div className="piyumal_updatePage">
      <div className="piyumal_UpdateForm">
        <div className="piyumal__card">
          <h2 className="piyumal__heading">Update Customer Request</h2>
          <form onSubmit={handleSubmit} className="piyumal__form">
            <div className="piyumal__form-group">
              <label className="piyumal__label1">Name:</label>
              <input
                type="text"
                name="customername"
                value={customer.customername}
                onChange={handleChange}
                className="piyumal__input2"
              />
            </div>
            <div className="piyumal__form-group">
              <label className="piyumal__label1">Email:</label>
              <input
                type="email"
                name="customeremail"
                value={customer.customeremail}
                onChange={handleChange}
                className="piyumal__input2"
              />
            </div>
            <div className="piyumal__form-group">
              <label className="piyumal__label1">Phone:</label>
              <input
                type="text"
                name="customerphone"
                value={customer.customerphone}
                onChange={handleChange}
                className="piyumal__input2"
              />
            </div>
            <div className="piyumal__form-group">
              <label className="piyumal__label1">Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={customer.companyName}
                onChange={handleChange}
                className="piyumal__input2"
              />
            </div>
            <div className="piyumal__form-group">
              <label className="piyumal__label1">Address:</label>
              <input
                type="text"
                name="customeraddress"
                value={customer.customeraddress}
                onChange={handleChange}
                className="piyumal__input2"
              />
            </div>
            <div className="piyumal__form-group">
              <label className="piyumal__label1">Description:</label>
              <textarea
                name="description"
                value={customer.description}
                onChange={handleChange}
                className="piyumal__textarea2"
              />
            </div>
            <button type="submit" className="piyumal__button">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WcReqUpdate;
