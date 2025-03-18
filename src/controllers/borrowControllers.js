import { updateBook } from "../models/books/BookModel.js";
import {
  getBorrowsByUserId,
  insertBorrow,
  updateBorrowById,
} from "../models/borrowHistory/BorrowModel.js";

export const createBorrow = async (req, res, next) => {
  try {
    const userId = req.userData._id;

    const { bookid, title, thumbnail } = req.body;

    // setting due time 15 days

    const BURROWINGDAYS = 15;
    const today = new Date();
    const dueDate = today.setDate(today.getDate() + BURROWINGDAYS, "day ");

    const borrowObject = {
      userId,
      bookid,
      dueDate,
      title,
      thumbnail,
    };

    const data = await insertBorrow(borrowObject);

    if (data) {
      //borrow succesfully created

      const bookData = await updateBook(bookid, {
        isAvailable: false,
        expectedAvailability: dueDate,
      });
    }

    return res
      .status(201)
      .json({ status: "sucess", message: "borrow created", data });
  } catch (error) {
    console.log(error.message);
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
    console.log(req.userData.fName);

    // 2. get borrow history of the particular user
    const borrows = await getBorrowsByUserId(userId);

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
    const borrowUpdate = await updateBorrowById(id, {
      status: "returned",
    });
    //  3. update th book record
    console.log("Updated book", borrowUpdate);

    const bookUpdate = await updateBook(borrowUpdate._id, {
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
