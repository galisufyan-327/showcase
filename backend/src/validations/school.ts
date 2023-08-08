import Joi from "joi";

export const schoolValidation = Joi.object({
  name: Joi.string().min(3).required(),
});
