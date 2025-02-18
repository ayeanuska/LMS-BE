export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userData = await getUserByEmaiL(email);

    if (userData) {
      const loginSuccess = await compareText(password, userData.password);

      const tokenData = {
        email: userData.email,
      };

      const token = await jwtSign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      if (loginSuccess) {
        return res.status(200).json({
          status: "success",
          message: " Login succesfull",
          accessToken: token,
          user: {
            _id: userData._id,
            username: userData.username,
          },
        });
      } else {
        next({
          statusCode: 403,
          message: "User not found",
        });
      }
    } else {
      next({
        statusCode: 404,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    next({
      statusCode: 500,
      message: "login error",
    });
  }
};

export const register = async (req, res, next) => {
  try {
    //   const newUser = new User(req.body);

    const { fName, lName, email, phone } = req.body;
    let { password } = req.body;

    const saltRound = 10;
    password = await encryptText(password);

    const data = await CreateNewUser({
      fName,
      lName,
      email,
      password,
      phone,
    });

    return res.status(201).json({
      status: "success",
      message: "user created",
      data,
    });
  } catch (error) {
    console.log(error.message);

    if (error?.message.includes("E11000")) {
      next({
        statusCode: 400,
        message: "Duplicate userr",
      });
    } else {
      next({
        statusCode: 500,
        message: "Erorr creating user",
      });
    }
  }
};
