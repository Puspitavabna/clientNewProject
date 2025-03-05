// utils/logout.js


import { logoutUser } from "../store/slices/authSlice";
import { store } from "../store/store";


export const logout = () => {
 

  store.dispatch(logoutUser())

  window.location.href = "/"; // Redirect to the homepage
};
