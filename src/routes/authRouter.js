import express from "express";
import {
  loginValidator,
  registerValidator,
  resetUserValidator,
} from "../middlewares/joiValidation.js";

import {
  generateOtp,
  getUserDetail,
  login,
  register,
  renewJWT,
  resetNewPassword,
} from "../controllers/authControllers.js";
import {
  authenticate,
  refreshAuthenticate,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

//login api
router.post("/login", loginValidator, login);

//register api
router.post("/register", registerValidator, register);

// get
router.get("/", authenticate, getUserDetail);

//renew jwt
router.get("/renew-jwt", refreshAuthenticate, renewJWT);

//requestotp
router.post("/otp", generateOtp);

//reset password
router.post("/reset-password", resetUserValidator, resetNewPassword);

export default router;
