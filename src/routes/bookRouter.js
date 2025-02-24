import express from "express";
import {
  adminGetBookDetails,
  createBook,
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

// get api/v1/book  for admin
router.get("/", authenticate, isAdmin, adminGetBookDetails);

//update
router.put("/", authenticate, isAdmin, updateBookValidator, updateBookDetails);

// //delete
// router.delete("/:id", authenticate, deleteBook);

export default router;
