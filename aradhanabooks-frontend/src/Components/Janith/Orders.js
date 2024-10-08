import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedOrders, setCompletedOrders] = useState(
    JSON.parse(localStorage.getItem("completedOrders")) || []
  );
  const navigate = useNavigate(); // For navigation

  // Fetch In Progress orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:2001/api/orders/in-progress");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching in-progress orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleAssign = () => {
    // Navigate to Rider Profiles page
    navigate("/rider-profiles");
  };

  const handleComplete = (order) => {
    // Store the completed order in local storage
    const newCompletedOrders = [...completedOrders, order];
    setCompletedOrders(newCompletedOrders); // Update state with the new completed order
    localStorage.setItem("completedOrders", JSON.stringify(newCompletedOrders)); // Save to local storage
  };

  const isOrderCompleted = (orderId) => {
    return completedOrders.some((completedOrder) => completedOrder._id === orderId);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (orders.length === 0) {
    return <Typography>No In Progress orders available.</Typography>;
  }

  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        marginTop: "50px",
        backgroundColor: "#0e450e",
        padding: "25px",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <Typography variant="h4" sx={{ color: "#fff", marginBottom: "10px" }}>
        In Progress Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Order ID</TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Item Name</TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Total</TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Payment Method</TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Shipping Address</TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.customOrderId}</TableCell>
                <TableCell>
                  {order.items.map((item, index) => (
                    <div key={index}>{item.item?.itemName || "Item not found"}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {order.items.map((item, index) => (
                    <div key={index}>{item.quantity}</div>
                  ))}
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>
                  {order.shippingAddress
                    ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}, ${order.shippingAddress.address}, ${order.shippingAddress.city}`
                    : "No address provided"}
                </TableCell>
                <TableCell>
                  {isOrderCompleted(order._id) ? "" : order.status}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleAssign}
                    sx={{
                      borderColor: "#c21c63",
                      marginLeft: "12px",
                      color: "#c21c63",
                      "&:hover": {
                        borderColor: "#b71b5b",
                        color: "#b71b5b",
                      },
                    }}
                  >
                    AssignTo
                  </Button>
                  <Button
                    variant="outlined"
                    color={isOrderCompleted(order._id) ? "success" : "primary"}
                    onClick={() => handleComplete(order)} // Pass the order object to handleComplete
                    disabled={isOrderCompleted(order._id)}
                    sx={{
                      marginLeft: "10px",
                      borderColor: "#c21c63",
                      color: isOrderCompleted(order._id) ? "green" : "#c21c63",
                      "&:hover": {
                        borderColor: isOrderCompleted(order._id) ? "green" : "#b71b5b",
                        color: isOrderCompleted(order._id) ? "green" : "#b71b5b",
                      },
                    }}
                  >
                    {isOrderCompleted(order._id) ? "Completed" : "Complete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <Button
          sx={{
            marginTop: "20px",
            backgroundColor: "#c21c63",
            color: "#fff",
            padding: "10px 20px",
            marginBottom: "100px",
            fontSize: "16px",
            borderRadius: "5px",
            "&:hover": {
              opacity: "0.8",
              backgroundColor: "#b71b5b",
            },
          }}
          onClick={() => navigate("/delivery")}
        >
          Dashboard
        </Button>
        <Button
          sx={{
            marginTop: "20px",
            backgroundColor: "#c21c63",
            color: "#fff",
            padding: "10px 20px",
            marginBottom: "100px",
            fontSize: "16px",
            borderRadius: "5px",
            "&:hover": {
              opacity: "0.8",
              backgroundColor: "#b71b5b",
            },
          }}
          onClick={() => navigate("/completed-orders")}
        >
          Completed Orders
        </Button>
      </Box>
    </Box>
  );
};

export default Orders;
