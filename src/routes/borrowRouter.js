import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { insertBorrow } from "../models/borrowHistory/BorrowModel.js";
import { fetchBorrow } from "../controllers/borrowControllers.js";
import { borrowBookValidator } from "../middlewares/joiValidation.js";

const router = express.Router();

//  create router / borrow book
router.post("/", authenticate, borrowBookValidator, insertBorrow);

//fetch borrow list / borrow history
router.get("/", authenticate, fetchBorrow);

// //update borrow- return book
// router.put("/", authenticate, returnBorrow);

export default router;
