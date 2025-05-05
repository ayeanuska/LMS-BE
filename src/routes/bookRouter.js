import express from "express";
import {
  adminGetBookDetails,
  createBook,
  deleteBookController,
  pubGetBooks,
  singleBookController,
  updateBookDetails,
} from "../controllers/bookControllers.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createBookValidator,
  updateBookValidator,
} from "../middlewares/joiValidation.js";

const router = express.Router();

//post api/v1/book
router.post("/", authenticate, createBookValidator, createBook);

//home page
router.get("/pub-books", pubGetBooks);

//get api/v1/book/:id
router.get("/:id", singleBookController);

// get api/v1/book  for admin crud page
router.get("/", authenticate, isAdmin, adminGetBookDetails);

//update
router.put(
  "/:id",
  authenticate,
  isAdmin,
  updateBookValidator,
  updateBookDetails
);

//delete
router.delete("/:id", authenticate, isAdmin, deleteBookController);

export default router;
