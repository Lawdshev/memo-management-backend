import { Response, Request } from "express";
import memoQueries from "../../utils/memo-queries";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseUtils";

const deleteMemo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const memoOwner = await memoQueries.getMemoOwner(id);
    if (memoOwner?._id !== (req as any).user._id) {
      sendErrorResponse(res, "Unauthorized", "You are not the owner of this memo", 401);
    }

    const memo = await memoQueries.deleteMemo(id);
    if (!memo) {
      sendErrorResponse(res, "Memo not found", "Memo not found", 404);
    }

    sendSuccessResponse(res, "Memo deleted successfully", memo, 200);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, "Failed to delete memo", "Failed to delete memo", 500);
  }
};

export default deleteMemo
