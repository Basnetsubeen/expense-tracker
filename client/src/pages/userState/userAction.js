import { loginUser } from "../../heplers/axiosHelper";
import { toast } from "react-toastify";
import { setUser } from "./userSlice";

export const loginAction = (obj) => async (dispatch) => {
  //high order function just for using the dispatch here
  //first call axios and get data from the server
  const { status, message, user } = await loginUser(obj);
  toast[status](message);

  if (status === "success") {
    window.localStorage.setItem("user", JSON.stringify(user)); // (key , value)

    //dispatch the incoming data to the slice
    dispatch(setUser(user));
  }
};
export const userLogoutAction = () => (dispatch) => {
  dispatch(setUser({}));
  window.localStorage.removeItem("user");
};
