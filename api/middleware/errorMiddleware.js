const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; // 500 - Internal Server Error

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandlerMiddleware;
