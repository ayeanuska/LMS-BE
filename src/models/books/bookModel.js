import BookSchema from "./BookSchema.js";

// create user
export const insertBook = (bookObj) => {
  return BookSchema(bookObj).save();
};

export const getAllBooks = (filterObj) => {
  return BookSchema.find(filterObj);
};

export const getSingleBook = (_id) => {
  return BookSchema.findById(_id);
};
export const updateBook = (_id, bookObj) => {
  if ("_id" in bookObj) {
    delete bookObj._id;
  }
  return BookSchema.findByIdAndUpdate(_id, bookObj, { new: true });
};

export const deleteBook = (_id) => {
  return BookSchema.findByIdAndDelete(_id);
};
