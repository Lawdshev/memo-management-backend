import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import bcrypt from "bcrypt";
import { validateRequest } from "../../middlewares/validation";
import registerSchema from "../../validation-schemas/register";

async function registerUser(req: Request, res: Response,next:NextFunction) {
    const { name, email, password } = req.body;
    validateRequest(registerSchema);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
   next(error);
  }
};

export default registerUser;