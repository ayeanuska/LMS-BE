import jwt from "jsonwebtoken";
import { insertToken } from "../models/sessions/sessionModel.js";

export const jwtSign = (signData) => {
  const token = jwt.sign(signData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  insertToken({ token });
  return token;
};

export const jwtVerify = (token) => {
  console.log(10000, token);
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const refreshjwtSign = (signData) => {
  return jwt.sign(signData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

export const refreshjwtVerify = (token) => {
  console.log(10000, token);
  return jwt.verify(token, process.env.JWT_SECRET);
};
