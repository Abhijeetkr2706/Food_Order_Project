const jwt = require("jsonwebtoken");


const sendToken = (user, statusCode, res) => {

  const token = user.getJWTToken();
  const cookieOptions = {

    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),

    // httpOnly means the cookie cannot be accessed by JavaScript in the browser
    // This helps protect the token from XSS attacks
    httpOnly: true,
  };

  // Send the JWT token as a cookie to the client
  res.cookie("jwt", token, cookieOptions);

  // Remove password from the user object before sending response
  // This ensures the password is never exposed in API responses
  user.password = undefined;

  // Send response to client with success status and token
  res.status(statusCode).json({
    success: true,
    token,
    data: { user },
  });
};

// Export this function so it can be used in authentication controllers
module.exports = sendToken;
