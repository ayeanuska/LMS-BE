import bookSchema from "./BookSchema.js";

// create user
export const insertBook = (bookObj) => {
  return bookSchema(bookObj).save();
};
