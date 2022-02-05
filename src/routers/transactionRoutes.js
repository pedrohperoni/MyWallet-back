import { Router } from "express";
import {
  getTransactions,
  postTransaction,
} from "../controllers/transactionController.js";
import { transactionRegisterSchemaValidationMiddleware } from "../middlewares/transactionsValidationMiddleware.js";

const transactionsRouter = Router();
transactionsRouter.post(
  "/transactions",
  transactionRegisterSchemaValidationMiddleware,
  postTransaction
);
transactionsRouter.get("/transactions", getTransactions);

export default transactionsRouter;
