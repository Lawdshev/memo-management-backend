import { Response, Request } from "express";
import memoQueries from "../../utils/memo-queries";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtils";
import { AuthedRequest } from "../../types";

const getInbox = async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest)?.user;
    const page = parseInt(req.query.page as string) || 1; // Default to page 1
      const pageSize = parseInt(req.query.limit as string) || 10; // Default to 10 items per page
      
    const [inboxMemos, totalItems] = await Promise.all([
      memoQueries.getMemosSentToUser(user, page, pageSize),
      memoQueries.findMemosCount({ sharedWith: user._id }, user),
    ]);
    
    return sendSuccessResponse(
      res,
      "Inbox memos retrieved successfully",
      {
        page,
        limit: pageSize,
        result: inboxMemos,
        totalItems,
      },
      200
    );
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, "Failed to retrieve inbox memos", error, 500);
    return;
  }
};

export default getInbox;
