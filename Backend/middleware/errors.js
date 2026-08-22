
const ErrorHandler = require("../utils/errorHandler");


module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {

    res.status(err.statusCode).json({
      success: false,

  
      error: err,

      errMessage: err.message,


      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {

    let error = { ...err };
    error.message = err.message;
    if (err.name == "castError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose Validation Error
    // Example: required fields missing or incorrect data format
    if (err.name === "ValidationError") {

      // Collect all validation messages
      const message = Object.values(err.errors).map((value) => value.message);

      error = new ErrorHandler(message, 400);
    }

    // Example: user tries to register with an email that already exists
    if (err.code === 11000) {

      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;

      error = new ErrorHandler(message, 400);
    }

    // Handling Invalid JWT Token
    // This happens if someone sends a wrong or corrupted token
    if (err.name === "JsonWebTokenError") {

      const message = "JSON Web Token is invalid. Try Again!!!";

      error = new ErrorHandler(message, 400);
    }

    // Handling Expired JWT Token
    // This happens when the token has passed its expiration time
    if (err.name === "TokenExpiredError") {

      const message = "JSON Web Token is expired. Try Again!!!";

      error = new ErrorHandler(message, 400);
    }

    // Send final response to client
    res.status(error.statusCode).json({
      success: false,

      // Send safe error message
      message: error.message || "Internal Server Error",
    });
  }
};
