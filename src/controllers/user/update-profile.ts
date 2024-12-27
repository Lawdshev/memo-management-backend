import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtils";
import userQueries from "../../utils/user-queries";

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const updateData = req.body;
    const updatedUser = await userQueries.updateUserProfile(userId, updateData);
    if (!updatedUser) {
      sendErrorResponse(res, "User not found", "Invalid user ID", 404);
      return;
    }

    sendSuccessResponse(res, "User profile updated successfully", updatedUser);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, "Failed to update user profile", error, 500);
  }
};
