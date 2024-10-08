import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SalaryCalculationForm = () => {
  const [id, setEmployeeID] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [basicSalary, setBasicSalary] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [commission, setCommission] = useState(0);
  const [totalSalary, setTotalSalary] = useState(null);

  const [expenseData, setExpenseData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const [riderData, setRiderData] = useState([]);
  const [riderSearchTerm, setRiderSearchTerm] = useState('');
  const [filteredRiders, setFilteredRiders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
    fetchRiders();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:2001/api/expenses');
      setExpenseData(response.data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchRiders = async () => {
    try {
      const response = await axios.get('http://localhost:2001/api/riders');
      setRiderData(response.data.response || []);
    } catch (error) {
      console.error('Error fetching riders:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:2001/api/addSalary', {
        id,
        employeeName,
        basicSalary: parseFloat(basicSalary),
        expenses: parseFloat(expenses),
        commission: parseFloat(commission),
      });

      setTotalSalary(response.data.salary.totalSalary);
    } catch (error) {
      console.error('Error calculating salary:', error);
    }
  };

  const handleSearch = () => {
    const matchedExpenses = expenseData.filter(
      (expense) =>
        expense.id.toString() === searchTerm ||
        expense.name.toLowerCase() === searchTerm.toLowerCase()
    );
    setFilteredExpenses(matchedExpenses);
  };

  const handleRiderSearch = () => {
    const matchedRiders = riderData.filter(
      (rider) =>
        rider.id.toString() === riderSearchTerm ||
        rider.name.toLowerCase() === riderSearchTerm.toLowerCase()
    );
    setFilteredRiders(matchedRiders);
  };

  return (
    <Container maxWidth="md" className="salary-calculation-form">
      <Typography variant="h4" gutterBottom style={{ color: '#1D8731', fontWeight: 'bold' }}>
        <center>STAFF SALARY CALCULATION</center>
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Employee ID"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={id}
          onChange={(e) => setEmployeeID(e.target.value)}
          required
        />
        <TextField
          label="Employee Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        />
        <TextField
          label="Basic Salary"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={basicSalary}
          onChange={(e) => setBasicSalary(e.target.value)}
          required
        />
        <TextField
          label="Expenses"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          required
        />
        <TextField
          label="Commission"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={commission}
          onChange={(e) => setCommission(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          style={{ backgroundColor: '#EB6565', color: '#fff' }}
        >
          Calculate Salary
        </Button>
      </form>

      {totalSalary !== null && (
        <Typography variant="h6" gutterBottom>
          Total Salary: ${totalSalary}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={() => navigate('/PartTwo')}
        style={{ backgroundColor: '#1D8731', color: '#fff', marginTop: '10px', marginRight: '503px' }}
      >
        Go to Dashboard
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate('/SalaryDetails')}
        style={{ backgroundColor: '#1D8731', color: '#fff', marginTop: '10px' }}
      >
        View Salary Details
      </Button>

      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        {/* Expense Details Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <Typography variant="h6">Search Expense by ID or Name</Typography>
            <TextField
              label="Enter Expense ID or Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="contained"
              style={{ backgroundColor: '#1D8731', color: '#fff' }}
              onClick={handleSearch}
              fullWidth
            >
              Search Expense
            </Button>

            {filteredExpenses.length > 0 ? (
              <Box sx={{ marginTop: '20px' }}>
                {filteredExpenses.map((expense) => (
                  <Box key={expense.id} sx={{ marginBottom: '10px' }}>
                    <Typography variant="body1">
                      <strong>Expense ID:</strong> {expense.id}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Expense Name:</strong> {expense.name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Expense Amount:</strong> ${expense.amount}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              searchTerm && (
                <Typography variant="body1" sx={{ marginTop: '20px' }}>
                  No matching records found.
                </Typography>
              )
            )}
          </Box>
        </Grid>

        {/* Rider Details Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <Typography variant="h6">Search Rider by ID or Name</Typography>
            <TextField
              label="Enter Rider ID or Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={riderSearchTerm}
              onChange={(e) => setRiderSearchTerm(e.target.value)}
            />
            <Button
              variant="contained"
              style={{ backgroundColor: '#1D8731', color: '#fff' }}
              onClick={handleRiderSearch}
              fullWidth
            >
              Search Rider
            </Button>

            {filteredRiders.length > 0 ? (
              <Box sx={{ marginTop: '20px' }}>
                {filteredRiders.map((rider) => (
                  <Box key={rider.id} sx={{ marginBottom: '10px' }}>
                    <Typography variant="body1">
                      <strong>Rider ID:</strong> {rider.id}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Rider Name:</strong> {rider.name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Assigned Tasks:</strong> {rider.assignedTasks}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              riderSearchTerm && (
                <Typography variant="body1" sx={{ marginTop: '20px' }}>
                  No matching records found.
                </Typography>
              )
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SalaryCalculationForm;
