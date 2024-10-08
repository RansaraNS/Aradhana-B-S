const express = require('express');
const nodemailer = require('nodemailer'); // For sending emails
const LoyaltyDiscount = require('../../models/Malitha/loyaltyDiscount.model'); // Ensure this path is correct
const Order = require('../../models/Ishara/order.model'); // Ensure this path is correct

const router = express.Router();

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to any email service you are using
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password', // Replace with your email password or app-specific password
  },
});

// Fetch all loyalty packages
router.get('/', async (req, res) => {
  try {
    const packages = await LoyaltyDiscount.find();
    res.json(packages);
  } catch (error) {
    console.error('Error fetching loyalty packages:', error);
    res.status(500).json({ message: 'Error fetching loyalty packages' });
  }
});

// Create a new loyalty package
router.post('/create', async (req, res) => {
  const { packageName, description, conditionAmount, discountPercentage } = req.body;

  // Validation to ensure required fields are provided
  if (!packageName || !description || !conditionAmount || !discountPercentage) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newPackage = new LoyaltyDiscount({ packageName, description, conditionAmount, discountPercentage });
    await newPackage.save();
    res.status(201).json(newPackage); // Successfully created
  } catch (error) {
    console.error('Error creating loyalty package:', error);
    res.status(500).json({ message: 'Error creating loyalty package' });
  }
});

// Update a loyalty package
router.put('/:id', async (req, res) => {
  try {
    const updatedPackage = await LoyaltyDiscount.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json(updatedPackage); // Successfully updated
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ message: 'Error updating package' });
  }
});

// Delete a package
router.delete('/:id', async (req, res) => {
  try {
    const deletedPackage = await LoyaltyDiscount.findByIdAndDelete(req.params.id);

    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ message: 'Error deleting package' });
  }
});

// Check customer's eligibility and claim discount
router.post('/claim', async (req, res) => {
  const { packageId } = req.body;

  // Assuming the user's email is stored in req.user.email (after authentication)
  const email = req.user.email;

  if (!email || !packageId) {
    return res.status(400).json({ message: 'Email and package ID are required' });
  }

  try {
    // Fetch customer's orders for the current month
    const startDate = new Date();
    startDate.setDate(1); // Start of the month

    const customerOrders = await Order.find({
      'shippingAddress.email': email,
      createdAt: { $gte: startDate }, // Only orders from this month
    });

    if (!customerOrders.length) {
      return res.status(400).json({ message: 'No orders found for this customer this month' });
    }

    // Calculate total order amount for the current month
    const totalAmount = customerOrders.reduce((acc, order) => acc + order.total, 0);

    // Fetch the loyalty package and check the condition
    const loyaltyPackage = await LoyaltyDiscount.findById(packageId);

    if (!loyaltyPackage) {
      return res.status(404).json({ message: 'Loyalty package not found' });
    }

    if (totalAmount < loyaltyPackage.conditionAmount) {
      return res.status(400).json({ message: `You need to spend at least ${loyaltyPackage.conditionAmount} to claim this discount` });
    }

    // If all conditions are met, send the email
    const mailOptions = {
      from: 'your-email@gmail.com', // Replace with your email
      to: email, // Send email to the customer's email
      subject: 'Loyalty Discount Claimed!',
      text: `Congratulations! You've claimed the ${loyaltyPackage.discountPercentage}% discount. We will send a gift to your doorstep.`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending confirmation email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ message: `Congratulations! You've claimed the ${loyaltyPackage.discountPercentage}% discount. A confirmation email has been sent to your email.` });
      }
    });
  } catch (error) {
    console.error('Error claiming discount:', error);
    res.status(500).json({ message: 'Error claiming discount' });
  }
});

module.exports = router;
