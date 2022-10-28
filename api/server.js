import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8000;
import path from "path";

app.use(express.json());

// middleWares
app.use(cors());

// dbConnect
import { dbConnect } from "./src/config/dbConnect.js";
dbConnect();

// APIs
import userRouter from "./src/routers/userRouter.js";
import transactionRouter from "./src/routers/transactionRouter.js";
import { authMiddlewares } from "./src/middlewares/authMiddlewares.js";
import { env } from "process";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", authMiddlewares, transactionRouter);

//path
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/build")));

// Server side rendering
app.use("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  } catch (error) {
    next(error);
  }
});
app.use((error, req, res, next) => {
  const status = error.status || 404;

  res.status(status).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error && console.log(error);
  console.log("your server is serving at http://localhost:8000");
});
