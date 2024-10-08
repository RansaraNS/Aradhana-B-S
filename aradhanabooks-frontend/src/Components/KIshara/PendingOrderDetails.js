import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PendingOrderDetails.css';  // Import the CSS file

const PendingOrderDetails = () => {
    const { id } = useParams(); // Get the order ID from the URL params
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:2001/api/orders/order/${id}`);
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

    const moveToTrack = async () => {
        if (window.confirm("Are you sure you want to move this order to tracking?")) {
            try {
                // API call to move order to tracking
                const response = await axios.put(`http://localhost:2001/api/orders/moveToTrack/${id}`);
    
                if (response.status === 200) {
                    alert("Order moved to tracking successfully!");
    
                    // Redirect to the TrackingDisplay component
                    navigate(`/in-progress`);  // Adjust the path as needed for your routing
                } else {
                    alert("Unexpected response from server.");
                    console.error("Unexpected response:", response);
                }
            } catch (error) {
                console.error("Error moving order to tracking:", error);
                const errorMessage = error.response?.data?.message || "Failed to move order to tracking.";
                alert(errorMessage);
            }
        }
    };
    

    if (loading) {
        return <div className="Chamu_loading">Loading...</div>;
    }

    if (error) {
        return <div className="Chamu_error">{error}</div>;
    }

    return (
        <div className="Chamu_orderDetailsContainer">
            
            {order ? (
                <div className="Chamu_orderDetails">
                    <h2 className="Chamu_orderId">Order ID: {order.customOrderId || order._id}</h2>
                    
                    <p className="Chamu_description2">
                        Here you can view all the details related to this pending order. <br />
                        Once you verify the information, you can proceed to move this order into the tracking system.
                    </p>
                    <br></br>
                    <p className="Chamu_orderInfo">Total: ${order.total}</p>
                    <p className="Chamu_orderInfo">Payment Method: {order.paymentMethod}</p>
                    <p className="Chamu_orderstage">Status: {order.status}</p>
                    <p className="Chamu_orderInfo">Created At: {new Date(order.createdAt).toLocaleString()}</p>
                    <h3 className="Chamu_sectionHeading">Shipping Address:</h3>
                    <p className="Chamu_orderInfo">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                    <p className="Chamu_orderInfo">{order.shippingAddress.address}</p>
                    <p className="Chamu_orderInfo">{order.shippingAddress.city}, {order.shippingAddress.district}</p>
                    <p className="Chamu_orderInfo">Phone: {order.shippingAddress.phone}</p>
                    <p className="Chamu_orderInfo">Email: {order.shippingAddress.email}</p>
                    
                    <button className="Chamu_moveToTrackButton" onClick={moveToTrack}>Add to Track</button>
                </div>
            ) : (
                <p className="Chamu_noOrder">No order details available</p>
            )}
        </div>
    );
};

export default PendingOrderDetails;
