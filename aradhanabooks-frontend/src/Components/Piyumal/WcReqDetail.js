import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./WcReqDetail.css";

const WcReqDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
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

  const handleUpdate = () => {
    navigate(`/wc/update/${id}`);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:2001/wcustomer/delete/${id}`)
      .then(() => {
        navigate("/wcform");
      })
      .catch((error) => {
        console.error("There was an error deleting the customer data!", error);
      });
  };

  if (!customer) {
    return <div className="piyumal__container_loading">Loading...</div>;
  }

  return (
    <div className="piyumal_singleDetail">
      <div className="piyumal__card_singleDetail">
        <h2 className="piyumal__heading_singleDetail">Customer Request Details</h2>
        <div className="piyumal__field_singleDetail">
          <span className="piyumal__label_name">Name :</span>
          <span className="piyumal__value_name">{customer.customername}</span>
        </div>
        <div className="piyumal__field_singleDetail">
          <span className="piyumal__label_email">Email :</span>
          <span className="piyumal__value_email">{customer.customeremail}</span>
        </div>
        <div className="piyumal__field_singleDetail">
          <span className="piyumal__label_con">Phone :</span>
          <span className="piyumal__value_con">{customer.customerphone}</span>
        </div>
        <div className="piyumal__field_singleDetail">
          <span className="piyumal__label_company_name">Company Name :</span>
          <span className="piyumal__value_company_name">{customer.companyName}</span>
        </div>
        <div className="piyumal__field_singleDetail">
          <span className="piyumal__label_address">Address :</span>
          <span className="piyumal__value_address">{customer.customeraddress}</span>
        </div>
        <div className="piyumal__field_singleDetail">
          <span className="piyumal__label_descrip">Description :</span>
          <span className="piyumal__value_descrip">{customer.description}</span>
        </div>
        <div className="piyumal__actions">
          <button className="piyumal__button_update1" onClick={handleUpdate}>
            Update
          </button>
          <button className="piyumal__button_delete1" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WcReqDetail;
