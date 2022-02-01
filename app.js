import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.listen(5000, () => {
  console.log("Server listening on port", 5000);
});
