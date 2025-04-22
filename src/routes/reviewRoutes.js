import express from "express";
import { authenticate, isAdmin } from "../middlewares/authMiddleware";
import {
  getAllReviews,
  insertReview,
  updateReviewById,
} from "../models/reviews/reviewModel";

const router = express.Router();

// add the call back to reiew controller

router.post("/", authenticate, async (req, res, next) => {
  try {
    const review = await insertReview(req.body);
    //TODO //update the status of borrow record
  } catch (error) {
    next(error);
  }
});

///get all reviews
// return all active reviews only
router.get("/", authenticate, isAdmin, async (req, res, next) => {
  try {
    const reviews = await getAllReviews({});

    return res.json({
      status: "success",
      message: "",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

//update status
router.patch("/", authenticate, isAdmin, async (req, res, next) => {
  try {
    const { _id, status } = req.body;
    const review = await updateReviewById(_id, { status });
    review?._id
      ? res.json({
          status: "success",
          message: "The rwview has been updated succesfully",
        })
      : res.json({
          status: "error",
          message: "Unable to update the review, try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
