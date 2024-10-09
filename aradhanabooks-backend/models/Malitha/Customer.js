const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    address: { 
        type: String,
        required: true,
    }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema); // Changed from 'Customers' to 'Customer'
module.exports = Customer; // Changed from 'User' to 'Customer'
