import express from "express";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createReview,
  fetchReview,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// add the call back to reiew controller

router.post("/", authenticate, createReview);

///get all reviews
// return all active reviews only
router.get("/", authenticate, isAdmin, fetchReview);

//update status
router.patch("/", authenticate, isAdmin, updateReview);

export default router;
