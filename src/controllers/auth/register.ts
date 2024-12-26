import {  Request, Response } from "express";
import User from "../../models/user";
import bcrypt from "bcrypt";
import userQueries from "../../utils/user-queries";
import registerSchema from "../../validation-schemas/register";
import { validateRequest } from "../../middlewares/validation";
  import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseUtils";

async function registerUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const error = validateRequest(registerSchema, req);
    if (error) {
      sendErrorResponse(res, "Validation Error", error.details[0].message, 400);
      return;
    }

    const userExists = await userQueries.findUserByEmail(email);

    if (userExists) {
      sendErrorResponse(res, "User already exists", null, 400);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      sendSuccessResponse(
        res,
        "User registered successfully",
        {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        201
      );
      return; 
    } else {
      sendErrorResponse(res, "Failed to create user", null, 400);
       return;
    }
  } catch (error) {
     sendErrorResponse(
      res,
      "An error occurred during registration",
      error,
      500
     );
    return;
  }
}

export default registerUser;
