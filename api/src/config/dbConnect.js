import mongoose from "mongoose";

export const dbConnect = () => {
  try {
    const MONGO_CLIENT = "mongodb://localhost:27017/ExpensesTracker";
    const conn = mongoose.connect(MONGO_CLIENT);
    conn && console.log("Database Connected");
  } catch (error) {
    error && console.log(error);
  }
};
