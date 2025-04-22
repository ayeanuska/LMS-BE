import { findToken } from "../models/sessions/sessionSchema.js";
import { getUserByEmaiL } from "../models/users/UserModel.js";
import { jwtVerify, refreshjwtVerify } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    console.log(101, req.headers);
    //1.get the token
    const token = req.headers.authorization;

    // 1.1 find the header token from database
    const tokenFromDb = await findToken(token);

    //2. verify the token
    console.log(token);

    const decodedData = await jwtVerify(tokenFromDb.token);

    console.log("DECODED DATA", decodedData);

    if (decodedData?.email) {
      console.log(decodedData);
      //3. find the user from decoded data
      const userData = await getUserByEmaiL(decodedData.email);
      console.log(333, userData);
      //3.2 add user data to request
      if (userData) {
        req.userData = userData;
        console.log(222, req.userData);
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
    console.log(token);
    const decodedData = await refreshjwtVerify(token);
    console.log("DECODED DATA", decodedData);

    if (decodedData?.email) {
      console.log(decodedData);
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
