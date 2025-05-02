import jwt from "jsonwebtoken";
import { insertToken } from "../models/sessions/sessionModel.js";

export const jwtSign = async (signData) => {
  const token = jwt.sign(signData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  await insertToken({ token });
  return token;
};

export const jwtVerify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log("jwtVerify error", error);
    return null;
  }
};

export const refreshjwtSign = (signData) => {
  return jwt.sign(signData, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
  });
};

export const refreshjwtVerify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    console.log("refreshjwtVerify error", error);
    return null;
  }
};
