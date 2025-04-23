import express from "express";
import { responseClient } from "../middlewares/responseClient.js";
import { jwtVerify } from "../utils/jwt.js";
import { getSession } from "../models/sessions/sessionModal.js";
import { getUserByEmaiL } from "../models/users/UserModel.js";

const router = express.Router();

router.get("/profile", async (req, res) => {
  const { authorization } = req.headers;

  //get accesss jwt
  if (authorization) {
    const token = authorization.split(" ")[1];

    // check if acces jwt isvalid
    const decoded = jwtVerify(token);
    console.log(decoded);

    if (decoded.email) {
      //session if access tokem exist in session table
      const tokenSession = await getSession({ token });
      if (tokenSession?._id) {
        //get user email
        const { email } = decoded;
        const user = await getUserByEmaiL(email);
        if (user?._id && user.status === "active") {
          return responseClient({
            req,
            res,
            message: "User Profile",
            payload: "user",
          });
        }

        //return the user

        return res.json({ message: "TODO" });
      }
    }
  }
  responseClient({ req, res, message: "Unauthorized", statusCode: 401 });
});

export default router;
