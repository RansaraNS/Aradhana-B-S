// backend/models/Track.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        unique: true, 
    },
    stages: {
        type: String,
        enum: ['Pending', 'In_Progress', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, // Automatically manages createdAt and updatedAt
});

const Track = mongoose.model('Track', trackSchema);
module.exports = Track;
