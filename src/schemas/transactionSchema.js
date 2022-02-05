import joi from "joi";

const transactionRegisterSchema = joi.object({
  description: joi.string().required(),
  type: joi.string().valid("incoming", "outgoing").required(),
  value: joi.string().required(),
  date: joi.required(),
});

export default transactionRegisterSchema;
