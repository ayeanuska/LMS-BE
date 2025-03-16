import { VscDebugBreakpointDataUnverified } from "react-icons/vsc";
import { updateBook } from "../models/books/BookModel";

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
