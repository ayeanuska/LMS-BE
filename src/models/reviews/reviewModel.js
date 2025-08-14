import ReviewSchema from "./ReviewSchema.js";

//insert
export const insertReview = (obj) => {
  return ReviewSchema(obj).save();
};

// read all review ( only admin)
export const getAllReviews = (filter) => {
  return ReviewSchema.find(filter);
};

// get all reviews by Id
export const getReviewsbyId = (_id) => {
  return ReviewSchema.findById(_id);
};

// update review by Id
export const updateReviewById = (_id, obj) => {
  return ReviewSchema.findByIdAndUpdate(_id, obj);
};

//delete review by Id
export const deleteReviewbyId = (_id) => {
  return ReviewSchema.findByIdAndDelete(_id);
};
