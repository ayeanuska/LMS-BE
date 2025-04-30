export const responseClient = ({ req, res, message, statusCode = 200 }) => {
  //success response

  req.sucess = () => {
    return res.status(statusCode).json({
      status: "success",
      message,
    });
  };

  //error message
  req.error = () => {
    return res.status(statusCode).json({
      status: "error",
      message,
    });
  };

  if (statusCode >= 200 && statusCode < 300) {
    req.success();
  } else {
    return req.error();
  }
};
