import Joi from "joi"

export const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required().min(10).max(30),
    role: Joi.string().valid("user", "admin").required(),
})

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});