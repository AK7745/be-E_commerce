import { User } from "../models/user.js";
import { hash_pass, verification } from "../helperFunctions/crypt.js";
import { generateToken } from "../Middlewares/auth.js";

export const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "the required feild are not denfined",
      });
    }
    const hashPassword = await hash_pass(password);
    const user = await User.create({
      name,
      email,
      phoneNumber,
      password: hashPassword,
    });
    console.log(user);
    res.status(200).json({
      success: true,
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const emailSigin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const user = await User.findOne({
      where: {
        email,
      },
      select: {
        password: true,
      },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const verify = await verification(password, user.password);
    if (!verify) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const accessToken = generateToken(email);

    return res.status(200).json({
      data: { email: user.email, accessToken },
      message: "Signin successful.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const phoneNumberSigin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res
        .status(400)
        .json({ error: "phoneNumber and password are required." });
    }

    const user = await User.findOne({
      where: {
        phoneNumber,
      },
    });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid phoneNumber or password." });
    }
    const verify = await verification(password, user.password);
    if (!verify) {
      return res
        .status(401)
        .json({ error: "Invalid phoneNumber or password." });
    }

    const accessToken = generateToken(phoneNumber);

    return res.status(200).json({
      data: { phoneNumber: user.phoneNumber, accessToken },
      message: "Signin successful.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
