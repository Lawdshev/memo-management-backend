import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtils";
import userQueries from "../../utils/user-queries";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, pageSize = 20 } = req.query;
    const users = await userQueries.getAllUsers(Number(page), Number(pageSize));
    sendSuccessResponse(res, "Users fetched successfully", users);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, "Failed to fetch users", error, 500);
  }
};

export default getAllUsers;