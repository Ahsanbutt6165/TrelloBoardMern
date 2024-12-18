import { User } from "../models/User/UserModel.js";
import bcrypt from "bcrypt";
import TryCatch from "../utils/TryCatch.js";
import generateToken from "../utils/GenerateToken.js";

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: " All fields are reqquired" });
  }

  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ message: "please enter a valid email address" });
  }

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "Already have an account with this email",
    });

  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  generateToken(user._id, res);
  res.status(201).json({
    user,
    message: "User Registered",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "No user with this mail",
    });
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword)
    return res.status(400).json({
      message: "Wrong password",
    });
  generateToken(user._id, res);

  res.json({
    user,
    message: "Logged in",
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});

export const logOutUser = TryCatch(async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });

  res.json({
    message: "Logged Out Successfully",
  });
});
