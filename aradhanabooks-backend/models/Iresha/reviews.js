const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,  
    }
});

 
const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
