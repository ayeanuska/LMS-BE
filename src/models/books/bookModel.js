import bookSchema from "./bookSchema.js";

// create user
export const insertBook = (bookObj) => {
  return bookSchema(bookObj).save();
};
