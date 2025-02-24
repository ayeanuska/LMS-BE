import {
  deleteBook,
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

export const pubGetBooks = async (req, res, next) => {
  try {
    const book = await getAllBooks({
      status: "active",
    });
    res.json({
      status: "success",
      message: "Books list",
      book,
    });
  } catch (error) {
    next({
      status: 500,
      message: "Error creating book",
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
      message: "error updating book",
    });
  }
};

// delete  book
export const deleteBookController = async (req, res, next) => {
  try {
    const _id = req.params._id;

    const deletedBook = await deleteBook(_id);

    deletedBook?._id
      ? res.json({
          status: "success",
          message: "book deleted succesfully",
        })
      : next({
          status: 400,
          messgae: "book cannot be deleted",
        });
  } catch (error) {
    next({
      ststus: 500,
      message: "Error deleting book",
    });
  }
};
