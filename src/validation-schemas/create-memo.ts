import Joi from "joi";

const createMemoSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.base": "Title should be a string",
    "string.min": "Title should be at least 3 characters long",
    "any.required": "Title is required",
  }),
  content: Joi.string().required().messages({
    "any.required": "Content is required",
  }),
  tags: Joi.array().items(Joi.string()),
  isDraft: Joi.boolean(),
  sharedWith: Joi.array().items(Joi.string()).when('isDraft', {
    is: false,
    then: Joi.required(),
  }),
});

export default createMemoSchema;
