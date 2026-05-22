import Joi from "joi";

export const contactSchema = Joi.object({
  fullName: Joi.string().min(2).max(80).required(),
  email: Joi.string().email().max(120).required(),
  phone: Joi.string().max(20).allow(""),
  companyName: Joi.string().max(120).allow(""),
  service: Joi.string()
    .valid("Android Development", "Software Development", "Web Development", "Other")
    .required(),
  budget: Joi.string().max(50).allow(""),
  message: Joi.string().min(10).max(2000).required(),
});
