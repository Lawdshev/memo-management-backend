import Joi from "joi";

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": "Password should be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

export default resetPasswordSchema;
