const express = require('express');
const Order = require('../../models/Ishara/order.model');
const Track = require("../../models/KIshara/Track");

const router = express.Router();

// Generate a unique order ID
const generateCustomOrderId = () => {
  const randomPart = Math.floor(Math.random() * 900000) + 100000; // Generates a random 6-digit number
  return `AD-${randomPart}`;
};

// Save a new order
router.post('/create', async (req, res) => {
  try {
    // Generate unique order ID
    const customOrderId = generateCustomOrderId();
    
    const newOrder = new Order({
      ...req.body,
      customOrderId,  // Include the generated customOrderId
    });
    
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Error saving order' });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.item');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});


// Get sales overview
router.get('/sales-overview', async (req, res) => {
  try {
    // Fetch all orders and populate items with itemName, itemPrice, itemPicture, and oemName (assuming oemName is a part of the Item model)
    const orders = await Order.find()
      .populate('items.item', 'itemName itemPrice itemPicture oemName'); // Populate with necessary fields
    
    // Calculate total revenue
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

    // Calculate total orders
    const totalOrders = orders.length;

    // Group sales by month
    const salesByMonth = orders.reduce((acc, order) => {
      const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
      if (!acc[month]) acc[month] = 0;
      acc[month] += order.total;
      return acc;
    }, {});

    // Convert salesByMonth object to array format for frontend
    const sales = Object.keys(salesByMonth).map((month) => ({
      month,
      totalSales: salesByMonth[month],
    }));

    // Get recent orders (last 10) and populate item details
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('items.item', 'itemName itemPrice itemPicture oemName'); // Populate for recent orders too

    // Respond with the data including total revenue, total orders, sales by month, and recent orders
    res.json({
      totalRevenue,
      totalOrders,
      sales,
      recentOrders,  // recentOrders now contains item name, price, quantity, and oemName as populated fields
    });
  } catch (error) {
    console.error('Error fetching sales overview:', error);
    res.status(500).json({ message: 'Error fetching sales overview' });
  }
});





// Mark order as received
router.patch('/:id/mark-received', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: 'Received' }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error marking order as received:', error);
    res.status(500).json({ message: 'Error marking order as received' });
  }
});


// Request a refund for an order
router.patch('/:id/request-refund', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { refundRequested: true }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error requesting refund:', error);
    res.status(500).json({ message: 'Error requesting refund' });
  }
});








// GET: Fetch all pending orders
router.get("/pending", async (req, res) => {
  try {
    const pendingOrders = await Order.find({ status: "Pending" });
    res.json(pendingOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending orders", error });
  }
});

// GET: Fetch a specific order by ID with item details
router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.item");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Error fetching order" });
  }
});

// Backend: routes/orders.js or similar
router.put("/moveToTrack/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    // Find the order by ID and update its status
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Check if already tracked
    const existingTrack = await Track.findOne({ order: orderId });
    if (existingTrack) {
      console.log(`Order ${orderId} is already being tracked.`);
      return res
        .status(400)
        .json({ message: "Order is already being tracked" });
    }

    // Update the status to 'In Progress'
    order.status = "In Progress";
    // Create tracking record
    const newTrack = new Track({
      order: orderId,
      stages: "In_Progress", // Changed from 'Pending' to 'In_Progress'
    });

    await order.save();

    res
      .status(200)
      .json({
        message: "Order moved to tracking successfully!",
        track: newTrack,
      });
  } catch (error) {
    console.error("Error moving order to tracking:", error);
    res.status(500).json({ message: "Server error moving order to tracking" });
  }
});

// GET: Fetch all "In Progress" orders with item details
router.get("/in-progress", async (req, res) => {
  try {
    const inProgressOrders = await Order.find({ status: "In Progress" })
      .populate("items.item") // Populates the item details
      .populate("shippingAddress"); // If you want to populate nested references

    res.json(inProgressOrders);
  } catch (error) {
    console.error("Error fetching In Progress orders:", error);
    res.status(500).json({ message: "Error fetching In Progress orders", error });
  }
});




// GET: Display all tracking records
router.get("/tracking", async (req, res) => {
  try {
    const trackingRecords = await Track.find().populate("order"); // Populate the order details
    res.json(trackingRecords);
  } catch (error) {
    console.error("Error fetching tracking records:", error);
    res.status(500).json({ message: "Error fetching tracking records" });
  }
});


// PUT route to mark an order as completed
// Route to mark an order as completed




module.exports = router;
