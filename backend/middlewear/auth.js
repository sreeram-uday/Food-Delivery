import jwt from "jsonwebtoken";

const authmiddleware = async (req, res, next) => {
  // Extract token from 'Authorization' header or directly from 'token' in headers
  let token = req.headers.token;
  console.log(token)

  try {
    // Decode the token
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id; // Add userId to the request body for use in the next middleware
    console.log("UserID in middleware:", req.body.userId); // Debugging line
    // Proceed to the next middleware if token is valid
    next();
  } catch (error) {
    console.log("Invalid Token:", error.message);
    return res.status(403).json({ success: false, message: "Invalid Token. Authentication failed." });
  }
};

export default authmiddleware;
