import { Router } from "express";
import {
  getTransactions,
  postTransaction,
} from "../controllers/transactionController.js";

const transactionsRouter = Router();
transactionsRouter.post("/transactions", postTransaction);
transactionsRouter.get("/transactions", getTransactions);

export default transactionsRouter;
