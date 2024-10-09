import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function SalaryDetails() {
  const [salaries, setSalaries] = useState([]); // Salary data
  const [searchTerm, setSearchTerm] = useState(''); // For filtering
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate(); // Keep navigate for future use

  // Fetch all salary details from the backend
  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get('http://localhost:2001/api/salaries'); // Full API URL
        setSalaries(response.data);
      } catch (error) {
        console.error('There was an error fetching the salaries!', error.response || error.message);
        setError('Failed to fetch salary records.'); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchSalaries();
  }, []);

  // Filter salaries based on the search term (ID and Employee Name)
  const filteredSalaries = salaries.filter((salary) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      salary.employeeName.toLowerCase().includes(searchLower) ||
      salary.id.toString().includes(searchLower)
    );
  });

  // Show loading message while fetching data
  if (loading) {
    return <CircularProgress />;
  }

  // Show error message if there is an issue
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Generate PDF report for the searched employee
  const generatePDF = () => {
    if (!searchTerm) {
      alert('Please enter an employee name or ID to generate a report.');
      return;
    }

    const filteredData = filteredSalaries;

    if (filteredData.length === 0) {
      alert('No records found for the searched employee or ID.');
      return;
    }

    const doc = new jsPDF();
    doc.text('Salary Report', 14, 20);

    // Define the columns and the rows for the table
    const tableColumn = ['ID', 'Employee Name', 'Basic Salary', 'Expenses', 'Commission', 'Total Salary', 'Date', 'Actions'];
    const tableRows = [];

    // Loop through the salaries and create rows for the table
    filteredData.forEach(salary => {
      const salaryData = [
        salary.id,
        salary.employeeName,
        `Rs ${salary.basicSalary}`, // Changed currency to Rs
        `Rs ${salary.expenses}`, // Changed currency to Rs
        `Rs ${salary.commission}`, // Changed currency to Rs
        `Rs ${salary.totalSalary}`, // Changed currency to Rs
        new Date(salary.dateOfCalculation).toLocaleDateString(),
        '' // Placeholder for action column
      ];
      tableRows.push(salaryData);
    });

    // Generate the table in the PDF
    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
    });

    // Save the PDF
    doc.save(`${searchTerm}-salary-report.pdf`); // Save with employee name or ID
  };

  // Generate PDF report for all salary details
  const generateAllSalariesPDF = () => {
    if (salaries.length === 0) {
      alert('No salary records available to generate a report.');
      return;
    }

    const doc = new jsPDF();
    doc.text('Complete Salary Report', 14, 20);

    const tableColumn = ['ID', 'Employee Name', 'Basic Salary', 'Expenses', 'Commission', 'Total Salary', 'Date', ];
    const tableRows = [];

    // Loop through the salaries and create rows for the table
    salaries.forEach(salary => {
      const salaryData = [
        salary.id,
        salary.employeeName,
        `Rs ${salary.basicSalary}`, // Changed currency to Rs
        `Rs ${salary.expenses}`, // Changed currency to Rs
        `Rs ${salary.commission}`, // Changed currency to Rs
        `Rs ${salary.totalSalary}`, // Changed currency to Rs
        new Date(salary.dateOfCalculation).toLocaleDateString(),
      ];
      tableRows.push(salaryData);
    });

    // Generate the table in the PDF
    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
    });

    // Save the PDF
    doc.save('all-salaries-report.pdf'); // Save with a generic name
  };

  // Handle edit navigation
  const handleEdit = (id) => {
    navigate(`/edit-salary/${id}`); // Assuming you have a route for editing salary
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this salary record?')) {
      try {
        await axios.delete(`http://localhost:2001/api/salaries/${id}`); // Delete request
        setSalaries(salaries.filter((salary) => salary.id !== id)); // Update local state
      } catch (error) {
        console.error('There was an error deleting the salary record!', error);
        alert('Failed to delete the salary record.'); // Error message
      }
    }
  };

  return (
    <Container maxWidth="lg" className="salary-details">
      <Typography variant="h4" gutterBottom style={{ color: '#1D8731', fontWeight: 'bold' }}>
        <center>SALARY DETAILS</center>
      </Typography>

      {/* Search Field */}
      <TextField
        label="Search by Employee Name or ID"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* PDF Download Buttons */}
      <Button
        variant="contained"
        style={{ backgroundColor: '#1D8731', color: '#fff', marginBottom: '16px' }} // Updated color
        onClick={generatePDF}
      >
        Generate PDF Report (Filtered)
      </Button>

      <Button
        variant="contained"
        style={{ backgroundColor: '#007bff', color: '#fff', marginBottom: '16px', marginLeft: '8px' }} // New color
        onClick={generateAllSalariesPDF}
      >
        Generate PDF Report (All Salaries)
      </Button>

      {/* Salary Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Basic Salary</TableCell>
              <TableCell>Expenses</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Total Salary</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell> {/* Action Column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSalaries.length > 0 ? (
              filteredSalaries.map((salary) => (
                <TableRow key={salary.id}>
                  <TableCell>{salary.id}</TableCell>
                  <TableCell>{salary.employeeName}</TableCell>
                  <TableCell>{`Rs ${salary.basicSalary}`}</TableCell> {/* Changed currency to Rs */}
                  <TableCell>{`Rs ${salary.expenses}`}</TableCell> {/* Changed currency to Rs */}
                  <TableCell>{`Rs ${salary.commission}`}</TableCell> {/* Changed currency to Rs */}
                  <TableCell>{`Rs ${salary.totalSalary}`}</TableCell> {/* Changed currency to Rs */}
                  <TableCell>{new Date(salary.dateOfCalculation).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(salary.id)} // Edit button
                      style={{ marginRight: '8px' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(salary.id)} // Delete button
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="8" align="center">
                  No salary records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
