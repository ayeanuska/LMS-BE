import {
  getAllBooks,
  insertBook,
  updateBook,
} from "../models/books/BookModel.js";

export const createBook = async (req, res, next) => {
  try {
    // create the vbook

    const book = await insertBook(req.body);

    book?._id
      ? res.json({
          status: "success",
          message: "book succcesfully created",
          book,
        })
      : next({
          status: 401,
          message: "book cannot be created ",
        });
  } catch (error) {
    console.log(error);
    next({
      statusCode: 500,
      message: "Error creating book ",
    });
  }
};

//get book detail
export const adminGetBookDetails = async (req, res, next) => {
  try {
    const books = await getAllBooks();

    res.json({
      status: "success",
      message: " fetched Book Details ",
      books,
    });
  } catch (error) {
    console.log(error);
    next({
      status: 500,
      message: "book cannot be fetched ",
    });
  }
};

//update book detail
export const updateBookDetails = async (req, res, next) => {
  try {
    const book = await updateBook();
    book?._id
      ? res.json({
          status: "success",
          message: " updated Book Details ",
        })
      : next({
          status: 401,
          message: "book cannot be uppppdated  ",
        });
  } catch (error) {
    console.log(error);
    next({
      status: 500,
      message: "book cannot be updated",
    });
  }
};
