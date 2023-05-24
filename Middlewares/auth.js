import Jwt from "jsonwebtoken";
const secret = "e9ee56966394b83fe6bdcafe3e15292174375b1175d4abe42442f46e641c19e0d4f42a63096abb6f6884f501d4c98aa7fb6862987bfa80a0394c6065fbf1c126"

export const generateToken = (email) => {
  const payload = { email };
  const options = { expiresIn: "1h" };
  return Jwt.sign(payload, secret, options);
};

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
