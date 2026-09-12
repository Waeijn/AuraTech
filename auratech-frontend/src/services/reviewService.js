import { api } from "../utils/api";
import { API_ENDPOINTS } from "../config/api";

export const reviewService = {
  // Get all reviews for a product (public)
  getByProduct: (productId) =>
    api.get(API_ENDPOINTS.PRODUCT_REVIEWS(productId)),

  // Submit a new review (auth required)
  create: (productId, data) =>
    api.post(API_ENDPOINTS.PRODUCT_REVIEWS(productId), data),

  // Update an existing review (auth required, owner only)
  update: (productId, reviewId, data) =>
    api.put(`${API_ENDPOINTS.PRODUCT_REVIEWS(productId)}/${reviewId}`, data),

  // Delete a review (auth required, owner or admin)
  delete: (productId, reviewId) =>
    api.delete(`${API_ENDPOINTS.PRODUCT_REVIEWS(productId)}/${reviewId}`),
};
