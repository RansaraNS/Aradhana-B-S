import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./AdminViewReview.css";
import aradhanabooklogo from '../../Images/Aradhana Books & Stationary Logo.png';

export default function AdminViewReview() {
  const [reviews, setReviews] = useState([]);
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [filterRating, setFilterRating] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [ratingSummary, setRatingSummary] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [viewMode, setViewMode] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:2001/review/display")
      .then((response) => {
        const fetchedReviews = response.data;
        if (Array.isArray(fetchedReviews)) {
          setReviews(fetchedReviews);
          calculateOverallRating(fetchedReviews);
          calculateRatingSummary(fetchedReviews);
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="iresha-stars">
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < rating ? "★" : "☆"}</span>
        ))}
      </div>
    );
  };

  const calculateOverallRating = (reviews) => {
    if (reviews.length === 0) {
      setOverallRating(0);
      return;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    setOverallRating(averageRating);
  };

  const calculateRatingSummary = (reviews) => {
    const summary = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      if (summary[review.rating] !== undefined) {
        summary[review.rating] += 1;
      }
    });
    setRatingSummary(summary);
  };

  const handleFilterChange = (e) => {
    setFilterRating(parseInt(e.target.value) || null);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortReviews = (reviews) => {
    switch (sortOption) {
      case "dateAsc":
        return [...reviews].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "dateDesc":
        return [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "ratingAsc":
        return [...reviews].sort((a, b) => a.rating - b.rating);
      case "ratingDesc":
        return [...reviews].sort((a, b) => b.rating - a.rating);
      default:
        return reviews;
    }
  };

  const filteredAndSortedReviews = () => {
    let filtered = viewMode === "featured" ? featuredReviews : reviews;

    if (filterRating) {
      filtered = filtered.filter((review) => review.rating === filterRating);
    }

    return sortReviews(filtered);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredAndSortedReviews().slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(filteredAndSortedReviews().length / reviewsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addImage(aradhanabooklogo, 'PNG', 15, 10, 30, 20);
    doc.setFontSize(18);
    doc.text("Featured Reviews Report", 70, 22);
    doc.setFontSize(12);
    doc.text("Aradhana Books & Stationary", 70, 30);

    if (featuredReviews.length === 0) {
      doc.setFontSize(12);
      doc.text("No featured reviews available.", 15, 50);
    } else {
      doc.autoTable({
        head: [["Customer Name", "Rating", "Comment", "Date"]],
        body: featuredReviews.map((review) => [
          review.username?.name || "Anonymous",
          review.rating,
          review.comment,
          formatDate(review.createdAt),
        ]),
        startY: 40,
        headStyles: {
          fillColor: [32, 132, 52],
          textColor: [255, 255, 255],
          fontSize: 12,
          fontStyle: 'bold',
        },
      });
    }
    doc.save("featured_reviews.pdf");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const markAsFeatured = (review) => {
    setFeaturedReviews((prev) => {
      if (prev.find((r) => r._id === review._id)) {
        return prev.filter((r) => r._id !== review._id); // Unmark
      } else {
        return [...prev, review]; // Mark as Featured
      }
    });
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  return (
    <div className="iresha-reviews-containerAVR">
      <h2 className="iresha-reviews-headingAVR">Admin Review Summary</h2>

      <div className="iresha-reviews-controlsAVR">
        <label>
          Filter by rating:
          <select
            value={filterRating || ""}
            onChange={handleFilterChange}
            className="iresha-dropdown-buttonAVR"
          >
            <option value="">All ratings</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>
        </label>

        <label>
          Sort by:
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="iresha-dropdown-sortAVR"
          >
            <option value="">No Sorting</option>
            <option value="dateAsc">Date (Oldest First)</option>
            <option value="dateDesc">Date (Newest First)</option>
            <option value="ratingAsc">Rating (Lowest First)</option>
            <option value="ratingDesc">Rating (Highest First)</option>
          </select>
        </label>

        <button onClick={generatePDF} className="iresha-export-buttonAVR">
          Export Featured Reviews to PDF
        </button>
      </div>

      <div className="iresha-overall-ratingAVR">
        <h3>Overall Rating:</h3>
        {renderStars(Math.round(overallRating))}
        <span className="iresha-overall-rating-numberAVR">({overallRating.toFixed(1)})</span>
      </div>

      <div className="iresha-summary-reportAVR">
        <h3>Rating Summary:</h3>
        <ul className="iresha-summary-listAVR">
          {Object.keys(ratingSummary).map((rating) => (
            <li key={rating} className={`iresha-summary-itemAVR-${rating}`}>
              {rating} stars: {ratingSummary[rating]} review(s)
            </li>
          ))}
        </ul>
      </div>

      <div className="iresha-view-mode-buttonsAVR">
        <button
          onClick={() => toggleViewMode("all")}
          className={`iresha-buttonAVR ${viewMode === "all" ? "active" : ""}`}
        >
          View All Reviews
        </button>
        <button
          onClick={() => toggleViewMode("featured")}
          className={`iresha-buttonAVR ${viewMode === "featured" ? "active" : ""}`}
        >
          View Featured Reviews
        </button>
      </div>

      <h3>{viewMode === "featured" ? "Featured Reviews:" : "All Reviews:"}</h3>
      <div className="iresha-review-listAVR">
        {currentReviews.length > 0 ? (
          currentReviews.map((review, index) => (
            <div key={index} className="iresha-review-cardAVR">
              <h4 className="iresha-review-usernameAVR">
                {review.username?.name || "Anonymous"}
              </h4>
              {renderStars(review.rating)}
              <p className="iresha-review-commentAVR">{review.comment}</p>
              <p className="iresha-review-dateAVR">{formatDate(review.createdAt)}</p>
              <button
                className="iresha-featured-buttonAVR"
                onClick={() => markAsFeatured(review)}
              >
                {featuredReviews.find((r) => r._id === review._id)
                  ? "Unmark as Featured"
                  : "Mark as Featured"}
              </button>
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>

      <div className="iresha-paginationAVR">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`iresha-page-buttonAVR ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
