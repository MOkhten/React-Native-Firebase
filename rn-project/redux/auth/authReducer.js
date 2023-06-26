import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
  userName: null,
  userAvatar: null,
    userEmail: "",
    photoURL: null,
    stateChange: false,
  };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchingInProgress: (state) => {
      return { ...state };
    },
  
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
        userName: payload.userName,
        userAvatar: payload.userAvatar,
        userEmail: payload.userEmail,
      // userId: payload.userId,
      // login: payload.login,
      //  userName: payload.userName,
        // userAvatar: payload.userAvatar,
     
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange
    }),
    authSignOut: () => initialState,
  },
});

