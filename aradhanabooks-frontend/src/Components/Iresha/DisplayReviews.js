import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayReviews.css";
import reviewsDisBack from '../../Images/reviewbackg.jpg'; 

export default function DisplayReviews() {
  const [reviews, setReviews] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [filterRating, setFilterRating] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);  

  useEffect(() => {
    axios
      .get("http://localhost:2001/review/display")
      .then((response) => {
        console.log("Fetched Reviews: ", response.data);
        setReviews(response.data);
        calculateOverallRating(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  const calculateOverallRating = (reviews) => {
    if (reviews.length === 0) {
      setOverallRating(0);
      return;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    setOverallRating(averageRating);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterRating(value ? parseInt(value) : null); 
    setCurrentIndex(0);
  };

  const filteredReviews = () => {
    if (filterRating) {
      return reviews.filter((review) => review.rating === filterRating);
    }
    return reviews;
  };

  const renderStars = (rating) => {
    return (
      <span>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`iresha-star ${
              rating >= star ? "iresha-star-selectedD" : "iresha-star-unselectedD"
            }`}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const nextReviews = () => {
    const totalReviews = filteredReviews().length;
    if (currentIndex + 3 < totalReviews) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const prevReviews = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  const displayedReviews = filteredReviews().slice(currentIndex, currentIndex + 3);  

  return (
    <div className="iresha-reviews-containerD">
      
      <img src={reviewsDisBack} alt="Reviews Background" className="iresha-reviews-image" />
      
      <h2 className="iresha-reviews-headingD">View All Customer Reviews</h2>
      <div className="iresha-reviews-controlsD">
        <label className="iresha-reviews-labelD">
        Filter reviews based on star number  : 
        </label>
        <br />
        <select value={filterRating || ""} onChange={handleFilterChange} className="iresha-dropdown-buttonD">
          <option value="">All ratings</option>
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
        </select>
      </div>
      
      <div className="iresha-overall-ratingD">
        <h3 className="iresha-overall-rating-titleD">Overall Rating:</h3>
        {renderStars(Math.round(overallRating))}
        <span className="iresha-overall-rating-numberD">({overallRating.toFixed(1)})</span>
      </div>
  
  
      <div className="iresha-review-listD">
        <button className="iresha-arrow left-arrowD" onClick={prevReviews} disabled={currentIndex === 0}>
          &#8249; 
        </button>
        <div className="iresha-review-cardsD">
          {displayedReviews.length > 0 ? (
            displayedReviews.map((review, index) => (
              <div key={index} className="iresha-review-cardD">
                <h4 className="iresha-review-usernameD">{review.username}</h4>
                {renderStars(review.rating)}
                <p className="iresha-review-commentD">{review.comment}</p>
                <p className="iresha-review-dateD">{formatDate(review.createdAt)}</p>
              </div>
            ))
          ) : (
            <p>No reviews found for this rating.</p>  
          )}
        </div>
        <button className="iresha-arrow right-arrowD" onClick={nextReviews} disabled={currentIndex + 3 >= filteredReviews().length}>
          &#8250; 
        </button>
      </div>
    </div>
  );
}  