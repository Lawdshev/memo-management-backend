import { Request } from "express";
import Joi from "joi";

export const validateRequest = (schema: Joi.ObjectSchema,req: Request) => {
  const { error } = schema.validate(req.body)
  return error; 
};
