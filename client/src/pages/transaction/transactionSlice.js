import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transaction: [],
};
const transSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction: (state, { payload }) => {
      state.transaction = payload;
    },
  },
});
const { reducer, actions } = transSlice;
export const { setTransaction } = actions;

export default reducer;
