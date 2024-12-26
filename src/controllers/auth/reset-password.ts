import bcrypt from "bcrypt";
import crypto from "crypto";
import { Request, Response } from "express";
import User from "../../models/user";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtils";
import { validateRequest } from "../../middlewares/validation";
import resetPasswordSchema from "../../validation-schemas/reset-password";

async function resetPassword(req: Request, res: Response) {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const error = validateRequest(resetPasswordSchema, req);
    if (error) {
      sendErrorResponse(res, "Validation Error", error.details[0].message, 400);
      return;
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, 
    });

    if (!user) {
      sendErrorResponse(res, "Invalid or expired token", null, 400);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return sendSuccessResponse(res, "Password reset successfully");
  } catch (error) {
    return sendErrorResponse(
      res,
      "An error occurred while resetting your password",
      error,
      500
    );
  }
}

export default resetPassword;