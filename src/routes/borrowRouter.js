import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { insertBorrow } from "../models/borrowHistory/BorrowModel.js";
import { fetchBorrow, returnBorrow } from "../controllers/borrowControllers.js";

const router = express.Router();

//  create router
router.post("/", authenticate, insertBorrow);

//fetch borrow list
router.get("/", authenticate, fetchBorrow);

//update boorow- return book
router.put("/", authenticate, returnBorrow);

export default router;
