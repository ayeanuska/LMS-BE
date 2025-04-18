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

//register validator
export const registerValidator = (req, res, next) => {
  const registerSchema = Joi.object({
    lName: Joi.string(),
    fName: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string(),
    confirmPassword: Joi.string(),
  });
  joiValidator(registerSchema, req, res, next);
};

// create book validator
export const createBookValidator = (req, res, next) => {
  const createBookSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    author: Joi.string().required(),
    thumbnail: Joi.string().required(),
    isbn: Joi.string().required(),
    genre: Joi.string().required(),
    publishedYear: Joi.string(),
  });
  joiValidator(createBookSchema, req, res, next);
};

// create book validator
export const updateBookValidator = (req, res, next) => {
  const updateBookSchema = Joi.object({
    title: Joi.string().required(),
    _id: Joi.string().required(),
    status: Joi.string().required(),
    author: Joi.string().required(),
    thumbnail: Joi.string().required(),
    isbn: Joi.string().required(),
    genre: Joi.string().required(),
    description: Joi.string().required(),
    publishedYear: Joi.number().required(),
    isAvailable: Joi.boolean().required(),
    expectedAvailable: Joi.string().allow("", null),
  });
  joiValidator(updateBookSchema, req, res, next);
};
