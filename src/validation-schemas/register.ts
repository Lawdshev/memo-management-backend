import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": "Name should be a string",
    "string.min": "Name should be at least 3 characters long",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password should be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

export default registerSchema;