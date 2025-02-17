import UserSchema from "./UserSchema.js";

// create user

export const CreateNewUser = (userObj) => {
  return UserSchema(userObj).save();
};

//read user
//get user by email address
export const getUserByEmaiL = (email) => {
  return UserSchema.findOne({ email });
};

//update user
export const updateUser = (filter, UpdatedUserObeject) => {
  return UserSchema.findOneAndUpdate({ filter, UpdatedUserObeject });
};

// delete User

export const deleteUserById = (_id) => {
  return UserSchema.findAndDelete(_id);
};
