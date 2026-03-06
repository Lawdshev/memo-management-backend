import { Response, Request } from "express";
import memoQueries from "../../utils/memo-queries";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseUtils";

const permanentDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const memoOwner = await memoQueries.getMemoOwner(id);
    if (!memoOwner || memoOwner.toString() !== (req as any).user._id.toString()) {
      return sendErrorResponse(res, "Unauthorized", "You are not authorized to delete this memo", 401);
    }

    const memo = await memoQueries.deleteMemo(id);
    if (!memo) {
      return sendErrorResponse(res, "Memo not found", "Memo not found", 404);
    }

    return sendSuccessResponse(res, "Memo deleted successfully", memo, 200);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, "Failed to delete memo", "Failed to delete memo", 500);
  }
};

export default permanentDelete
