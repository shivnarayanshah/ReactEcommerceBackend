import { createValidator } from "express-joi-validation";
import Joi from "joi";

export const joiValidator = createValidator({});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(30).required(),
});

export const registerSchema = Joi.object({
  username: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(30).required(),
});
