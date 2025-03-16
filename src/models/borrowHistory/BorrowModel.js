import BorrowSchema from "./BorrowSchema.js";

// create borrow
export const createBorrow = (borrowObj) => {
  return BorrowSchema(borrowObj).save();
};

// get all borrow
export const getBorrows = () => {
  return BorrowSchema.find(borrowObj);
};
