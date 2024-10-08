import { Box, Button, TextField, Grid } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import ExpensesForm from "./ExpensesForm";
import ExpensesTable from "./ExpensesTable";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
  const navigate = useNavigate();

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    Axios.get('http://localhost:2001/api/expenses')
      .then(response => {
        setExpenses(response.data || []);
      })
      .catch(error => {
        console.error("Axios Error:", error);
      });
  };

  const filterExpenses = (term) => {
    if (!term) {
      getExpenses(); // If search term is empty, fetch all expenses
    } else {
      const filteredExpenses = expenses.filter(expense => 
        expense.name.toLowerCase().includes(term.toLowerCase()) ||
        expense.id.toString().includes(term)
      );
      setExpenses(filteredExpenses); // Update state with filtered expenses
    }
  };

  const updateExpense = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
      department: data.department,
      dateOfExpenses: data.dateOfExpenses,
      category: data.category,
      description: data.description,
      amount: data.amount,
    };

    Axios.post('http://localhost:2001/api/updateexpense', payload)
      .then(() => {
        getExpenses();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        console.error("Axios Error:", error);
      });
  };

  const deleteExpense = (data) => {
    Axios.post('http://localhost:2001/api/deleteexpense', data)
      .then(() => {
        getExpenses();
      })
      .catch(error => {
        console.error("Axios Error:", error);
      });
  };

  const generatePdfReport = () => {
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.text('Expense Report', 14, 20);

    // Define the columns and the rows for the table
    const tableColumn = ['ID', 'Name', 'Department', 'Date', 'Category', 'Description', 'Amount(Rs)'];
    const tableRows = [];

    // Loop through the expenses and create rows for the table
    expenses.forEach(expense => {
      const expenseData = [
        expense.id,
        expense.name,
        expense.department,
        expense.dateOfExpenses,
        expense.category,
        expense.description,
        `${expense.amount}`,
      ];
      tableRows.push(expenseData);
    });

    // Generate the table in the PDF
    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
    });

    // Save the PDF
    doc.save('expense_report.pdf');
  };

  return (
    <Box
      sx={{
        width: 'calc(100% - 100px)',
        margin: 'auto',
        marginTop: '100px',
        backgroundColor: '#199919',
        padding: '20px',
        borderRadius: '8px',
      }}
    >
      {/* Centered Content with Grid */}
      <Grid container justifyContent="center" spacing={2}>
        {/* Search Input */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search by name or ID"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              filterExpenses(e.target.value);
            }}
            value={searchTerm} // Keep search input controlled
            sx={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              
            }}
          />
        </Grid>

        {/* Dashboard Button */}
        <Grid item>
          <Button
            sx={{
              marginTop: '20px',
              background: 'linear-gradient(90deg, hsla(132, 79%, 68%, 1) 0%, hsla(101, 62%, 48%, 1) 100%)',
              color: '#fff',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '5px',
              '&:hover': {
                opacity: '0.8',
                background: 'linear-gradient(90deg, hsla(132, 79%, 68%, 0.8) 0%, hsla(101, 62%, 48%, 0.8) 100%)',
              },
            }}
            onClick={() => navigate('/')}
          >
            Dashboard
          </Button>
        </Grid>

        {/* Generate PDF Report Button */}
        <Grid item>
          <Button
            sx={{
              marginTop: '20px',
              background: 'linear-gradient(90deg, hsla(132, 79%, 68%, 1) 0%, hsla(101, 62%, 48%, 1) 100%)',
              color: '#fff',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '5px',
              '&:hover': {
                opacity: '0.8',
                background: 'linear-gradient(90deg, hsla(132, 79%, 68%, 0.8) 0%, hsla(101, 62%, 48%, 0.8) 100%)',
              },
            }}
            onClick={generatePdfReport}
          >
            Report
          </Button>
        </Grid>
      </Grid>

      {/* Expenses Table */}
      <ExpensesTable
        rows={expenses}
        selectedExpense={(data) => {
          setSelectedExpense(data);
          setIsEdit(true);
        }}
        deleteExpense={(data) => window.confirm('Are you sure?') && deleteExpense(data)}
      />

      {/* Edit Form if editing */}
      {isEdit && (
        <ExpensesForm
          updateExpense={updateExpense}
          submitted={submitted}
          data={selectedExpense}
          isEdit={isEdit}
        />
      )}
    </Box>
  );
};

export default Expenses;
