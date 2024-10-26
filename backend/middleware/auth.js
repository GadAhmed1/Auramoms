import jwt from "jsonwebtoken";

// This line imports the jwt module from the jsonwebtoken library. 
// The jwt module is used to create and verify JSON Web Tokens (JWTs).

export const checkToken = async (req, res, next) => {
  // This line defines an asynchronous middleware function called authMiddleware.
  // This function will be used to authenticate requests by verifying the JWT.

  const { token } = req.headers;
  // This line extracts the token from the request headers. 
  // The token is usually sent in the Authorization header.

  if (!token) {
    // This condition checks if the token is present.
    // If no token is found, an error response is sent indicating that the user is not authorized.

    return res.json({ success: false, message: "Not Authorized Login Again!" });
  }

  try {
    // This line starts a try...catch block.
    // The code inside the try block will be executed, and if any errors occur, the catch block will be executed.

    const token_decode = jwt.verify(token, process.env.jwt_secret);
    // This line verifies the token using the secret key stored in the environment variable jwt_secret.
    // If the token is valid, the decoded payload is stored in the token_decode variable.

    req.body.userId = token_decode.id;
    // This line adds a new property called userId to the request body.
    // The value of this property is the id extracted from the decoded token.
    // This allows subsequent middleware or route handlers to access the user's ID.

    next();
    // This line calls the next() function to pass control to the next middleware in the chain.
  } catch (err) {
    // This block is executed if an error occurs during token verification.
    // The error is logged to the console and an error response is sent to the client.

    console.log(err);
    res.json({ success: false, message: err });
  };
};

