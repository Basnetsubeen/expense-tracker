import {
  deleteTransaction,
  getTransaction,
  postTransaction,
} from "../../heplers/axiosHelper";
import { setTransaction } from "./transactionSlice";
import { toast } from "react-toastify";

export const fetchDataAction = () => async (dispatch) => {
  const { status, trans } = await getTransaction();
  //if status and trans is is true then only it will set the transaction;
  status === "success" && dispatch(setTransaction(trans));
};
export const postDataAction = (form) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const { status, message } = await postTransaction({ ...form, userId });
  toast[status](message);
  status === "success" && dispatch(fetchDataAction());
};
export const handleOnDeleteAction = (_id) => async (dispatch) => {
  if (!window.confirm("Are you sure you want to delete it?")) {
    return;
  }
  const { status, message } = await deleteTransaction(_id);

  toast[status](message);
  status === "success" && dispatch(fetchDataAction());
};
