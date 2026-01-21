const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  const message =
    status === 500
      ? "Internal Server Error"
      : err.message || "Something went wrong";

  res.status(status).json({
    success: false,
    status,
    message,
  });
};

export default errorHandler;
