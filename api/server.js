import express from "express";
import cors from "cors";
const app = express();
const PORT = 8000;

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
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", authMiddlewares, transactionRouter);

// Server side rendering
app.use("/", (req, res, next) => {
  try {
    res.send("<h1>Coming Soon</h1>");
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
