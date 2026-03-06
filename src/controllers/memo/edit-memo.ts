import { Response, Request } from "express";
import memoQueries from "../../utils/memo-queries";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtils";

const editMemo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, tags, isDraft, sharedWith } = req.body;

  try {
    const memo = await memoQueries.getMemoById(id);
    if (!memo) {
      sendErrorResponse(res, "Memo not found", "Memo not found", 404);
      return;
    }

    const memoOwner = await memoQueries.getMemoOwner(id);
    if (!memoOwner || memoOwner.toString() !== (req as any).user._id.toString()) {
      sendErrorResponse(res, "Unauthorized", "You are not authorized to edit this memo", 401);
      return;
    }

    memo.title = title || memo.title;
    memo.content = content || memo.content;
    memo.tags = tags || memo.tags;
    memo.isDraft =
      sharedWith?.length > 0
        ? false
        : sharedWith?.length === 0
        ? true
        : isDraft ?? memo.isDraft;
    memo.sharedWith = sharedWith || memo.sharedWith;
    await memo.save();

    sendSuccessResponse(res, "Memo edited successfully", memo, 200);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, "Failed to edit memo", error, 500);
  }
};

export default editMemo;