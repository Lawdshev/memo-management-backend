import { Request, Response } from "express";
import crypto from "crypto";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtils";
import sendEmail from "../../utils/sendMail";
import userQueries from "../../utils/user-queries";
import { validateRequest } from "../../middlewares/validation";
import forgotPasswordSchema from "../../validation-schemas/forgot-password";

async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const error = validateRequest(forgotPasswordSchema, req);
    if (error) {
      sendErrorResponse(res, error.message, null, 400);
      return;
    }

    const user = await userQueries.findUserByEmail(email);
    if (!user) {
      sendErrorResponse(res, "No user found with this email", null, 404);
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested to reset your password. Use the link below to reset your password: \n\n ${resetUrl}`,
    });

    return sendSuccessResponse(res, "Password reset email sent successfully");
  } catch (error) {
    sendErrorResponse(
      res,
      "An error occurred while processing your request",
      error,
      500
    );
      return; 
  }
}
export default forgotPassword;