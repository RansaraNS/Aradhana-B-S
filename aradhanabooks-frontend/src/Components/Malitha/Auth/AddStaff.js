import React, { useState } from 'react';
import { TextField, Button, MenuItem, Container, Typography, Paper, Snackbar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHead from '../../Sasin/AdminHead';
import AdminFoot from '../../Sasin/AdminFoot';

const AddStaff = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        occupation: '',
        contactNumber: '',
        dateOfBirth: ''
    });
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const occupations = [
        'Product Manager',
        'Order Manager',
        'Customer Manager',
        'Packing & Shipping Manager',
        'Staff Expenses & Salary Manager',
        'Payment & Return Handling Manager',
        'Delivery Manager'
    ];

    // Validate form fields
    const validate = () => {
        let tempErrors = {};
        tempErrors.name = formData.name ? "" : "Name is required";
        tempErrors.email = formData.email ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "" : "Email is not valid") : "Email is required";
        tempErrors.password = formData.password ? (formData.password.length >= 6 ? "" : "Password must be at least 6 characters long") : "Password is required";
        tempErrors.occupation = formData.occupation ? "" : "Occupation is required";
        tempErrors.contactNumber = formData.contactNumber ? (/^\d{10}$/.test(formData.contactNumber) ? "" : "Contact Number must be 10 digits") : "Contact Number is required";
        tempErrors.dateOfBirth = formData.dateOfBirth.split('T')[0] ? "" : "Date of Birth is required";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === ""); // If no errors
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await axios.post('http://localhost:2001/api/auth/register-staff', formData); 
                setSnackbarOpen(true);
                setSnackbarMessage('Staff added successfully!');
                navigate('/staff-management'); // Redirect to the staff dashboard after successful addition
            } catch (error) {
                console.error('Error adding staff:', error);
                const errorMessage = error.response && error.response.data && error.response.data.message 
                    ? error.response.data.message 
                    : 'Error adding staff.';
                setSnackbarOpen(true);
                setSnackbarMessage(errorMessage);
            }
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <AdminHead />
            <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Add New Staff
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        select
                        label="Occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.occupation}
                        helperText={errors.occupation}
                    >
                        {occupations.map((occupation, index) => (
                            <MenuItem key={index} value={occupation}>
                                {occupation}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Contact Number"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.contactNumber}
                        helperText={errors.contactNumber}
                    />
                    <TextField
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.dateOfBirth}
                        helperText={errors.dateOfBirth}
                    />
                    <Button 
                        variant="contained" 
                        style={{ backgroundColor: '#1D8731', color: '#fff', marginTop: '20px' }} 
                        type="submit"
                    >
                        Add Staff
                    </Button>
                </form>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                />
            </Container>
            <AdminFoot />
        </>
    );
};

export default AddStaff;
