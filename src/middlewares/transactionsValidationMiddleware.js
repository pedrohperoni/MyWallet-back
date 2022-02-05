import transactionRegisterSchema from "../schemas/transactionSchema.js";

export function transactionRegisterSchemaValidationMiddleware(req, res, next) {
  const transaction = req.body;
  const validation = transactionRegisterSchema.validate(transaction);
  if (validation.error) {
    res.sendStatus(422);
    return;
  }
  next();
}
