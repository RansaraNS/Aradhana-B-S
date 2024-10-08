import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Container, Grid, Paper, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GenReport = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    Axios.get('http://localhost:2001/api/expenses')
      .then(response => {
        setExpenses(response.data || []);
      })
      .catch(error => {
        console.error("Error fetching expenses:", error);
      });
  };

  const handleSearch = (event) => {
    setSearchId(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };

  const generatePdfReport = () => {
    const doc = new jsPDF();
    doc.text('Delivery Riders Expense Report', 65, 20);

    const tableColumn = ['ID', 'Name', 'Department', 'Date', 'Category', 'Description', 'Amount'];
    const tableRows = [];

    const filteredExpenses = expenses.filter(expense => 
      String(expense.id).includes(searchId)
    );

    filteredExpenses.forEach(expense => {
      const expenseData = [
        expense.id,
        expense.name,
        expense.department,
        formatDate(expense.dateOfExpenses), 
        expense.category,
        expense.description,
        `${expense.amount}`,
      ];
      tableRows.push(expenseData);
    });

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('expense_report.pdf');
  };

  const filteredExpenses = expenses.filter(expense => 
    String(expense.id).includes(searchId)
  );

  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px', padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '30px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold', color: '#1976d2' }}>
          Expenses Report
        </Typography>

        {/* Search Input */}
        <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
          <TextField
            label="Search by ID"
            variant="outlined"
            value={searchId}
            onChange={handleSearch}
            sx={{ width: '300px' }}
          />
        </Box>

        <Grid container spacing={2}>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense, index) => (
              <Grid item xs={12} sm={6} md={4} key={expense.id}>
                <Paper elevation={1} sx={{ padding: '20px', backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0' }}>
                  <Typography variant="body1"><strong>ID:</strong> {expense.id}</Typography>
                  <Typography variant="body1"><strong>Name:</strong> {expense.name}</Typography>
                  <Typography variant="body1"><strong>Department:</strong> {expense.department}</Typography>
                  <Typography variant="body1"><strong>Date:</strong> {formatDate(expense.dateOfExpenses)}</Typography>
                  <Typography variant="body1"><strong>Category:</strong> {expense.category}</Typography>
                  <Typography variant="body1"><strong>Description:</strong> {expense.description}</Typography>
                  <Typography variant="body1"><strong>Amount:</strong> ${expense.amount}</Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography>No expenses found.</Typography>
          )}
        </Grid>

        <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, hsla(132, 79%, 68%, 1) 0%, hsla(101, 62%, 48%, 1) 100%)',
              color: '#fff',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '5px',
              '&:hover': {
                background: 'linear-gradient(90deg, hsla(132, 79%, 68%, 1) 0%, hsla(101, 62%, 48%, 1) 100%)',
                opacity: '0.9',
              },
            }}
            onClick={generatePdfReport}
            disabled={filteredExpenses.length === 0}
          >
            Generate PDF Report
          </Button>
        </Box>

        {/* Button to navigate to Dashboard */}
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
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
            onClick={() => navigate('/')}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default GenReport;
