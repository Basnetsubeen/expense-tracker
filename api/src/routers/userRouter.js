import express from "express";
import { getOneUser, insertUser } from "../model/UserModel.js";

const router = express.Router();

// Writing the post method for login to insert the user
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getOneUser({ email });

    // First check the email and if email exits then checks the password insert in the frontend.

    //Using if/else condition to hide the password
    if (user?.password === password) {
      user.password = undefined;
      res.json({
        status: "success",
        message: "Login successfully",
        user,
      });
    } else
      res.json({
        status: "error",
        message: "Invalid login information",
      });
  } catch (error) {
    next(error);
  }
});

// Writing the post method to register the user.

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await insertUser(req.body);
    result?._id
      ? res.json({
          status: "success",
          message:
            "You account has been successfuly created Please go to login page and login" +
            result.email,
        })
      : res.json({
          status: "error",
          message: "Unable to register, please try again",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      (error.status = 200),
        (error.message = "There is another user already exist");
    }
    next(error);
  }
});

export default router;
