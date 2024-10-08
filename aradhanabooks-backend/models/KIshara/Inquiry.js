const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  inquiryType: {
    type: String,
    enum: [
      "Order Status",
      "Shipping Delay",
      "Payment Issue",
      "Product Issue",
      "Others",
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
