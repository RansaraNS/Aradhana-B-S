const express = require('express');
const Staff = require('../../models/Malitha/Staff'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

const router = express.Router();

// Get all staff members
router.get('/staff', async (req, res) => {
    try {
        const staffMembers = await Staff.find();
        res.status(200).json(staffMembers);
    } catch (error) {
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
        res.status(500).json({ message: error.message });
    }
});

// Create a new staff member
router.post('/register-staff', async (req, res) => {
    const { name, email, password, occupation, contactNumber, dateOfBirth } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = new Staff({
        name,
        email,
        password: hashedPassword,
        occupation,
        contactNumber,
        dateOfBirth,
    });

    try {
        await newStaff.save();
        res.status(201).json({ message: 'Staff added successfully!' });
    } catch (error) {
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
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
