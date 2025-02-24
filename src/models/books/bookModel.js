import bookSchema from "./BookSchema.js";

// create user
export const insertBook = (bookObj) => {
  return bookSchema(bookObj).save();
};

export const getAllBooks = (filterObj) => {
  return bookSchema.find(filterObj);
};

export const updateBook = (_id, ...bookObj) => {
  return bookSchema.findByIdAndUpdate(_id, bookObj);
};
