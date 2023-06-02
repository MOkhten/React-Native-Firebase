import { createSlice } from "@reduxjs/toolkit";

const state = {
    userId: null,
    login: null,
    photoURL: null,
    stateChange: false,
  };

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      photoURL: payload.photoURL,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange
    }),
    authSignOut: () => state,
  },
});

