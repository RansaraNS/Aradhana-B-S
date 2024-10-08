const router = require('express').Router();
const Review = require('../../models/Iresha/reviews.js');

// Add a new review
router.post('/add', (req, res) => {
    const { username, rating, comment } = req.body;
 
    if (!username || !rating || !comment) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const newReview = new Review({
        username,
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
