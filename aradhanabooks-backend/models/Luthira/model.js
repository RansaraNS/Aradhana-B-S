const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    id: Number,
    name: String,
    department: String,
    dateOfExpenses: Date,
    category: String,
    description: String,
    amount: Number,
    attachReceipts: String,
});

const salarySchema = new Schema({
    id: Number,
    employeeName: String,
    basicSalary: Number,
    expenses: Number,
    commission: Number,
    totalSalary: Number,
    dateOfCalculation: Date,
});

const Expense = mongoose.model('expense', expenseSchema);
const Salary = mongoose.model('exsalary', salarySchema);

module.exports = { Expense, Salary };
