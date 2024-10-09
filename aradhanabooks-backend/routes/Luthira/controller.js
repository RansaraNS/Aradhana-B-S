const Expense = require('../../models/Luthira/model.js').Expense;
const Salary = require('../../models/Luthira/model.js').Salary;

// EXPENSES

// Get all expenses
const getExpenses = (req, res, next) => {
    Expense.find()
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json({ error });
        });
};

// Add a new expense
const addExpense = (req, res, next) => {
    const expense = new Expense({
        id: req.body.id,
        name: req.body.name,
        department: req.body.department,
        dateOfExpenses: req.body.dateOfExpenses,
        excategory: req.body.excategory,
        description: req.body.description,
        amount: req.body.amount,
    });

    expense.save()
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json({ error });
        });
};

// Update an expense's details
const updateExpense = (req, res, next) => {
    const { id, name, department, dateOfExpenses, category, description, amount } = req.body;
    Expense.updateOne({ id: id }, {
        $set: {
            name: name,
            department: department,
            dateOfExpenses: dateOfExpenses,
            category: category,
            description: description,
            amount: amount
        }
    })
    .then(response => {
        res.json(response);
    })
    .catch(error => {
        res.json({ error });
    });
};

// Delete an expense
const deleteExpense = (req, res, next) => {
    const id = req.body.id;
    Expense.deleteOne({ id: id })
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error });
        });
};


// SALARIES

// Get all salaries
const getSalaries = (req, res, next) => {
    Salary.find()
        .then(response => res.json(response))
        .catch(error => res.json({ error }));
};

// Add a new salary calculation
const addSalary = (req, res, next) => {
    const { id, employeeName, basicSalary, expenses, commission } = req.body;
    const totalSalary = basicSalary + expenses + commission;

    const salary = new Salary({
        id,
        employeeName,
        basicSalary,
        expenses,
        commission,
        totalSalary,
        dateOfCalculation: new Date(),
    });

    salary.save()
        .then(response => {
            res.json({
                message: 'Salary added successfully!',
                salary: response // return the saved salary data
            });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to add salary' });
        });
};

// Update salary details
const updateSalary = (req, res, next) => {
    const { id, employeeName, basicSalary, expenses, commission } = req.body;
    const totalSalary = basicSalary + expenses + commission;

    Salary.updateOne({ id }, {
        $set: {
            employeeName,
            basicSalary,
            expenses,
            commission,
            totalSalary,
            dateOfCalculation: new Date(),
        }
    })
    .then(response => res.json(response))
    .catch(error => res.json({ error }));
};

// Delete a salary
const deleteSalary = (req, res, next) => {
    const id = req.body.id;
    Salary.deleteOne({ id })
        .then(response => res.json(response))
        .catch(error => res.json({ error }));
};

// EXPORTING FUNCTIONS
exports.getExpenses = getExpenses;
exports.addExpense = addExpense;
exports.updateExpense = updateExpense;
exports.deleteExpense = deleteExpense;

exports.getSalaries = getSalaries;
exports.addSalary = addSalary;
exports.updateSalary = updateSalary;
exports.deleteSalary = deleteSalary;
