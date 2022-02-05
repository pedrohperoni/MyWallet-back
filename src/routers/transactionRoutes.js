import { Router } from "express";
import {
  getTransactions,
  postTransaction,
} from "../controllers/transactionController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware.js";
import { transactionRegisterSchemaValidationMiddleware } from "../middlewares/transactionsValidationMiddleware.js";

const transactionsRouter = Router();
transactionsRouter.use(tokenValidationMiddleware);
transactionsRouter.post(
  "/transactions",
  transactionRegisterSchemaValidationMiddleware,
  postTransaction
);
transactionsRouter.get("/transactions", getTransactions);

export default transactionsRouter;
