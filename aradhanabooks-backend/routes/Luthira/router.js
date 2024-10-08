const express = require('express');
const router = express.Router();  // Use express.Router
const controller = require('../../routes/Luthira/controller.js');

router.get('/expenses', controller.getExpenses);
router.post('/createexpense', controller.addExpense);
router.post('/updateexpense', controller.updateExpense);
router.post('/deleteexpense', controller.deleteExpense);

router.post('/addSalary', controller.addSalary);
router.get('/salaries', controller.getSalaries);
router.post('/updateSalary', controller.updateSalary);
router.post('/deleteSalary', controller.deleteSalary);

module.exports = router;
