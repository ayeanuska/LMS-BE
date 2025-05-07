import express from "express";

import { userAuthMiddleware } from "../middlewares/authMiddleware.js";
import { responseClient } from "../middlewares/responseClient.js";
import { sanitizeUser } from "../utils/sanitizerUser.js";

const router = express.Router();
//api/v1/users
router.get("/profile", userAuthMiddleware, async (req, res) => {
  //removes sensitive data from the user object
  const sanitizedUser = sanitizeUser(req.userInfo);
  console.log("After sanitization:", sanitizedUser);

  return responseClient({
    req,
    res,
    message: "user Profile",
    payload: sanitizedUser,
  });
});

export default router;
