import { updateBook } from "../models/books/BookModel.js";
import {
  getBorrowsByUserId,
  insertBorrow,
  updateBorrowById,
} from "../models/borrowHistory/BorrowModel.js";

export const createBorrow = async (req, res, next) => {
  try {
    const userId = req.userData._id; //from authenticated user session

    const { bookId, title, thumbnail } = req.body;

    // setting due time 30 days
    const BURROWINGDAYS = 30;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + BURROWINGDAYS);

    const borrowObject = {
      userId,
      bookId,
      dueDate,
      title,
      thumbnail,
    };

    const borrowData = await insertBorrow(borrowObject);

    if (borrowData) {
      //borrow succesfully created

      const bookData = await updateBook(bookId, {
        isAvailable: false,
        expectedAvailability: dueDate,
      });
    }

    return res
      .status(201)
      .json({ status: "success", message: "borrow created", data: borrowData });
  } catch (error) {
    next({
      statusCode: 400,
      message: error?.message,
    });
  }
};

export const fetchBorrow = async (req, res, next) => {
  try {
    // 1. get user Id
    const userId = req.userData._id;

    // 2. get borrow history of the particular user
    const borrows = await getBorrowsByUserId(userId);
    console.log("Borrows fouund in db, borrows");

    return res
      .status(200)
      .json({ status: "success", message: "borrow found", borrows });
  } catch (error) {
    console.log(error.message);

    next({
      statusCode: 400,
      message: error?.message,
    });
  }
};

export const returnBorrow = async (req, res, next) => {
  try {
    // 1. get the boorrow id
    const { id } = req.params;

    // 2. update the borrow record
    const borrowUpdate = await updateBorrowById(
      id,
      {
        status: "returned",
        returnDate: new Date(),
      },
      { new: true }
    );
    //  3. update the book record
    console.log("Updated book", borrowUpdate);

    const bookUpdate = await updateBook(borrowUpdate.bookId, {
      isAvailable: true,
    });
    return res.json({
      status: " success",
      message: "Book returned",
    });
  } catch (error) {
    console.log(error.message);
    next({
      statusCodE: 400,
      message: error?.message,
    });
  }
};
