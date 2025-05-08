import express from "express";

import { userAuthMiddleware } from "../middlewares/authMiddleware.js";
import { responseClient } from "../middlewares/responseClient.js";
import { sanitizeUser } from "../utils/sanitizerUser.js";

const router = express.Router();
//api/v1/users
router.get("/profile", userAuthMiddleware, async (req, res) => {
  //remove sensitive data from the user object
  const sanitizedUser = sanitizeUser(req.userInfo);

  //alternative way to remove sensitive data.
  //  (user passed to resClient when coverting into json format . the undefined values are removed)
  //const user =req.userInfo
  //   user.password = undefined;
  //   user.__v = undefined;
  //   user.refreshJWT = undefined;

  return responseClient({
    req,
    res,
    message: "user Profile",
    payload: sanitizedUser,
    // payload: user,
  });
});

export default router;
