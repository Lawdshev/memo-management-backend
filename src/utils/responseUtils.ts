import { Response } from "express";

export const sendSuccessResponse = (
  res: Response,
  message: string,
  data: any = null,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendErrorResponse = (
  res: Response,
  message: string,
  errors: any = null,
  statusCode: number = 400
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
