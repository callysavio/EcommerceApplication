import Joi from "joi";

// Joi validation schema
export const productValidationSchema = Joi.object({
    price: Joi.number().min(0).required(),
  description: Joi.string().min(10).required(),
  stockStatus: Joi.number().integer().min(0).required(),
  category: Joi.string()
    .valid(
      "Electronics",
      "Fashion",
      "Beauty and Personal Care",
      "Home and Kitchen",
      "Health and Fitness"
    )
        .required(),
  productName: Joi.string().min(10).required(), 
});
