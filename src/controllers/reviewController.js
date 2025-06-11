import {
  getAllReviews,
  insertReview,
  updateReviewById,
} from "../models/reviews/ReviewModel.js";

export const createReview = async (req, res, next) => {
  try {
    //createe review
    const review = await insertReview(req.body);

    review?._id
      ? res.json({
          status: "success",
          message: "review successfully added",
          review,
        })
      : next({
          status: 401,
          message: "review cannot be added",
        });

    //uppdate the status of borrow record
  } catch (error) {
    console.log(error);
    next({
      status: 401,
      message: "error adding reviews",
    });
  }
};

export const fetchReview = async (req, res, next) => {
  try {
    const reviews = await getAllReviews();

    return res.json({
      status: "success",
      message: "",
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
export const updateReview = async (req, res, next) => {
  try {
    const { _id, status } = req.body;
    const review = await updateReviewById(_id, { status });

    review?._id
      ? res.json({
          status: "success",
          message: "The review has been updated successfully",
          review,
        })
      : res.json({
          status: "error",
          message: "Unable to update the review, try again later",
        });
  } catch (error) {
    next(error);
  }
};
