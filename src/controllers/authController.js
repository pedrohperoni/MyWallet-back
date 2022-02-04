import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";
import joi from "joi";

const userRegisterSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(30)
    .pattern(/^\w+(?:\s+\w+)*$/)
    .required(),
  email: joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
  password: joi.string().required(),
  confirmPassword: joi.ref("password"),
});

const userLoginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

export async function signUp(req, res) {
  const user = req.body;
  const validation = userRegisterSchema.validate(user);
  if (validation.error) {
    res.sendStatus(422);
    return;
  }

  const emailAlreadyExists = await db
    .collection("users")
    .findOne({ email: user.email });

  if (emailAlreadyExists) {
    res.sendStatus(409);
    return;
  }

  const passwordHash = bcrypt.hashSync(user.password, 10);

  try {
    await db.collection("users").insertOne({
      name: user.name,
      email: user.email,
      password: passwordHash,
    });
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
    return;
  }
}

export async function signIn(req, res) {
  const user = req.body;
  const validation = userLoginSchema.validate(user);

  if (validation.error) {
    res.sendStatus(422);
    return;
  }

  try {
    const existingUser = await db
      .collection("users")
      .findOne({ email: user.email });

    if (
      existingUser &&
      bcrypt.compareSync(user.password, existingUser.password)
    ) {
      const token = uuid();

      await db.collection("sessions").insertOne({
        userId: existingUser._id,
        token,
      });

      const userInfo = { token: token, user: existingUser.name };
      res.send(userInfo);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}
