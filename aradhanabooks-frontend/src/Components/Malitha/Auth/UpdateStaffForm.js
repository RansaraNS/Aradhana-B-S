import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHead from '../../Sasin/AdminHead';
import AdminFoot from '../../Sasin/AdminFoot';

const UpdateStaffForm = () => {
    const [staffData, setStaffData] = useState({
        name: '',
        email: '',
        occupation: '',
        contactNumber: '',
        dateOfBirth: '',
    });

    const { email } = useParams(); // Get email from the URL parameter
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get(`http://localhost:2001/api/auth/staff/${email}`);
                setStaffData(response.data);
            } catch (error) {
                console.error('Error fetching staff data:', error);
            }
        };

        fetchStaff();
    }, [email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaffData({ ...staffData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:2001/api/auth/staff/${email}`, {
                name: staffData.name,
                occupation: staffData.occupation,
                contactNumber: staffData.contactNumber,
                dateOfBirth: staffData.dateOfBirth,
            });

            alert('Staff updated successfully!');
            navigate('/staff-management'); // Redirect back to staff dashboard
        } catch (error) {
            console.error('Error updating staff:', error);
            alert('Failed to update staff');
        }
    };

    return (
        <>
            <AdminHead />
            <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Update Staff Member
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={staffData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={staffData.email}
                        fullWidth
                        margin="normal"
                        disabled // Email is disabled
                    />
                    <TextField
                        label="Occupation"
                        name="occupation"
                        value={staffData.occupation}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Contact Number"
                        name="contactNumber"
                        value={staffData.contactNumber}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        value={staffData.dateOfBirth}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }} // Makes the date label stay up
                    />
                    <Box mt={2}>
                        <Button 
                            variant="contained" 
                            style={{ backgroundColor: '#1D8731', color: '#fff' }} 
                            type="submit"
                        >
                            Update Staff
                        </Button>
                    </Box>
                </form>
            </Container>
            <AdminFoot />
        </>
    );
};

export default UpdateStaffForm;
