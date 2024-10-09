import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin for jsPDF
import AdminHead from '../../Sasin/AdminHead';
import AdminFoot from '../../Sasin/AdminFoot';

const StaffDashboard = () => {
    const [staffList, setStaffList] = useState([]);
    const [filteredStaffList, setFilteredStaffList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOccupation, setFilterOccupation] = useState('');
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

    const fetchStaff = async () => {
        try {
            const response = await axios.get('http://localhost:2001/api/auth/staff');
            setStaffList(response.data);
            setFilteredStaffList(response.data);
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    };

    const handleDelete = async (email) => {
        if (window.confirm('Are you sure you want to delete this staff member?')) {
            try {
                await axios.delete(`http://localhost:2001/api/auth/staff/${email}`);
                fetchStaff();
                setSnackbarOpen(true);
                setSnackbarMessage('Staff deleted successfully!');
            } catch (error) {
                console.error('Error deleting staff:', error);
                setSnackbarOpen(true);
                setSnackbarMessage('Error deleting staff.');
            }
        }
    };

    const handleUpdate = (email) => {
        navigate(`/update-staff/${email}`);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        applyFilters(event.target.value, filterOccupation);
    };

    const handleFilterChange = (event) => {
        setFilterOccupation(event.target.value);
        applyFilters(searchTerm, event.target.value);
    };

    const applyFilters = (searchValue, occupationValue) => {
        const lowercasedSearchTerm = searchValue.toLowerCase();
        const filteredData = staffList.filter((staff) => {
            const matchesSearch = staff.name.toLowerCase().includes(lowercasedSearchTerm) || staff.email.toLowerCase().includes(lowercasedSearchTerm);
            const matchesOccupation = occupationValue ? staff.occupation === occupationValue : true;
            return matchesSearch && matchesOccupation;
        });
        setFilteredStaffList(filteredData);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Staff List', 14, 16);

        // Prepare data for the table
        const tableData = filteredStaffList.map(staff => [
            staff.name,
            staff.email,
            staff.occupation,
            staff.contactNumber,
            staff.dateOfBirth,
        ]);

        // Add autotable for better formatting
        doc.autoTable({
            head: [['Name', 'Email', 'Occupation', 'Contact Number', 'Date of Birth']],
            body: tableData,
            startY: 30,
            theme: 'grid', // You can change the theme here
            styles: { cellPadding: 5, fontSize: 10 },
        });

        // Save the PDF
        doc.save('staff_list.pdf');
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <AdminHead /> {/* Include AdminHead here */}
            <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Staff Dashboard
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
                    <Button 
                        variant="contained" 
                        sx={{ backgroundColor: '#1D8731', color: 'white' }} 
                        onClick={() => navigate('/add-staff')}
                    >
                        Add New Staff
                    </Button>

                    {/* Search and Filter Controls */}
                    <Box display="flex" gap={2}>
                        {/* Filter by Occupation */}
                        <TextField
                            select
                            label="Filter by Occupation"
                            value={filterOccupation}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            style={{ width: 200 }}
                        >
                            <MenuItem value="">All</MenuItem>
                            {occupations.map((occupation) => (
                                <MenuItem key={occupation} value={occupation}>
                                    {occupation}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Search */}
                        <TextField
                            label="Search by Name/Email"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            size="small"
                            style={{ width: 200 }}
                        />
                    </Box>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Occupation</TableCell>
                                <TableCell>Contact Number</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStaffList.map((staff) => (
                                <TableRow key={staff.email}>
                                    <TableCell>{staff.name}</TableCell>
                                    <TableCell>{staff.email}</TableCell>
                                    <TableCell>{staff.occupation}</TableCell>
                                    <TableCell>{staff.contactNumber}</TableCell>
                                    <TableCell>{staff.dateOfBirth}</TableCell>
                                    <TableCell>
                                        <Box display="flex" justifyContent="space-between" gap={2}>
                                            <Button 
                                                variant="contained" 
                                                sx={{ backgroundColor: '#1D8731', color: 'white' }} 
                                                onClick={() => handleUpdate(staff.email)}
                                            >
                                                Update
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                sx={{ backgroundColor: '#D32F2F', color: 'white' }} // Adjust color for delete button if needed
                                                onClick={() => handleDelete(staff.email)}
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

                {/* PDF Download Button */}
                <Box display="flex" justifyContent="flex-end" marginTop="20px">
                    <Button 
                        variant="contained" 
                        sx={{ backgroundColor: '#1D8731', color: 'white' }} 
                        onClick={generatePDF}
                    >
                        Download PDF Report
                    </Button>
                </Box>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                />
            </Container>
            <AdminFoot /> {/* Include AdminFoot here */}
        </>
    );
};

export default StaffDashboard;
