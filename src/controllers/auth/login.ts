import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userQueries from "../../utils/user-queries";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseUtils";
import { validateRequest } from "../../middlewares/validation";
import loginSchema from "../../validation-schemas/login";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    validateRequest(loginSchema);
    const user = await userQueries.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      sendSuccessResponse(
        res,
        "logged in successfully",
        {
          token: user.generateToken(),
        },
        200
      );
      return
    } else {
      sendErrorResponse(
        res,
        "Invalid Credentials",
        "",
        400
      )
      return
    }
  } catch (error) {
    sendErrorResponse(res, "An error occurred during login", error, 500);
  }
};

export default loginUser;