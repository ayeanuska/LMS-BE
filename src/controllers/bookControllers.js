import {
  deleteBook,
  getAllBooks,
  getSingleBook,
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

export const singleBookController = async (req, res, next) => {
  const id = req.params.id;
  try {
    const singleBook = await getSingleBook(id);

    singleBook?._id
      ? res.json({
          status: "success",
          message: "book fetched successfully",
        })
      : next({
          status: 400,
          messgae: "book cannot be fetched",
        });
  } catch (error) {
    next({
      ststus: 500,
      message: "Error fetching book",
    });
  }
};

export const pubGetBooks = async (req, res, next) => {
  try {
    const books = await getAllBooks({
      status: "active",
    });

    res.json({
      status: "success",
      message: "Books list",
      books,
    });
  } catch (error) {
    console.log(error, "-----");

    next({
      status: 500,
      message: "Error finding book",
    });
  }
};

//update book detail
export const updateBookDetails = async (req, res, next) => {
  try {
    const book = await updateBook(req.params.id, req.body);
    const updatedData = req.body;

    if (!updatedData) {
      throw new Error("No data to update");
    }

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
    // console.log(22222, req.params);
    const id = req.params.id;

    const deletedBook = await deleteBook(id);

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
