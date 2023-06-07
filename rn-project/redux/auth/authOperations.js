import { authFirebase } from '../../firebase/config';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { authSlice } from './authReducer';

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser = ({ email, password, login, avatar }) => async (dispatch, getState) => {
    try {
        const responce = await createUserWithEmailAndPassword(authFirebase, email, password);
        const user = responce.user;
         await updateProfile(authFirebase.currentUser, {
             displayName: login,
             userId: user.uid,
             photoURL: avatar,
         });
        const { displayName, uid, photoURL, email } = authFirebase.currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        userAvatar: photoURL,
        userEmail: email,
      };

      dispatch(updateUserProfile(userUpdateProfile))
    } catch(error) {
        console.log('error', error);
        console.log('error.message', error.message);
    }
};

export const authSignIn = ({ email, password }) => async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(authFirebase, email, password);
       console.log("user", user);
      const { displayName, uid, photoURL } = user.user;
      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        userEmail: email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
       

    } catch (err) {
        console.log('error message', err.message);
        alert(err.message)
    }
}



export const authSignOutUser = () => async (dispatch, getState) => {
    try {
    await signOut(authFirebase);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error", error);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => { 
  try{
    onAuthStateChanged(authFirebase, (user) => {
        if (user) {
        const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        userAvatar: user.photoURL,
        userEmail: user.email,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
        }
    });
}catch (error) {
    dispatch(fetchingError(error.message));
    console.log("error", error.message);
  }
};

