import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  Socket:null,
  notificationCount:null
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    loginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    subscribe(state,action){
      state.Socket=action.payload
    },
    setNotificationCount(state,action){
      state.Socket=action.payload
    }
  },
});

export const { loginStart, loginSuccess, loginFail, logout,subscribe,setNotificationCount} = authSlice.actions;

export default authSlice.reducer;