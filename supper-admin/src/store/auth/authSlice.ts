import { createSlice } from "@reduxjs/toolkit";
import { accessTokenCookie } from "../../../util/cookie";

const initialState = {
  isLogin: Boolean(accessTokenCookie.get()),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setIsLogin } = authSlice.actions;

export default authSlice.reducer;
