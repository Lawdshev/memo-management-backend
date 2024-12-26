import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import userQueries from "../utils/user-queries";
import { sendErrorResponse } from "../utils/responseUtils";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = await userQueries.findUserById((decoded as any)._id);
      next();
    } catch (error) {
      sendErrorResponse(res, "Invalid token", null, 401);
    }
  }
  if (!token) {
    sendErrorResponse(res, "Not authorized, no token", null, 401);
  }
};
