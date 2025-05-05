import bookSchema from "./BookSchema.js";

// create user
export const insertBook = (bookObj) => {
  return bookSchema(bookObj).save();
};

export const getAllBooks = (filterObj) => {
  return bookSchema.find(filterObj);
};

export const getSingleBook = (_id) => {
  return bookSchema.findById(_id);
};
export const updateBook = (_id, bookObj) => {
  if ("_id" in bookObj) {
    delete bookObj._Id;
  }
  return bookSchema.findByIdAndUpdate(_id, bookObj, { new: true });
};

export const deleteBook = (_id) => {
  return bookSchema.findByIdAndDelete(_id);
};
