class ErrorHandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}
export const errorMiddleware = (err, req, res, next) => {
  //in error middleware err field is extra as compared to normal middleware
  err.message = err.message || "Internal Server error";
  err.statuscode = err.statuscode || 500;

  if (err.name === "CaseError") {
    //e.g., Mongoose path errors
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    //MongoDB duplicate key error -eg.email already exist the error while signup
    const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try Again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired`;
    err = new ErrorHandler(message, 400);
  }

  return res.status(err.statuscode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
