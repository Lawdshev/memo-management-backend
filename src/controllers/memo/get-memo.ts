import { Request, Response } from "express";
import memoQueries from "../../utils/memo-queries";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtils";

const getMemoById = async (req: Request, res: Response) => {
  try {
    const memoId = req.params.id;
    const memo = await memoQueries.getUserMemoById(memoId, (req as any).user);

    if (!memo) {
      return sendErrorResponse(
        res,
        "Memo not found or access denied",
        null,
        404
      );
    }

    return sendSuccessResponse(res, "Memo retrieved successfully", memo, 200);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, "Failed to retrieve memo", error, 500);
    return;
  }
};

export default getMemoById;
