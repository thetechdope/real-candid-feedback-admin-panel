import CustomError from "./CustomError.js";

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
    });
  }
  return res.status(400).send(error.message);
};

export default errorHandler;
