const express = require('express');
const router = express.Router();
const Refund = require('../../models/Ishara/refund.model');

const generateRefundId = () => {
  const randomPart = Math.floor(Math.random() * 900000) + 100000; // Generates a random 6-digit number
  return `ADR-${randomPart}`;
};

router.post('/create', async (req, res) => {
    const { orderId, total, reason, deliveryStatus, description } = req.body;
  
    if (!orderId || !total || !reason || !deliveryStatus) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const customRefundId = generateRefundId();  // Generate the refund ID
      const refund = new Refund({ customRefundId, orderId, total, reason, deliveryStatus, description });
      await refund.save();
      res.status(201).json({ message: 'Refund request created successfully', refund });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/', async (req, res) => {
  try {
    const refunds = await Refund.find().populate('orderId', 'customOrderId');
    res.status(200).json(refunds);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



router.patch('/:id', async (req, res) => {
  const { status } = req.body;

  try {
    const refund = await Refund.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!refund) {
      return res.status(404).json({ message: 'Refund not found' });
    }
    res.status(200).json({ message: 'Refund status updated successfully', refund });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
