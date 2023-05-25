import Jwt from "jsonwebtoken";
import { WEB_TOKEN_SECRET_KEY } from "../constants/constants.js";
const secret = WEB_TOKEN_SECRET_KEY

export const generateToken = (email) => {
  const payload = { email };
  const options = { expiresIn: "1h" };
  return Jwt.sign(payload, secret, options);
};

export const generaterefreshToken=(email)=>{
  const payload = { email };
  const options = { expiresIn: "7d" };
  return Jwt.sign(payload, secret, options);
}

export const authenticate = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  console.log(token);
  if(!token) {
    return res.status(401).json({ error:"Please SignIn"})
  }

  Jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    console.log(decoded)
    next();
  });
};


export const verifier = (token, secret) => {
  const accessToken = Jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return { message: "Unauthorized" };
    }
    return Jwt.sign({ email: decoded.email }, secret, { expiresIn: '1h' });
  });
  return accessToken;
};
