const express = require('express');
const router = require('express').Router();
const Review = require('../../models/Iresha/reviews.js');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

// Middleware to check for JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.customer = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Add a new review
router.post('/add', authenticateToken, async(req, res) => {
    const { rating, comment } = req.body;
 
    if (!rating || !comment) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const newReview = new Review({
        username: req.customer.id,
        rating,
        comment
         
    });

    newReview.save()
        .then(() => res.status(201).json("Review Added"))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all reviews
router.get('/display', (req, res) => {
    Review.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a specific review by ID
router.get('/get/:id', async (req, res) => {
    let reviewId = req.params.id;

    try {
        const review = await Review.findById(reviewId);
        res.status(200).send({ status: "Review Fetched", review });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error fetching review", error: err.message });
    }
});

// Delete a review by ID
router.delete('/delete/:id', (req, res) => {
    let reviewId = req.params.id;

    Review.findByIdAndDelete(reviewId)
        .then(() => res.json("Review Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
