import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { signIn, signUp } from "./controllers/authController.js";
import {
  getTransactions,
  postTransaction,
} from "./controllers/transactionController.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.post("/auth/sign-in", signIn);
app.post("/auth/sign-up", signUp);
app.post("/transactions", postTransaction);
app.get("/transactions", getTransactions);

// const mongoClient = new MongoClient(process.env.MONGO_URI);
// let db;

// mongoClient.connect().then(() => {
//   db = mongoClient.db("MyWallet");
// });

// const userRegisterSchema = joi.object({
//   name: joi.string().required(),
//   email: joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
//   password: joi.string().required(),
//   confirmPassword: joi.ref("password"),
// });

// const userLoginSchema = joi.object({
//   email: joi.string().required(),
//   password: joi.string().required(),
// });

// const transactionRegisterSchema = joi.object({
//   user: joi.string().required(),
//   description: joi.string().required(),
//   type: joi.string().valid("incoming", "outgoing").required(),
//   value: joi.string().required(),
// });

// app.post("/auth/sign-up", async (req, res) => {
//   const user = req.body;
//   const validation = userRegisterSchema.validate(user);
//   if (validation.error) {
//     res.sendStatus(422).send("Preencha os campos obrigatórios");
//     return;
//   }

//   const emailAlreadyExists = await db
//     .collection("users")
//     .findOne({ email: user.email });

//   if (emailAlreadyExists) {
//     res.sendStatus(409).send("Email já cadastrado, tente outro email.");
//     return;
//   }

//   const passwordHash = bcrypt.hashSync(user.password, 10);

//   try {
//     await db.collection("users").insertOne({
//       name: user.name,
//       email: user.email,
//       password: passwordHash,
//     });
//     res.sendStatus(201).send("Usuário cadastrado com sucesso!");
//   } catch (error) {
//     res.sendStatus(500).send("Internal server error");
//     return;
//   }
// });

// app.get("/auth/sign-in", async (req, res) => {
//   const user = req.body;
//   const validation = userLoginSchema.validate(user);

//   if (validation.error) {
//     res.sendStatus(422).send("Preencha os campos obrigatórios");
//     return;
//   }

//   try {
//     const existingUser = await db
//       .collection("users")
//       .findOne({ email: user.email });

//     if (
//       existingUser &&
//       bcrypt.compareSync(user.password, existingUser.password)
//     ) {
//       const token = uuid();

//       await db.collection("sessions").insertOne({
//         userId: user._id,
//         token,
//       });

//       res.send(token);
//     } else {
//       res
//         .sendStatus(401)
//         .send("Usuário não encontrado (email ou senha incorretos)");
//     }
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });

// app.post("/transactions", async (req, res) => {
//   const transaction = req.body;
//   const validation = transactionRegisterSchema.validate(transaction);
//   if (validation.error) {
//     res.sendStatus(422);
//     return;
//   }

//   try {
//     await db.collection("transactions").insertOne({
//       user: transaction.user,
//       description: transaction.description,
//       type: transaction.type,
//       value: transaction.value,
//     });
//     res.sendStatus(201);
//   } catch (error) {
//     console.error(500);
//     res.sendStatus(500);
//     return;
//   }
// });

// app.get("/transactions", async (req, res) => {
//   try {
//     const transactions = await db.collection("transactions").find({}).toArray();
//     res.send(transactions);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

app.listen(5000, () => {
  console.log("Server listening on port", 5000);
});
