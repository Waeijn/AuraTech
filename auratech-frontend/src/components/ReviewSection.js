import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { reviewService } from "../services/reviewService";
import { useAuth } from "./Navbar";

/**
 * Complete review section for a product details page.
 * Shows existing reviews and a form to submit a new one.
 */
export default function ReviewSection({ productId }) {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({ average_rating: 0, review_count: 0 });
  const [loading, setLoading] = useState(true);

  // Form state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  // Check if current user already reviewed
  const userReview = currentUser
    ? reviews.find((r) => r.user?.id === currentUser.id)
    : null;

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewService.getByProduct(productId);
      setReviews(response.data || []);
      setMeta(response.meta || { average_rating: 0, review_count: 0 });
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setFormMessage({ type: "error", text: "Please select a star rating." });
      return;
    }

    try {
      setSubmitting(true);
      setFormMessage({ type: "", text: "" });

      await reviewService.create(productId, { rating, comment });

      setFormMessage({
        type: "success",
        text: "Review submitted successfully!",
      });
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (error) {
      setFormMessage({
        type: "error",
        text: error.message || "Failed to submit review.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditRating(userReview.rating);
    setEditComment(userReview.comment || "");
  };

  const handleUpdate = async () => {
    if (editRating === 0) return;

    try {
      setSubmitting(true);
      await reviewService.update(productId, userReview.id, {
        rating: editRating,
        comment: editComment,
      });
      setIsEditing(false);
      setFormMessage({ type: "success", text: "Review updated!" });
      fetchReviews();
    } catch (error) {
      setFormMessage({
        type: "error",
        text: error.message || "Failed to update review.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await reviewService.delete(productId, reviewId);
      setFormMessage({ type: "success", text: "Review deleted." });
      fetchReviews();
    } catch (error) {
      setFormMessage({
        type: "error",
        text: error.message || "Failed to delete review.",
      });
    }
  };

  return (
    <div
      style={{
        marginTop: "40px",
        padding: "30px",
        borderTop: "1px solid #eee",
      }}
    >
      {/* Header */}
      <h3 style={{ fontSize: "22px", marginBottom: "5px" }}>
        Customer Reviews
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "25px",
        }}
      >
        <StarRating rating={Math.round(meta.average_rating)} size={22} />
        <span style={{ color: "#666", fontSize: "14px" }}>
          {meta.average_rating > 0
            ? `${meta.average_rating} out of 5`
            : "No ratings yet"}{" "}
          ({meta.review_count} {meta.review_count === 1 ? "review" : "reviews"})
        </span>
      </div>

      {/* Form Message */}
      {formMessage.text && (
        <div
          style={{
            padding: "10px 15px",
            marginBottom: "15px",
            borderRadius: "8px",
            backgroundColor:
              formMessage.type === "success" ? "#d1fae5" : "#fee2e2",
            color: formMessage.type === "success" ? "#065f46" : "#991b1b",
            fontSize: "14px",
          }}
        >
          {formMessage.text}
        </div>
      )}

      {/* Review Form - only show if logged in and haven't reviewed yet */}
      {currentUser && !userReview && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "30px",
            padding: "20px",
            backgroundColor: "#f9fafb",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h4 style={{ marginBottom: "12px", fontSize: "16px" }}>
            Write a Review
          </h4>

          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Your Rating
            </label>
            <StarRating
              rating={rating}
              onRate={setRating}
              size={28}
              interactive
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Your Comment (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              maxLength={1000}
              rows={4}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting || rating === 0}
            className="btn-main"
            style={{
              padding: "10px 24px",
              fontSize: "14px",
              opacity: submitting || rating === 0 ? 0.6 : 1,
            }}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {/* Prompt to log in */}
      {!currentUser && (
        <p
          style={{
            marginBottom: "25px",
            color: "#666",
            fontSize: "14px",
            fontStyle: "italic",
          }}
        >
          Please log in to leave a review.
        </p>
      )}

      {/* Review List */}
      {loading ? (
        <p style={{ color: "#999" }}>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p style={{ color: "#999", fontStyle: "italic" }}>
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                padding: "16px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <div>
                  <strong style={{ fontSize: "15px" }}>
                    {review.user?.name || "Anonymous"}
                  </strong>
                  <div style={{ marginTop: "4px" }}>
                    <StarRating rating={review.rating} size={16} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#999", fontSize: "12px" }}>
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                  {/* Show edit/delete for the review owner */}
                  {currentUser && review.user?.id === currentUser.id && (
                    <>
                      {isEditing ? (
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button
                            onClick={handleUpdate}
                            disabled={submitting}
                            style={{
                              padding: "4px 10px",
                              fontSize: "12px",
                              background: "#10b981",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            style={{
                              padding: "4px 10px",
                              fontSize: "12px",
                              background: "#6b7280",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={handleEdit}
                            style={{
                              padding: "4px 10px",
                              fontSize: "12px",
                              background: "#3b82f6",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(review.id)}
                            style={{
                              padding: "4px 10px",
                              fontSize: "12px",
                              background: "#ef4444",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Editable content or display */}
              {isEditing && currentUser && review.user?.id === currentUser.id ? (
                <div>
                  <div style={{ marginBottom: "8px" }}>
                    <StarRating
                      rating={editRating}
                      onRate={setEditRating}
                      size={22}
                      interactive
                    />
                  </div>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    maxLength={1000}
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "14px",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ) : (
                review.comment && (
                  <p
                    style={{
                      color: "#374151",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      margin: 0,
                    }}
                  >
                    {review.comment}
                  </p>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
