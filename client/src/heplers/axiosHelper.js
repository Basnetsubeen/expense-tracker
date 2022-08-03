import axios from "axios";
const rootUrl = "http://localhost:8000";
const userEP = rootUrl + "/api/v1/user";
const transactionEP = rootUrl + "/api/v1/transaction";

// ===== user api ============

export const postNewUser = async (obj) => {
  try {
    const response = await axios.post(userEP, obj);
    console.log(response);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
export const loginUser = async (obj) => {
  try {
    const response = await axios.post(userEP + "/login", obj);
    console.log(response);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

/// =========Transaction api ========

export const postTransaction = async (obj) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const response = await axios.post(transactionEP, obj, {
      headers: {
        authorization: userId,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
export const getTransaction = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const response = await axios.get(transactionEP, {
      headers: {
        authorization: userId,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
export const deleteTransaction = async (_id) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const response = await axios.delete(transactionEP + "/" + _id, {
      headers: {
        authorization: userId,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
