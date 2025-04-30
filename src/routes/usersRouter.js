import express from "express";
import { responseClient } from "../middlewares/responseClient.js";
import { jwtVerify } from "../utils/jwt.js";
import { getSession } from "../models/sessions/sessionModel.js";
import { getUserByEmaiL } from "../models/users/UserModel.js";

const router = express.Router();

router.get("/profile", async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";
  //get accesss jwt
  if (authorization) {
    const token = authorization.split(" ")[1];

    // check if acces jwt is valid
    const decoded = await jwtVerify(token);
    console.log(decoded);

    if (decoded.email) {
      //session if access tokem exist in session table
      const tokenSession = await getSession({ token });
      if (tokenSession?._id) {
        //get user email
        const { email } = decoded;
        const user = await getUserByEmaiL(email);
        if (user?._id && user.status === "active") {
          // if (user?._id) {
          //return the user
          req.userInfo = user;
          return res.status(200).json({
            status: "sucess",
            message: user,
          });
        }
      }
    }

    message = decoded === "jwt expired" ? decoded : "Unauthorized";
  }
  responseClient({ req, res, message, statusCode: 401 });
});

export default router;
