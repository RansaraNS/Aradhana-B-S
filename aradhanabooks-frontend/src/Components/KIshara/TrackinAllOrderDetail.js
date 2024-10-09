import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PendingOrderDetails.css';  // Import the CSS file

const TrackingAllOrderDetails = () => {
    const { id } = useParams(); // Get the order ID from the URL params
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:2001/api/orders/order/status/${id}`);
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setError('Error fetching order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    // Function to determine status display
    const getStatusDisplay = (status) => {
        if (status === 'Received') {
            return 'Completed';  // If status is "Received", display "Completed"
        }
        return status;  // For all other statuses, display them as they are
    };

    // Function to handle navigating back to the previous page
    const handleOkButtonClick = () => {
        navigate(-1); // Go back to the previous page
    };

    if (loading) {
        return <div className="Chamu_loading">Loading...</div>;
    }

    if (error) {
        return <div className="Chamu_error">{error}</div>;
    }

    return (
        <div className="Chamu_orderDetailsContainer">
            {/* Dashboard Button */}
      <button 
        className="Chamu_dashboardButton" 
        onClick={() => navigate("/report")}
        style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Dashboard
      </button>
            {order ? (
                <div className="Chamu_orderDetails">
                    <h2 className="Chamu_orderId">Order ID: {order.customOrderId || order._id}</h2>
                    
                    <p className="Chamu_description2">
                        Here you can view all the details with status related to this order. <br />
                    </p>
                    <br></br>
                    <p className="Chamu_orderInfo">Total: Rs. {order.total}</p>
                    <p className="Chamu_orderInfo">Payment Method: {order.paymentMethod}</p>
                    
                    {/* Display the modified status */}
                    <p className="Chamu_orderstage">Status: {getStatusDisplay(order.status)}</p>
                    
                    <p className="Chamu_orderInfo">Created At: {new Date(order.createdAt).toLocaleString()}</p>
                    <h3 className="Chamu_sectionHeading">Shipping Address:</h3>
                    <p className="Chamu_orderInfo">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                    <p className="Chamu_orderInfo">{order.shippingAddress.address}</p>
                    <p className="Chamu_orderInfo">{order.shippingAddress.city}, {order.shippingAddress.district}</p>
                    <p className="Chamu_orderInfo">Phone: {order.shippingAddress.phone}</p>
                    <p className="Chamu_orderInfo">Email: {order.shippingAddress.email}</p>
                    
                    {/* Attach the click handler to the button */}
                    <button className="Chamu_moveToTrackButton" onClick={handleOkButtonClick}>
                        Ok
                    </button>
                </div>
            ) : (
                <p className="Chamu_noOrder">No order details available</p>
            )}
        </div>
    );
};

export default TrackingAllOrderDetails;
