import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendErrorResponse } from "../utils/responseUtils";

export const validateRequest = (schema: Joi.ObjectSchema) => {
  console.log("validating...",schema);
  return (req: Request, res: Response) => {
    const { error } = schema.validate(req.body);
    if (error) {
      sendErrorResponse(res, error.message, null, 400);
      return;
    }
  };
};
