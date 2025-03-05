import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: {} | null;
  error: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {},
  error: null,
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser(state, action: PayloadAction<any>) {
      state.isAuthenticated = true;
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      } else {
        state.user = action.payload;
      }
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.user = {};
    },

    authenticateUserFailed(state, action: PayloadAction<any>) {
      state.isAuthenticated = false;

      state.error = action.payload.error;
    },
  },
});

export const { authenticateUser, authenticateUserFailed, logoutUser } =
  authslice.actions;

export default authslice.reducer;
