import { Response, Request } from "express";
import memoQueries from "../../utils/memo-queries";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtils";
import { AuthedRequest } from "../../types";

const getDraftMemos = async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest)?.user;
    const page = parseInt(req.query.page as string) || 1; 
    const pageSize = parseInt(req.query.limit as string) || 10; 

    const [draftMemos, totalItems] = await Promise.all([
      memoQueries.getDraftsByOwner(user, page, pageSize),
      memoQueries.findMemosCount({ owner: user._id, isDraft: true }, user),
    ]);
      
    return sendSuccessResponse(
      res,
      "Draft memos retrieved successfully",
      {
        page,
        limit: pageSize,
        result: draftMemos,
        totalItems,
      },
      200
    );
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, "Failed to retrieve draft memos", error, 500);
    return;
  }
};

export default getDraftMemos;
