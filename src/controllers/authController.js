import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

export async function signUp(req, res) {
  const user = req.body;

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
