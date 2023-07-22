import {
    loginStart,
    loginSuccess,
    loginFail,
    logout,
    subscribe,
    setNotificationCount
  } from "../slices/Auth";
  import { login as loginApi } from "../Services/authService";
  
  export const login = (Email, Password) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const { user, token } = await loginApi(Email, Password);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      dispatch(loginSuccess({ user, token }));
    } catch (error) {
      dispatch(loginFail(error));
      
    }
  };
  
  export const logoutAction = () => (dispatch) => {
    dispatch(logout());
  };
  
  export const subscribeSocket = (socket) => (dispatch) => {
    
    dispatch(subscribe( socket ));
  };
  
  
  export const updateNotificationsCount = (count) => (dispatch) => {
    
    dispatch(setNotificationCount( count ));
  };
  