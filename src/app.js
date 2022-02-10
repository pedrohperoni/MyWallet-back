import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(router);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
