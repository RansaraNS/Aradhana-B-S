import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import { useNavigate } from 'react-router-dom';
import AdminHead from '../../Sasin/AdminHead';
import AdminFoot from '../../Sasin/AdminFoot';

const CustomerDashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:2001/api/auth/customers'); // Adjust the endpoint as necessary
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleDeleteCustomer = async (email) => {
        // Show confirmation before deleting
        const isConfirmed = window.confirm("Are you sure you want to delete this customer?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:2001/api/auth/customers/${email}`); // Fixed endpoint
                fetchCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    // Function to generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Customer List", 20, 20);
        const tableColumn = ["Name", "Email", "Contact Number", "Address"];
        const tableRows = [];

        customers.forEach(customer => {
            const customerData = [
                customer.name,
                customer.email,
                customer.contactNumber,
                customer.address
            ];
            tableRows.push(customerData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });

        doc.save("customers.pdf");
    };

    // Filter customers based on search term
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contactNumber.includes(searchTerm)
    );

    return (
        <>
            <AdminHead /> {/* Include AdminHead here */}
            <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Customer Dashboard
                </Typography>
                
                <Box display="flex" justifyContent="flex-end" alignItems="center" marginBottom={2}>
                    <TextField
                        variant="outlined"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '300px' }}
                    />
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Contact Number</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCustomers.map((customer) => (
                                <TableRow key={customer.email}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.contactNumber}</TableCell>
                                    <TableCell>{customer.address}</TableCell>
                                    <TableCell>
                                        <Box display="flex" justifyContent="space-between" gap={1}>
                                            <Button 
                                                variant="contained" 
                                                sx={{ backgroundColor: '#1D8731', color: 'white' }} 
                                                onClick={() => navigate(`/update-customer/${customer.email}`)}
                                            >
                                                Update
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                sx={{ backgroundColor: '#D32F2F', color: 'white' }} // Adjust color for delete button if needed
                                                onClick={() => handleDeleteCustomer(customer.email)}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="flex-end" marginTop={2}>
                    <Button 
                        variant="contained" 
                        sx={{ backgroundColor: '#1D8731', color: 'white' }} 
                        onClick={generatePDF}
                    >
                        Generate PDF
                    </Button>
                </Box>
            </Container>
            <AdminFoot /> {/* Include AdminFoot here */}
        </>
    );
};

export default CustomerDashboard;
