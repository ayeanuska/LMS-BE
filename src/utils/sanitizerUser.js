export const sanitizeUser = (user) => {
  // This function removes sensitive data from the user object
  const u = user.toObject?.() || user;
  const { password, __v, refreshJWT, ...sanitized } = u;
  return sanitized;
};
