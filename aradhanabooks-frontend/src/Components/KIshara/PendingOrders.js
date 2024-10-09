// PendingOrders.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PendingOrders.css'; // Import the CSS file

const PendingOrders = ({ setPendingCount }) => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPendingOrders = async () => {
            try {
                const response = await axios.get('http://localhost:2001/api/orders/pending');
                setPendingOrders(response.data);
                setPendingCount(response.data.length); // Set count based on fetched orders
            } catch (error) {
                console.error("Error fetching pending orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingOrders();
    }, [setPendingCount]); // Add setPendingCount to dependency array

    if (loading) {
        return <div className="Chamu_loading">Loading...</div>;
    }

    if (pendingOrders.length === 0) {
        return <div className="Chamu_noOrders">No Pending Orders</div>;
    }

    return (
        <div className="Chamu_pendingOrdersContainer">
            {/* Dashboard Button */}
      <button 
        className="Chamu_dashboardButton" 
        onClick={() => navigate("/report")}
        style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Dashboard
      </button>
            <h1 className="Chamu_heading">Add Pending Orders</h1>
            <p className="Chamu_descriptionAdd">
            On this page, you can add new orders to the tracking portal automatically.<br /> 
             First, check the order details by clicking the View Order Details button. <br /> 
             Once you verify the information, the order will be added to the tracking portal and marked as "In Progress."
        </p>
            <p className='Chamu_count'>Total Pending Orders: {pendingOrders.length}</p>
            <table className="Chamu_table">
                <thead>
                    <tr>
                        <th className="Chamu_tableHeader">Order ID</th>
                        <th className="Chamu_tableHeader">Total Amount</th>
                        <th className="Chamu_tableHeader">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingOrders.map(order => (
                        <tr key={order.customOrderId || order._id} className="Chamu_tableRowP">
                            <td className="Chamu_tableCell">{order.customOrderId || order._id}</td>
                            <td className="Chamu_tableCell">Rs. {order.total.toFixed(2)}</td>
                            <td className="Chamu_tableCell">
                                <Link to={`/order/${order._id}`} className="Chamu_link">
                                    <button className="Chamu_button">View Order Details</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PendingOrders;
