const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
      quantity: Number,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  shippingAddress: {
    firstName: String,
    lastName: String,
    address: String,
    district: String,
    city: String,
    phone: String,
    email: String,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isReceived: {
    type: Boolean,
    default: false,
  },
  refundRequested: {
    type: Boolean,
    default: false,
  },
  customOrderId: {
    type: String,
    unique: true,
    required: true,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
