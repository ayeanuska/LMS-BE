import BorrowSchema from "./BorrowSchema.js";

// create borrow
export const insertBorrow = (borrowObj) => {
  return BorrowSchema(borrowObj).save();
};

// get all borrow
export const getBorrows = (borrowObj) => {
  return BorrowSchema.find(borrowObj);
};

//get borrow by id
export const getBorrowsByUserId = (userId) => {
  return BorrowSchema.find(userId);
};

//update borrow
export const updateBorrowById = (id, updateObj) => {
  return BorrowSchema.findByIdandUpdate(id, updateObj);
};
