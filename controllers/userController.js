import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "User does not exist" });

    const pwd = bcrypt.compareSync(password, user.password);
    if (!pwd)
      return res.status(401).json({ message: "Inalid pasword or credentials" });
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "secret"
    );

    return res.status(200).json({
      token: token,
      role: user.role,
    });
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
    });
  }
};
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User Already Exist" });
    const hashPwd = bcrypt.hashSync(password, 10);

    await User.create({
      username,
      email,
      password: hashPwd,
    });

    return res.status(200).json({ message: "User Registered Successfully." });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

export const getUserProfile = async (req, res) => {
  const id = req.userId;

  try {
    const user = await User.findById(id);
    console.log(user);
    return res.status(200).json({
      role: user.role,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  const { username, email } = req.body ?? {};
  const id = req.userId;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "User doesNot exist",
      });
    } else {
      user.username = username || user.username;
      user.email = email || user.email;

      await user.save();

      return res.status(200).json({
        message: "Profile Successfully Updated",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
    });
  }
};
