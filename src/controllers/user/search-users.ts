import { Request, Response } from "express";
import userQueries from "../../utils/user-queries";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtils";

const searchUsers = async (req: Request, res: Response) => {
  const { query, page = 1, pageSize = 50 } = req.query;

  if (!query || typeof query !== "string") {
    return sendErrorResponse(
      res,
      "Invalid query",
      "Query parameter is required and must be a string.",
      400
    );
  }

  try {
    const users = await userQueries.searchUsers(
      query,
      Number(page),
      Number(pageSize)
    );
    return sendSuccessResponse(res, "Users retrieved successfully", users, 200);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, "Failed to search users", error, 500);
  }
};

export default searchUsers;
