import jwt from "jsonwebtoken";
import { findUserByIdHelper } from "../helpers/user.helper.js";
import mongoose from "mongoose";

const generateJWTToken = (data) => {
  return jwt.sign({ data }, process.env.JWTSECRET, { expiresIn: "24h" });
};

const decodeJWTToken = (token) => {
  return jwt.verify(token, process.env.JWTSECRET);
};

const userAuthMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].replace("Bearer ", "")
    : undefined;
  if (!token) {
    return res.status(400).send({ message: "Token is Needed!" });
  }

  const decode = decodeJWTToken(token);
  const id = new mongoose.Schema.ObjectId(decode && decode.data && decode.data._id ? decode.data._id : "");

  const User = await findUserByIdHelper(id.path);
  if (!User || !User.token) {
    return res.status(401).send({ message: "Authentication Failed!" });
  }
  console.log("Auth Success!");
  req['user'] = User;
  next();
};

export { generateJWTToken, userAuthMiddleware };
