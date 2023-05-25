import { User } from "../models/user.js";
import Jwt from "jsonwebtoken";
import { hash_pass, verification } from "../helperFunctions/crypt.js";
import {
  generateToken,
  generaterefreshToken,
  verifier,
} from "../Middlewares/auth.js";
import {
  CHANGE_PASSWORD_SECRET_KEY,
  WEB_TOKEN_SECRET_KEY,
} from "../constants/constants.js";
import { sendTokenEmail } from "../Middlewares/node-mailer.js";

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
    console.log(error);
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

    const accessToken = generateToken(user?.email);
    const refreshToken = generaterefreshToken(user?.email);

    return res.status(200).json({
      data: { email: user.email, accessToken, refreshToken },
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

export const refreshToken = (req, res) => {
  try {
    const refreshToken = req?.body?.refreshToken;
    if (!refreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "refresh token is required" });
    }

    const accessToken = verifier(refreshToken, WEB_TOKEN_SECRET_KEY);
    res.status(201).json({
      success: true,
      message: "access token is created successfully",
      data: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        success: false,
        message: "email not found",
      });
    }
    const check = await User.findOne({
      where: {
        email,
        deleted: false,
      },
    });
    if (!check) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetPasswordToken = Jwt.sign(
      { userId: check.id },
      CHANGE_PASSWORD_SECRET_KEY,
      { expiresIn: "1h" }
    );

    
    await sendTokenEmail(email, resetPasswordToken);
    res
      .status(200)
      .json({ success: true, message: "Request for password reset send" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: "internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const decoded = Jwt.verify(resetToken, CHANGE_PASSWORD_SECRET_KEY);

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    const hashedPassword = await hash_pass(newPassword)

    user.password = hashedPassword;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
