import db from "../db.js";
import joi from "joi";

const transactionRegisterSchema = joi.object({
  user: joi.string().required(),
  description: joi.string().required(),
  type: joi.string().valid("incoming", "outgoing").required(),
  value: joi.string().required(),
});

export async function postTransaction(req, res) {
  const transaction = req.body;
  const validation = transactionRegisterSchema.validate(transaction);
  if (validation.error) {
    res.sendStatus(422);
    return;
  }

  try {
    await db.collection("transactions").insertOne({
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

export async function getTransactions(req, res) {
  try {
    const transactions = await db.collection("transactions").find({}).toArray();
    res.send(transactions);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
