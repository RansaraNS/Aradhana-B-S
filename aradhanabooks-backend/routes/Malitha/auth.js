const express = require('express');
const bcrypt = require('bcrypt');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../../models/Malitha/Customer'); // Adjust the path as necessary
const Staff = require('../../models/Malitha/Staff'); // Adjust the path as necessary
const Admin = require('../../models/Malitha/Admin'); // Adjust the path as necessary

const router = express.Router();

const JWT_SECRET = 'your_jwt_secret';

// Helper function to validate required fields
const validateFields = (fields) => {
    return fields.every(field => field);
};

// Customer registration
router.post('/register', async (req, res) => {
    const { name, email, password, contactNumber, address } = req.body;

    if (!validateFields([name, email, password, contactNumber, address])) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newCustomer = new Customer({
            name,
            email,
            password: hashedPassword,
            contactNumber,
            address
        });

        await newCustomer.save();
        res.status(201).json({ message: 'Customer registered successfully' });
    } catch (error) {
        console.error('Error registering customer:', error); // Log the error
        res.status(500).json({ message: 'An error occurred during registration', error: error.message });
    }
});

// Staff registration
router.post('/register-staff', async (req, res) => {
    const { name, email, password, occupation, contactNumber, dateOfBirth } = req.body;

    if (!validateFields([name, email, password, occupation, contactNumber, dateOfBirth])) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ message: 'Email is already registered for staff' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStaff = new Staff({
            name,
            email,
            password: hashedPassword,
            occupation,
            contactNumber,
            dateOfBirth
        });

        await newStaff.save();
        res.status(201).json({ message: 'Staff registered successfully' });
    } catch (error) {
        console.error('Error registering staff:', error);
        res.status(500).json({ error: error.message });
    }
});

// Admin registration
router.post('/register-admin', async (req, res) => {
    const { email, password } = req.body;

    if (!validateFields([email, password])) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ error: error.message });
    }
});

// Admin login
router.post('/admin-login', async (req, res) => {
    const { email, password } = req.body;

    if (!validateFields([email, password])) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Admin logged in successfully' });
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({ error: error.message });
    }
});

// Customer login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!validateFields([email, password])) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const customer = await Customer.findOne({ email });
        if (!customer) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcryptjs.compare(password, customer.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: customer._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Customer logged in successfully' });
    } catch (error) {
        console.error('Error logging in customer:', error);
        res.status(500).json({ error: error.message });
    }
});

// Staff login
router.post('/staff-login', async (req, res) => {
    const { email, password } = req.body;

    if (!validateFields([email, password])) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const staff = await Staff.findOne({ email });
        if (!staff) return res.status(404).json({ message: 'Staff not found' });

        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: staff._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Staff logged in successfully' });
    } catch (error) {
        console.error('Error logging in staff:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get all staff members
router.get('/staff', async (req, res) => {
    try {
        const staffMembers = await Staff.find();
        res.status(200).json(staffMembers);
    } catch (error) {
        console.error('Error fetching staff members:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get a single staff member by email
router.get('/staff/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const staffMember = await Staff.findOne({ email });
        if (!staffMember) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.status(200).json(staffMember);
    } catch (error) {
        console.error('Error fetching staff member:', error);
        res.status(500).json({ message: error.message });
    }
});

// Update a staff member by email
router.put('/staff/:email', async (req, res) => {
    const { email } = req.params;
    const { name, occupation, contactNumber, dateOfBirth } = req.body;

    try {
        const updatedStaff = await Staff.findOneAndUpdate(
            { email },
            { name, occupation, contactNumber, dateOfBirth },
            { new: true }
        );

        if (!updatedStaff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        res.status(200).json({ message: 'Staff updated successfully!', updatedStaff });
    } catch (error) {
        console.error('Error updating staff member:', error);
        res.status(500).json({ message: error.message });
    }
});

// Delete a staff member by email
router.delete('/staff/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const deletedStaff = await Staff.findOneAndDelete({ email });
        if (!deletedStaff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.status(200).json({ message: 'Staff deleted successfully!' });
    } catch (error) {
        console.error('Error deleting staff member:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get all customers
router.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get customer by email
router.get('/customers/:email', async (req, res) => {
    try {
        const customer = await Customer.findOne({ email: req.params.email });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ message: error.message });
    }
});

// Update customer by email
router.put('/customers/:email', async (req, res) => {
    const { email } = req.params;
    const { name, contactNumber, address } = req.body;

    try {
        const updatedCustomer = await Customer.findOneAndUpdate(
            { email },
            { name, contactNumber, address },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer updated successfully!', updatedCustomer });
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: error.message });
    }
});

// Delete customer by email
router.delete('/customers/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const deletedCustomer = await Customer.findOneAndDelete({ email });
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully!' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
