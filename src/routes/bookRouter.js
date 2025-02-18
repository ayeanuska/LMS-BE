import express from "express";
import { createBook } from "../controllers/bookControllers.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";
import { createBookValidator } from "../middlewares/joiValidation.js";

const router = express.Router();

//post api/v1/book
router.post("/", authenticate, createBookValidator, createBook);

// //get api/v1/book
// router.get("/", authenticate, getBookDetails);

export default router;
