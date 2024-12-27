import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtils";
import { AuthedRequest } from "../../types";
import userQueries from "../../utils/user-queries";

const deleteMemoForUser = async (req: Request, res: Response) => {
  const userId = (req as AuthedRequest).user.id;
  const { memoId } = req.params;
  try {
    if (!memoId) {
      return sendErrorResponse(res, "Memo ID is required", null, 400);
    }

    const user = await userQueries.softDeleteMemoForUser(userId, memoId);
    if (!user) {
      return sendErrorResponse(res, "User not found", null, 404);
    }

    return sendSuccessResponse(res, "Memo deleted successfully", null, 200);
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, "Failed to delete memo", error, 500);
  }
};

export default deleteMemoForUser;
