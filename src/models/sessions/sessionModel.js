import SessionSchema from "./sessionSchema.js";

//insert new session
export const createNewSchema = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};

export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};

export const insertToken = (obj) => {
  return SessionSchema(obj).save();
};

export const findToken = (token) => {
  return SessionSchema.findOne({ token });
};
