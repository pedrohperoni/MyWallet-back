import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect().then(() => {
  db = mongoClient.db("MyWallet");
});

const userRegisterSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
  password: joi.string().required(),
});

app.post("/register", async (req, res) => {
  const user = req.body;
  const validation = userRegisterSchema.validate(user);
  if (validation.error) {
    res.sendStatus(422);
    return;
  }
  const nameAlreadyExists = await db
    .collection("users")
    .findOne({ name: user.name });
  const emailAlreadyExists = await db
    .collection("users")
    .findOne({ email: user.email });

  if (nameAlreadyExists) {
    res.sendStatus(409).send("Usuário já cadastrado, tente outro nome.");
    return;
  }
  if (emailAlreadyExists) {
    res.sendStatus(409).send("Email já cadastrado, tente outro email.");
    return;
  }

  try {
    await db.collection("users").insertOne({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    res.sendStatus(201);
  } catch (error) {
    console.error(500);
    res.sendStatus(500);
    return;
  }
});

app.listen(5000, () => {
  console.log("Server listening on port", 5000);
});
