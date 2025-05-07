import { findToken, getSession } from "../models/sessions/sessionModel.js";
import { getUserByEmaiL } from "../models/users/UserModel.js";
import { jwtVerify, refreshjwtVerify } from "../utils/jwt.js";
import { responseClient } from "./responseClient.js";

export const authenticate = async (req, res, next) => {
  try {
    //1.get the token
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next({
        statusCode: 401,
        message: "Unauthorized: No token provided",
      });
    }

    // 1.1 find the header token from database
    const tokenFromDb = await findToken(token);

    if (!tokenFromDb) {
      return next({
        statusCode: 401,
        message: "Unauthorized: Token not found",
      });
    }

    //2. verify the token

    const decodedData = await jwtVerify(tokenFromDb.token);

    if (decodedData?.email) {
      //3. find the user from decoded data
      const userData = await getUserByEmaiL(decodedData.email);

      //3.2 add user data to request
      if (userData) {
        req.userData = userData;

        //4. go to next process
        next();
      } else {
        // return res.status(401).send(errObj);
        next({
          statusCode: 401,
          message: "Authentication Failed",
        });
      }
    } else {
      next({
        statusCode: 401,
        message: "Invalid token",
      });
    }
  } catch (error) {
    console.log(error);

    next({
      statusCode: 500,
      message: error.message,
    });
  }
};

export const refreshAuthenticate = async (req, res, next) => {
  try {
    //1.get the token
    const token = req.headers.authorization;

    //2. verify the token
    const decodedData = await refreshjwtVerify(token);

    if (decodedData?.email) {
      //3. find the user from decoded data
      const userData = await getUserByEmaiL(decodedData.email);

      //3.2 add user data to request
      if (userData && userData.refreshJWT == token) {
        req.userData = userData;

        //4. go to next process
        next();
      } else {
        // return res.status(401).send(errObj);
        next({
          statusCode: 401,
          message: "Authentication Failed",
        });
      }
    } else {
      next({
        statusCode: 401,
        message: "Invalid token",
      });
    }
  } catch (error) {
    console.log(error);

    next({
      statusCode: 500,
      message: error.message,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  req.userData.role == "admin"
    ? next()
    : next({
        status: 403,
        message: "not authorized,",
      });
};
export const userAuthMiddleware = async (req, res, next) => {
  console.log("req.headers", req.headers);

  const { authorization } = req.headers;
  let message = "Unauthorized";
  //get accesss jwt
  if (authorization) {
    const token = authorization.split(" ")[1];

    // check if acces jwt is valid
    const decoded = await jwtVerify(token);

    if (decoded.email) {
      //session if access tokem exist in session table
      const tokenSession = await getSession({ token });
      if (tokenSession?._id) {
        //get user email
        const { email } = decoded;
        const user = await getUserByEmaiL(email);

        if (user?._id) {
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
};

// //same to authenticate above just a alternative.
// export const userAuthMiddleware = async (req, res, next) => {};
