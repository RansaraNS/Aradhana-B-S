import React, { useState } from "react";
import axios from "axios";
import "./AddReview.css";

export default function AddReview() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review || rating === 0) {
      setError("Please write a review and select a rating before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:2001/review/add", {  
        username: "your-username",    
        rating,
        comment: review,
      });

      if (response.status === 201) {
        alert("Review submitted successfully!");
        setRating(0);
        setReview("");
        setError("");
      } else {
        setError("Failed to submit review. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while submitting your review.");
      console.error("Error submitting review:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="iresha-review-containerF">
      <div className="iresha-review-sectionF">  
        <div className="iresha-button-containerF">  
          <button className="iresha-btn-view-allF" onClick={() => window.location.href = '/review/display'}>
            View All Reviews
          </button>
        </div>
        <div className="iresha-text-container"> 
          <h2 className="iresha-review-headingF">Submit Your Review</h2>
          <p className="iresha-review-para-messageF">Share your overall shopping experience with our system!</p>
          <p className="iresha-review-login-messageF">Please login to write a review!</p>
        </div>
        <div className="iresha-rating-containerF">
          <span className="iresha-rating-labelF">Your rating of this product:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`iresha-starF ${
                rating >= star ? "iresha-star-selected" : "iresha-star-unselected"
              }`}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="iresha-review-textareaF"
          placeholder="Write your review"
          value={review}
          onChange={handleReviewChange}
        ></textarea>
        {error && <p className="iresha-error-messageF">{error}</p>}
        <button className="iresha-btn-specialF" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
      <div className="iresha-review-image-sectionF">
         
      </div>
    </div>
  );
}
