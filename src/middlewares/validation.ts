import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendErrorResponse } from "../utils/responseUtils";

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response) => {
    console.log("validating...");
    const { error } = schema.validate(req.body);
    if (error) {
      sendErrorResponse(res, error.message, null, 400);
      return;
    }
  };
};
