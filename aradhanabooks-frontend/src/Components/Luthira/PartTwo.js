import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PartTwo() {
  const navigate = useNavigate();
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesCount, setExpensesCount] = useState(0);

  const navigateTo = (path) => {
    navigate(path);
  };

  useEffect(() => {
    fetchExpensesData();
  }, []);

  const fetchExpensesData = async () => {
    try {
      const response = await Axios.get('http://localhost:2001/api/expenses');
      const expenses = response.data || [];
      const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
      setTotalExpenses(total);
      setExpensesCount(expenses.length);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const expensesCountData = {
    labels: ['Total Expenses Count'],
    datasets: [
      {
        label: 'Expenses Count',
        data: [expensesCount],
        backgroundColor: 'rgba(25, 118, 210, 0.6)',
      },
    ],
  };

  const expensesCountOptions = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 10,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Expenses Count',
      },
    },
  };

  const totalExpensesData = {
    labels: ['Total Expenses Amount'],
    datasets: [
      {
        label: 'Total Amount',
        data: [totalExpenses],
        backgroundColor: 'rgba(235, 101, 101, 0.6)',
      },
    ],
  };

  const totalExpensesOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 60000,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Expenses Amount',
      },
    },
  };

  return (
    <div style={{
      display: 'flex',
      backgroundImage: 'url("/path/to/your/book-background.jpg")', // image path
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}>
      {/* Sidebar */}
      <div className="sidebar open" style={{ width: '220px', height: '120vh', backgroundColor: '#1D8731', padding: '20px', position: 'sticky' }}>
        <center><h5 style={{ color: 'white' }}>ARADHANA BOOK STATIONARY</h5></center>
        <ul className="luthira_sidebar-menu" style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Button
              variant="text"
              onClick={() => navigateTo('/createExpenses')}
              sx={{ color: 'white', width: '100%', textAlign: 'left', marginBottom: '10px', padding: '10px' }}>
              Add Expenses
            </Button>
          </li>
          <li>
            <Button
              variant="text"
              onClick={() => navigateTo('/expensesview')}
              sx={{ color: 'white', width: '100%', textAlign: 'left', marginBottom: '10px', padding: '10px' }}>
              Expenses Details
            </Button>
          </li>
          <li>
            <Button
              variant="text"
              onClick={() => navigateTo('/GenReport')}
              sx={{ color: 'white', width: '100%', textAlign: 'left', marginBottom: '10px', padding: '10px' }}>
              Generate Report
            </Button>
          </li>
          <li>
            <Button
              variant="text"
              onClick={() => navigateTo('/Commision')}
              sx={{ color: 'white', width: '100%', textAlign: 'left', marginBottom: '10px', padding: '10px' }}>
              Commision
            </Button>
          </li>
          <li>
            <Button
              variant="text"
              onClick={() => navigateTo('/createSalary')}
              sx={{ color: 'white', width: '100%', marginBottom: '10px', padding: '10px' }}>
              Salary Calculation
            </Button>
          </li>
          <li>
            <Button
              variant="text"
              onClick={() => navigateTo('/salaryDetails')}
              sx={{ color: 'white', width: '100%', textAlign: 'left', padding: '10px' }}>
              Salary Details
            </Button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <Box sx={{ marginLeft: '220px', padding: '20px', flexGrow: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '20px', color: '#1D8731', textAlign: 'center', fontWeight: 'bold' }}>
          Expenses Overview
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Card
            sx={{
              minWidth: 275,
              margin: '10px',
              background: 'linear-gradient(90deg, hsla(132, 79%, 68%, 1) 0%, hsla(101, 62%, 48%, 1) 100%)',
              boxShadow: 3
            }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ color: 'white' }}>
                Total Expenses
              </Typography>
              <Typography variant="h6" sx={{ marginTop: '10px', color: 'white' }}>
                Rs. {totalExpenses.toFixed(2)} {/* Changed $ to Rs. */}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 275,
              margin: '10px',
              background: 'linear-gradient(90deg, hsla(132, 79%, 68%, 1) 0%, hsla(101, 62%, 48%, 1) 100%)',
              boxShadow: 3
            }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ color: 'white' }}>
                Total Expenses Count
              </Typography>
              <Typography variant="h6" sx={{ marginTop: '10px', color: 'white' }}>
                {expensesCount}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Bar Graph for Expenses Count */}
        <Box sx={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ minWidth: 500, background: 'linear-gradient(90deg, hsla(298, 68%, 90%, 1) 0%, hsla(30, 82%, 91%, 1) 100%)', boxShadow: 3 }}>
            <CardContent>
              <Bar options={expensesCountOptions} data={expensesCountData} />
            </CardContent>
          </Card>
        </Box>

        {/* Bar Graph for Total Expenses Amount */}
        <Box sx={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ minWidth: 500, background: 'linear-gradient(90deg, hsla(298, 68%, 90%, 1) 0%, hsla(30, 82%, 91%, 1) 100%)', boxShadow: 3 }}>
            <CardContent>
              <Bar options={totalExpensesOptions} data={totalExpensesData} />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
}
