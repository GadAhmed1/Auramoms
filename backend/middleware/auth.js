import jwt from "jsonwebtoken";

export const checkToken = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again!" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.jwt_secret);
    req.body.userId = token_decode.id;
    next();
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err });
  };
};
