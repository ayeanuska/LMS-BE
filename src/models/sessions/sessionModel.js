import SessionSchema from "./sessionSchema.js";

//insert new session
export const createNewSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};

export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};

export const insertToken = async (obj) => {
  return await SessionSchema(obj).save();
};

export const deleteManySessions = (filter) => {
  return SessionSchema.deleteMany(filter);
};

export const findToken = (token) => {
  return SessionSchema.findOne({ token });
};
