import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; // named import

import "./AddReview.css";

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState(null); // Fetch username from session
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

  useEffect(() => {
    // Fetch user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      // Decode the JWT token to extract user information
      try {
        const decodedToken = jwtDecode(user.token); // Decode token
        setUsername(decodedToken.id); // Assuming "id" or "username" is part of the token payload
        setIsLoggedIn(true); // Mark the user as logged in
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleRatingChange = (newRating) => {
    console.log("Selected rating:", newRating); // Debugging log
    setRating(newRating);
  };
  

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setError("Please login to submit a review.");
      return;
    }
    if (!review || rating === 0) {
      setError("Please write a review and select a rating before submitting.");
      return;
    }
  
    const user = JSON.parse(localStorage.getItem("user")); // Fetch the token from local storage
    const token = user?.token; // Ensure token is available
  
    if (!token) {
      setError("No authorization token found.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:2001/review/add",
        {
          rating,
          comment: review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the headers
          },
        }
      );
  
      if (response.status === 201) {
        alert("Review submitted successfully!");
        setRating(0);
        setReview("");
        setError("");
      } else {
        setError("Failed to submit review. Please try again.");
      }
    } catch (error) {
      setError(
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred while submitting your review."
      );
      console.error("Error submitting review:", error.response || error.message);
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

export default AddReview;