import Joi from "joi";

export const educationValidation = Joi.object({
  school: Joi.string().required(),
  degree: Joi.string().min(2).required(),
  field: Joi.string().min(3).required(),
  start_year: Joi.number().min(1900).max(2023).required(),
  end_year: Joi.number()
    .integer()
    .min(Joi.ref("start_year"))
    .optional()
    .allow(null, ""),
  is_end_year_expected: Joi.boolean().required(),
  grade: Joi.string().min(1).required(),
  description: Joi.string().max(500).required(),
});
