import httpStatus from "http-status";
import JWT from "jsonwebtoken";
import User from "../models/user.js";

export const authenticateUser = async (req, res, next) => {
  // 1. Check if the authorization header exists and starts with "Bearer"
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Authentication failed. Token is required.",
    });
  }

  // 2. Extract the token from the Authorization header
  const token = req.headers.authorization.split(" ")[1];

  try {
    // 3. Verify the token and decode it
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    
    // 4. Use the ID from the decoded token to find the user
    const user = await User.findById(decoded.id);
    
    // 5. Check if the user exists
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Authentication failed. User not found.",
      });
    }

    // 6. Attach the user details to the request
    req.user = user;

    // 7. Call next() to proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);

    // 8. If there is an error in token verification
    return res.status(httpStatus.FORBIDDEN).json({
      status: "error",
      message: "Authentication failed. Invalid or expired token.",
    });
  }
};
