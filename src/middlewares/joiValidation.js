import Joi from "joi";

export const loginValidator = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string(),
  });

  const { error } = loginSchema.validate(req.body);
  console.log(123, error);
  error
    ? next({
        status: "error",
        message: error.message,
      })
    : next();
};
