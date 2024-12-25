import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }
    
  req.app.use((err: Error, _req: Request, _res: Response, next: NextFunction) => {
    console.error(err);
    next();
  });

  res.status(statusCode).json({
    success: false,
    message,
  });
};
