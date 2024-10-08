import React, { useState, useEffect } from "react";
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
} from "@mui/material";

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState(
    JSON.parse(localStorage.getItem("completedOrders")) || []
  );
  const navigate = useNavigate();
  // Fetch completed orders from localStorage on component mount
  useEffect(() => {
    const storedCompletedOrders = JSON.parse(localStorage.getItem("completedOrders")) || [];
    setCompletedOrders(storedCompletedOrders);
  }, []);

  if (completedOrders.length === 0) {
    return <Typography>No Completed Orders available.</Typography>;
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
        Completed Orders
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
            {completedOrders.map((order) => (
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
                <TableCell>{order.status === "In Progress" ? "Completed" : order.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        sx={{
          marginTop: '20px',
          backgroundColor: '#c21c63',
          color: '#fff',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          '&:hover': {
            opacity: '0.8',
            backgroundColor: '#b71b5b',
          },
        }}
        onClick={() => navigate('/porders')}
      >
        Back
      </Button>
    </Box>
  );
};

export default CompletedOrders;
