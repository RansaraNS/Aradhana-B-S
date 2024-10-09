const express = require('express');
const Order = require('../../models/Ishara/order.model'); 
const router = express.Router();

// Route to get sales overview data
router.get('/', async (req, res) => {
  try {
    // Fetch total revenue
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$total" } } }
    ]);

    // Fetch total orders and customers
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments();

    // Fetch recent activities
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('items.item');

    // Send the data as a response
    res.json({
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
      totalOrders,
      totalCustomers,
      recentOrders
    });
  } catch (error) {
    console.error('Error fetching sales overview data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

module.exports = router;
