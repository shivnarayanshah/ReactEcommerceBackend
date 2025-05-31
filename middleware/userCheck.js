import jwt from "jsonwebtoken";

export const userCheck = (req, res, next) => {
  const token = req.headers?.authorization;
  const decode = jwt.decode(token, "secret");
  if (!decode) return res.status(400).json({ message: "Unauthorized access" });
  req.userId = decode.id;
  req.role = decode.role;
  return next();
};

export const adminCheck = (req, res, next) => {
  if (req.role !== "Admin")
    return res.status(401).json({ message: "You are not authorized " });

  return next();
};
