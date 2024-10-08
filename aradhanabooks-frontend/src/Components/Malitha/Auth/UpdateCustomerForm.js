import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminHead from '../../Sasin/AdminHead';
import AdminFoot from '../../Sasin/AdminFoot';

const UpdateCustomerForm = () => {
    const { email } = useParams();
    const [customer, setCustomer] = useState({ name: '', contactNumber: '', address: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:2001/api/auth/customers/${email}`); // Adjust URL as needed
                setCustomer(response.data);
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        };
        fetchCustomer();
    }, [email]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:2001/api/auth/customers/${email}`, customer); // Adjust URL as needed
            navigate('/customer-dashboard'); // Redirect after update
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    return (
        <>
            <AdminHead />
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Update Customer
                </Typography>
                <Box component="form" onSubmit={handleUpdate}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Contact Number"
                        value={customer.contactNumber}
                        onChange={(e) => setCustomer({ ...customer, contactNumber: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Address"
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                        margin="normal"
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        style={{ backgroundColor: '#1D8731', color: '#fff', marginTop: '16px' }} // Changed button color
                    >
                        Update
                    </Button>
                </Box>
            </Container>
            <AdminFoot />
        </>
    );
};

export default UpdateCustomerForm;
