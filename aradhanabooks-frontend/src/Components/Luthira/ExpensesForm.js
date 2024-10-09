import { Button, Grid, Input, MenuItem, Select, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const ExpensesForm = ({ addExpense, updateExpense, submitted, data, isEdit }) => {
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [dateOfExpenses, setDateOfExpenses] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescriptionofExpenses] = useState('');
    const [amount, setAmount] = useState('');

    const [errors, setErrors] = useState({
        id: '',
        name: '',
        amount: '',
    });

    const handleButtonClick = () => {
        const validationErrors = validateFields();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (isEdit) {
            updateExpense({ id, name, department, dateOfExpenses, category, description, amount });
        } else {
            addExpense({ id, name, department, dateOfExpenses, category, description, amount });
        }
        navigate('/expenses');
    };

    // Validation 
    const validateFields = () => {
        const errors = {};

        if (id <= 0) {
            errors.id = 'ID must be a positive number.';
        }

        if (!name.trim()) {
            errors.name = 'Name is required.';
        }

        if (amount <= 0) {
            errors.amount = 'Amount must be greater than zero.';
        }

        return errors;
    };

    useEffect(() => {
        if (!submitted) {
            setId(0);
            setName('');
            setDepartment('');
            setDateOfExpenses('');
            setCategory('');
            setDescriptionofExpenses('');
            setAmount('');
            setErrors({});
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setId(data.id);
            setName(data.name);
            setDepartment(data.department);
            setDateOfExpenses(data.dateOfExpenses);
            setCategory(data.category);
            setDescriptionofExpenses(data.description);
            setAmount(data.amount);
        }
    }, [data]);

    return (
        <Grid
            container
            spacing={2}
            sx={{
                backgroundColor: '#f8f8f8',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                maxWidth: '700px',
                margin: 'auto',
                marginTop: '50px',
            }}
        >
            {/* Form Title */}
            <Grid item xs={12}>
                <Typography
                    component="h1"
                    sx={{
                        color: '#333',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '10px',
                    }}
                >
                    Expenses Form
                </Typography>
            </Grid>

            {/* ID Field */}
            <Grid item xs={12}>
                <Input
                    placeholder="ID"
                    type="number"
                    fullWidth
                    value={id}
                    onChange={e => setId(e.target.value)}
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                    }}
                    error={!!errors.id}
                />
                {errors.id && (
                    <Typography color="error" variant="caption">
                        {errors.id}
                    </Typography>
                )}
            </Grid>

            {/* Name Field */}
            <Grid item xs={12}>
                <Input
                    placeholder="Name"
                    fullWidth
                    value={name}
                    onChange={e => setName(e.target.value)}
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                    }}
                    error={!!errors.name}
                />
                {errors.name && (
                    <Typography color="error" variant="caption">
                        {errors.name}
                    </Typography>
                )}
            </Grid>

            {/* Department Dropdown */}
            <Grid item xs={12}>
                <Select
                    fullWidth
                    value={department}
                    displayEmpty
                    onChange={e => setDepartment(e.target.value)}
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                    }}
                >
                    <MenuItem value="" disabled>
                        Select Department
                    </MenuItem>
                    <MenuItem value="Riders">Riders</MenuItem>
                    <MenuItem value="Financial">Financial</MenuItem>
                    <MenuItem value="Sales and Marketing">Sales and Marketing</MenuItem>
                </Select>
            </Grid>

            {/* Date of Expenses Field */}
            <Grid item xs={12}>
                <Input
                    type="date"
                    fullWidth
                    value={dateOfExpenses}
                    onChange={e => setDateOfExpenses(e.target.value)}
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                    }}
                />
            </Grid>

            {/* Category Field */}
            <Grid item xs={12}>
                <Select
                    fullWidth
                    value={category}
                    displayEmpty
                    onChange={e => setCategory(e.target.value)}
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                    }}
                >
                    <MenuItem value="" disabled>
                        Category
                    </MenuItem>
                    <MenuItem value="travel">Fuel Costs</MenuItem>
                    <MenuItem value="officeSupplies">Tolls and Parking</MenuItem>
                    <MenuItem value="training">Insurance</MenuItem>
                    <MenuItem value="meals">Vehicle Maintenance</MenuItem>
                </Select>
            </Grid>

            {/* Description Field */}
            <Grid item xs={12}>
                <TextareaAutosize
                    minRows={3}
                    placeholder="Description of Expense"
                    value={description}
                    onChange={e => setDescriptionofExpenses(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                    }}
                />
            </Grid>

            {/* Amount Field */}
            <Grid item xs={12}>
                <Input
                    type="number"
                    placeholder="Total Amount"
                    fullWidth
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                    }}
                    error={!!errors.amount}
                />
                {errors.amount && (
                    <Typography color="error" variant="caption">
                        {errors.amount}
                    </Typography>
                )}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
                <Button
                    fullWidth
                    sx={{
                        backgroundColor: '#1D8731',
                        color: '#fff',
                        padding: '10px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: '#EB6565',
                        },
                    }}
                    onClick={handleButtonClick}
                >
                    {isEdit ? 'Update' : 'Add'}
                </Button>
            </Grid>
        </Grid>
    );
};

export default ExpensesForm;
