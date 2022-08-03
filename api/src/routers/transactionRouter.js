import express from "express";
import {
  addTransaction,
  deleteTransaction,
  getTransaction,
} from "../model/transaction/TransactionModule.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await addTransaction(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "New Transaction Added",
        })
      : res.json({
          status: "error",
          message: "Unable to add the transaction , Please try again",
        });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  const filter = {
    userID: authorization,
  };

  const trans = await getTransaction(filter);
  try {
    res.json({
      status: "success",
      message: "Here are the transaction",
      trans,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { _id } = req.params;
    if (authorization && _id) {
      const filter = {
        userId: authorization,
        _id,
      };
      const result = await deleteTransaction(filter);

      if (result._id) {
        return res.json({
          status: "success",
          message: "The transaction has been delted",
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid user",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
