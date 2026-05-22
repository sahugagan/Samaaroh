import Joi from "joi";

export const newsletterSchema = Joi.object({
  email: Joi.string().email().max(120).required(),
});
