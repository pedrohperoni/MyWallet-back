import { userRegisterSchema, userLoginSchema } from "../schemas/userSchemas.js";

export function userRegisterSchemaValidationMiddleware(req, res, next) {
  const user = req.body;
  const validation = userRegisterSchema.validate(user);
  if (validation.error) {
    res.sendStatus(422);
    return;
  }
  next();
}

export function userLoginSchemaValidationMiddleware(req, res, next) {
  const user = req.body;
  const validation = userLoginSchema.validate(user);

  if (validation.error) {
    res.sendStatus(422);
    return;
  }
  next();
}
