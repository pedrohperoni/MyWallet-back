import joi from "joi";

const userRegisterSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(30)
    .pattern(/^\w+(?:\s+\w+)*$/)
    .required(),
  email: joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
  password: joi.string().min(3).required(),
  confirmPassword: joi.ref("password"),
});

const userLoginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

export { userRegisterSchema, userLoginSchema };
