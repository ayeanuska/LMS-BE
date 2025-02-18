import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/joiValidation.js";

import { login, register } from "../controllers/authControllers.js";

const router = express.Router();

//login api
router.post("/login", loginValidator, login);

//register api
router.post("/register", registerValidator, register);

export default router;
