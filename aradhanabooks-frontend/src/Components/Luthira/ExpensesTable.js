import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import './PartTable.css';

const ExpensesTable = ({ rows, selectedExpense, deleteExpense }) => { // Receive selectedExpense as a prop
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Date Of Expenses</TableCell>
                        <TableCell>Expense Category</TableCell>
                        <TableCell>Description Of Expenses</TableCell>
                        <TableCell>Total Expense Amount</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 ? rows.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.department}</TableCell>
                            <TableCell>{row.dateOfExpenses}</TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.amount}</TableCell>
                           
                            <TableCell>
                                <Button sx={{ margin: '0px 10px' }} onClick={() => selectedExpense({ id: row.id, name: row.name, department: row.department, dateOfExpenses: row.dateOfExpenses, category: row.category, description: row.description, amount: row.amount})}>
                                    Update
                                </Button>
                                <Button sx={{ margin: '0px 10px' }} onClick={() => deleteExpense({ id: row.id })}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={12} align="center">No Data</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ExpensesTable;
