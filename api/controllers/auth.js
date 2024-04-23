import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: '5h' }
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    const domain = 'finalproejectweb-1.onrender.com';
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (5 * 60 * 60 * 1000));
    res.cookie("access_token", token, {
      httpOnly: true,
      expires: expirationDate,
      domain: domain
    })
    
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin,access_token:{...token  } });
  } catch (err) {
    next(err);
  }
};


export const logout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).send("Logged out successfully.");
  } catch (err) {
    next(err);
  }
};