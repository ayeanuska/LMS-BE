import Joi from "joi";
//server side validation: technique to validate data (from client)before it is sent to the server
//verify the datta type, check if any maliciaous data is sent to the server

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

// update book validator
export const updateBookValidator = (req, res, next) => {
  const updateBookSchema = Joi.object({
    title: Joi.string().required(),
    status: Joi.string().required(),
    author: Joi.string().required(),
    thumbnail: Joi.string().required(),
    genre: Joi.string().required(),
    description: Joi.string().required(),
    publishedYear: Joi.number().required(),
    isAvailable: Joi.boolean(),
    expectedAvailable: Joi.string().allow("", null),
    averageRating: Joi.number(),
  });
  joiValidator(updateBookSchema, req, res, next);
};

//book validator
export const borrowBookValidator = (req, res, next) => {
  const borrowBookSchema = Joi.object({
    bookId: Joi.string().required(),
    title: Joi.string().required().label("Title"),
    thumbnail: Joi.string().uri().required(),
  });
  joiValidator(borrowBookSchema, req, res, next);
};
