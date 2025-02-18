import { insertBook } from "../models/books/BookModel.js";

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
