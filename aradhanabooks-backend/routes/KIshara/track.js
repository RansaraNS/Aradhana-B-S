// backend/routes/track.js
const router = require("express").Router();
const Track = require("../../models/KIshara/Track");
const Order = require("../../models/Ishara/order.model");


// Update tracking stages
router.put("/update/:orderId", async (req, res) => {
    const { stages } = req.body; 
    const { orderId } = req.params;

    try {
        const updatedTrack = await Track.findOneAndUpdate(
            { order: orderId }, 
            { stages }, 
            { new: true }
        );

        if (!updatedTrack) {
            return res.status(404).json({ message: "Order not found in tracking" });
        }

        res.json(updatedTrack);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating order stages" });
    }
});

// Delete cancelled orders
router.delete('/delete/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const result = await Track.findOneAndDelete({ order: orderId });

        if (result) {
            res.status(200).send({ status: "Order Deleted" });
        } else {
            res.status(404).send({ status: "Order Not Found" });
        }
    } catch (err) {
        console.error('Error deleting order:', err.message);
        res.status(500).send({ status: "Error with delete order", error: err.message });
    }
});
// Define your route using router
router.get('/:searchTerm', async (req, res) => {
    const { searchTerm } = req.params;
  
    try {
      let order;
      // Check if the search term is a phone number
      if (/^\d+$/.test(searchTerm)) {
        // Search by phone number
        order = await Order.findOne({ 'shippingAddress.phone': searchTerm });
      } else {
        // Otherwise, search by Order ID
        order = await Order.findOne({ customOrderId: searchTerm });
      }
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  });
  


module.exports = router;