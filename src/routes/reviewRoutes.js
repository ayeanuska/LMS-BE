import express from "express";
import { authenticate, isAdmin } from "../middlewares/authMiddleware";
import {
  getAllReviews,
  insertReview,
  updateReviewById,
} from "../models/reviews/ReviewModel";
import {
  createReview,
  fetchReview,
  updateReview,
} from "../controllers/reviewController";

const router = express.Router();

// add the call back to reiew controller

router.post("/", authenticate, createReview);

///get all reviews
// return all active reviews only
router.get("/", authenticate, isAdmin, fetchReview);

//update status
router.patch("/", authenticate, isAdmin, updateReview);

export default router;
