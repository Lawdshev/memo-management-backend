import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtils";
import userQueries from "../../utils/user-queries";

const getUserProfile = async (req: Request, res: Response) => {
    const user = (req as any).user;
  try {
    const userDoc = await userQueries.findUserById(user.id);
    if (!userDoc) {
      return sendErrorResponse(
        res,
        "User not found",
        "No user exists with the given ID.",
        404
      );
    }

    return sendSuccessResponse(
      res,
      "User profile retrieved successfully",
      userDoc,
      200
    );
  } catch (error) {
    console.error(error);
    return sendErrorResponse(
      res,
      "Failed to retrieve user profile",
      error,
      500
    );
  }
};

export default getUserProfile;
