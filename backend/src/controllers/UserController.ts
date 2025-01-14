import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";
import Booking from "../models/booking";
import Hotel from "../models/hotel";

const createUser = async (req: Request, res: any) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: "User already exists!" });
    }
    const newUser = new User(req.body);
    newUser.lastUpdated = new Date();
    newUser.save();

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).json({ message: "User registered correctly" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

const updateUser = async (req: Request, res: any) => {
  try {
    const { email, oldPassword, password } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    console.log(`${oldPassword}, ${isPasswordValid}`);
    if (!isPasswordValid) {
      return res.status(400).json({
        code: "INVALID_OLD_PASSWORD",
        message: "Invalid current password",
      });
    }

    user.email = email;
    if (password) {
      user.password = password;
    }
    user.lastUpdated = new Date();

    await user.save();
    return res.status(200).json({ message: "User updated correctly" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating user" });
  }
};

const getUser = async (req: Request, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong with login" });
  }
};

const getUserToBook = async (req: Request, res: any) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong with getting user to book",
    });
  }
};

const logoutUser = async (req: Request, res: any) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });

  res.send();
};

const getUserToken = async (req: Request, res: any) => {
  return res.status(200).send({ userId: req.userId });
};

const deleteUser = async (req: Request, res: any) => {
  try {
    console.log(req.userId);
    await Hotel.deleteMany({ userId: req.userId });
    await Booking.deleteMany({ userId: req.userId });
    await User.findByIdAndDelete(req.userId);

    res.cookie("auth_token", "", {
      expires: new Date(0),
    });

    return res
      .status(200)
      .json({ message: "User account deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong with delete account" });
  }
};

export default {
  createUser,
  getUser,
  getUserToBook,
  getUserToken,
  logoutUser,
  updateUser,
  deleteUser,
};
