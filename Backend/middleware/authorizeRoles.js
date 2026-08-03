
const ErrorHandler = require("../utils/errorHandler");

exports.authorizeRoles = (...roles) => {


  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler("Not authenticated", 401));
    }
    // then access should be denied
    if (!roles.includes(req.user.role)) {

      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403, // 403 = Forbidden (user exists but not allowed)
        ),
      );
    }

    // If role matches allowed roles
    // move to next middleware or controller
    next();
  };
};
