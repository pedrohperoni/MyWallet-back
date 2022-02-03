import db from "../db.js";
import joi from "joi";

const transactionRegisterSchema = joi.object({
  user: joi.string().required(),
  description: joi.string().required(),
  type: joi.string().valid("incoming", "outgoing").required(),
  value: joi.string().required(),
});

export async function postTransaction(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  const session = await db.collection("sessions").findOne({ token });

  if (!session) {
    return res.sendStatus(401);
  }

  const user = await db.collection("users").findOne({
    _id: session.userId,
  });
  if (user) {
    const transaction = req.body;
    const validation = transactionRegisterSchema.validate(transaction);
    if (validation.error) {
      res.sendStatus(422);
      return;
    }

    try {
      await db.collection("transactions").insertOne({
        userId: session.userId,
        user: transaction.user,
        description: transaction.description,
        type: transaction.type,
        value: transaction.value,
      });
      res.sendStatus(201);
    } catch (error) {
      console.error(500);
      res.sendStatus(500);
      return;
    }
  }
}

export async function getTransactions(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  const session = await db.collection("sessions").findOne({ token });
  if (!session) {
    return res.sendStatus(401);
  }

  const user = await db.collection("users").findOne({
    _id: session.userId,
  });

  if (user) {
    try {
      const transactions = await db
        .collection("transactions")
        .find({ userId: session.userId })
        .toArray();

      res.send(transactions);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}
