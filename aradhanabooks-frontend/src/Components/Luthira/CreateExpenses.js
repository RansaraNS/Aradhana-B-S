import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpensesForm from "./ExpensesForm";
import Axios from "axios";
import { useState } from "react";

const CreateExpenses = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const addExpense = (data) => {
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

    Axios.post('http://localhost:2001/api/createexpense', payload)
      .then(() => {
        setSubmitted(false);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };

  return (
    <Box
      sx={{
        width: '90%',
        maxWidth: '750px', 
        margin: 'auto',
        marginTop: '60px',
        backgroundColor: '#e8f5e9', 
        padding: '30px', 
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          marginBottom: '20px',
          fontSize: '24px', 
          fontWeight: 'bold',
          color: '#388e3c', 
        }}
      >
        Create a New Expense
      </Box>

      <ExpensesForm
        addExpense={addExpense}
        submitted={submitted}
        data={{}}
        isEdit={false}
      />

      <Button
        sx={{
          marginTop: '20px',
          backgroundColor: '#EB6565', // Updated button color
          color: '#fff',
          padding: '10px 40px', 
          fontSize: '16px', 
          fontWeight: 'bold',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#d04c4c', // Slightly darker color for hover effect
            transform: 'scale(1.05)', 
          },
        }}
        onClick={() => navigate('/')}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default CreateExpenses;
