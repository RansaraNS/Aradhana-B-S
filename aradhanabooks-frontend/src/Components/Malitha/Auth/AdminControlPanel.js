import React from 'react';
import { Button, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StaffIcon from '@mui/icons-material/People'; // Icon for staff management
import CustomerIcon from '@mui/icons-material/Person'; // Icon for customer management
import AdminHead from '../../Sasin/AdminHead';
import AdminFoot from '../../Sasin/AdminFoot';

const AdminControlPanel = () => {
    const navigate = useNavigate();

    const handleStaffManagement = () => {
        navigate('/staff-management'); // Assuming you have a route for staff management
    };

    const handleCustomerManagement = () => {
        navigate('/customer-dashboard'); // Assuming you have a route for customer management
    };

    return (
        <>
            <AdminHead /> {/* Include AdminHead here */}
            <Container>
                <Grid container justifyContent="center" style={{ height: '100vh', alignItems: 'center' }}>
                    <Grid item xs={12} textAlign="center" mb={2}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Admin Control Panel
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Card elevation={3} sx={{ textAlign: 'center', padding: 2 }}>
                                <CardContent>
                                    <StaffIcon fontSize="large" color="primary" />
                                    <Typography variant="h6" fontWeight="bold" sx={{ margin: '10px 0' }}>
                                        Staff Management
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        
                                        onClick={handleStaffManagement}
                                        sx={{ backgroundColor: '#1D8731' ,width: '100%', marginTop: 1 }} // Button styling
                                    >
                                        Manage Staff
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card elevation={3} sx={{ textAlign: 'center', padding: 2 }}>
                                <CardContent>
                                    <CustomerIcon fontSize="large" color="secondary" />
                                    <Typography variant="h6" fontWeight="bold" sx={{ margin: '10px 0' }}>
                                        Customer Management
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleCustomerManagement}
                                        sx={{ width: '100%', marginTop: 1 }} // Button styling
                                    >
                                        Manage Customers
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <AdminFoot /> {/* Include AdminFoot here */}
        </>
    );
};

export default AdminControlPanel;
