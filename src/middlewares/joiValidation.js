import Joi from "joi";

const joiValidator = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  error
    ? next({
        status: "error",
        message: error.message,
      })
    : next();
};

export const loginValidator = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string(),
  });

  joiValidator(loginSchema, req, res, next);
};

export const registerValidator = (req, res, next) => {
  const registerSchema = Joi.object({
    lName: Joi.string(),
    fName: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string(),
  });
  joiValidator(registerSchema, req, res, next);
};
