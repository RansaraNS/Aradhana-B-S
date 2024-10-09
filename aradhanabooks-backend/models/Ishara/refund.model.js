const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
    customRefundId: { type: String, unique: true, required: true }, // Add customRefundId field
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    total: { type: Number, required: true },
    reason: { type: String, required: true },
    deliveryStatus: { type: String, required: true },
    description: { type: String }, // Optional field
    refundDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' },
});

const Refund = mongoose.model('Refund', refundSchema);
module.exports = Refund;
