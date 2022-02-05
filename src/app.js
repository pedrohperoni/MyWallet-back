import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/authRoutes.js";
import transactionsRouter from "./routers/transactionRoutes.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(authRouter);
app.use(transactionsRouter);

app.listen(5000, () => {
  console.log("Server listening on port", 5000);
});
