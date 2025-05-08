import {
  CreateNewUser,
  getUserByEmaiL,
  updateUser,
} from "../models/users/UserModel.js";
import { compareText, encryptText } from "../utils/bcrypt.js";
import { jwtSign, refreshjwtSign } from "../utils/jwt.js";
import { responseClient } from "../middlewares/responseClient.js";
import { generaterandomOTP } from "../utils/randomGenerator.js";
import { createNewSession } from "../models/sessions/sessionModel.js";
import { passwordResetOTPNotifEmail } from "../services/email/emailService.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userData = await getUserByEmaiL(email);

    if (userData) {
      const loginSuccess = await compareText(password, userData.password);

      const tokenData = {
        email: userData.email,
        _id: userData._id,
      };

      const token = await jwtSign(tokenData);

      const refreshToken = await refreshjwtSign(tokenData);

      // save the refresh token in the UserData
      const data = await updateUser(
        { email: userData.email },
        { refreshJWt: refreshToken }
      );

      if (loginSuccess) {
        userData.password = "";
        userData.refreshJWT = "";

        return res.status(200).json({
          status: "success",
          message: " Login succesfull",
          accessToken: token,
          refreshToken: refreshToken,
          user: userData,
        });
      } else {
        next({
          statusCode: 403,
          message: "User not found",
        });
      }
    } else {
      next({
        statusCode: 404,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    next({
      statusCode: 500,
      message: "login error",
    });
  }
};

export const register = async (req, res, next) => {
  // console.log(req);
  try {
    //   const newUser = new User(req.body);

    const { fName, lName, email, phone } = req.body;
    let { password } = req.body;

    const saltRound = 10;
    password = await encryptText(password);

    const data = await CreateNewUser({
      fName,
      lName,
      email,
      password,
      phone,
    });

    return res.status(201).json({
      status: "success",
      message: "user created",
      data,
    });
  } catch (error) {
    console.log(error.message);

    if (error?.message.includes("E11000")) {
      next({
        statusCode: 400,
        message: "Duplicate userr",
      });
    } else {
      next({
        statusCode: 500,
        message: "Erorr creating user",
      });
    }
  }
};

export const getUserDetail = async (req, res, next) => {
  req.userData.password = "";

  return res.json({
    status: "success",
    message: "User Detail",
    user: req.userData,
  });
};

export const renewJWT = async (req, res, next) => {
  //recreate the access token

  const tokenData = {
    email: req.userData.email,
  };

  const token = await jwtSign(tokenData);

  return res.status(200).json({
    status: "success",
    message: "token refreshed",
    accessToken: token,
  });
};

export const generateOtp = async (req, res, next) => {
  try {
    //get email
    const { email } = req.body;
    console.log(email);

    //get user by email
    const user = typeof email === "string" ? await getUserByEmaiL(email) : null;

    if (user?._id) {
    }
    //generateotp
    const otp = generaterandomOTP();
    console.log(otp);

    //store in session table
    const session = await createNewSession({
      token: otp,
      association: email,
      expires: new Date(Date.now() + 1000 * 60 * 5), // 5mins
    });

    if (session?._id) {
      console.log(session);
      // after storing session token in dp, send otp to user email
      const info = await passwordResetOTPNotifEmail({
        email,
        name: user.fName,
        otp,
      });
      console.log(info);
    }

    // respond client
    responseClient({ req, res, message: "OTP is sent to your email" });
  } catch (error) {
    next(error);
  }
};
