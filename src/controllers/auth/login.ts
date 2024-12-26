import { Request, Response,NextFunction  } from "express";
import bcrypt from "bcrypt";
import userQueries from "../../utils/user-queries";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseUtils";
import loginSchema from "../../validation-schemas/login";
import { validateRequest } from "../../middlewares/validation";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const error = validateRequest(loginSchema, req);
    if (error) {
      sendErrorResponse(res, "Validation Error", error.details[0].message, 400);
      return;
    }
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
      return;
    } else {
      sendErrorResponse(res, "Invalid Credentials", "", 400);
      return;
    }
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, "An error occurred during login", error, 500);
  }
};

export default loginUser;