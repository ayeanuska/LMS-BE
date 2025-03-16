import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { createBorrow } from "../models/borrowHistory/BorrowModel.js";

const router = express.Router();

//  create router
router.post("/", authenticate, createBorrow);

export default router;
