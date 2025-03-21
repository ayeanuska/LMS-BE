import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/joiValidation.js";

import {
  getUserDetail,
  login,
  register,
  renewJWT,
} from "../controllers/authControllers.js";
import {
  authenticate,
  isAdmin,
  refreshAuthenticate,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

//login api
router.post("/login", loginValidator, login);

//register api
router.post("/register", registerValidator, register);

// get
// router.get("/", authenticate, getUserDetail);

//reenew jwt
router.get("/renew-jwt", refreshAuthenticate, renewJWT);

export default router;
