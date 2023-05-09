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

export const authSignUpUser = ({ email, password, login }) => async (dispatch, getState) => {
    try {
        const responce = await createUserWithEmailAndPassword(authFirebase, email, password);
        const user = responce.user;
         await updateProfile(authFirebase.currentUser, {
             displayName: login,
             userId: user.uid,
         });
        const { displayName, uid, photoURL } = authFirebase.currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        // userAvatar: photoURL,
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
         const user = await signInWithEmailAndPassword(authFirebase, email, password)
        // const user = await db
      
    } catch(error) {
        console.log('error', error);
        console.log('error.message', error.message);
    }
    
};

export const authSignOutUser = () => async (dispatch, getState) => {
    try {
    await signOut(authFirebase);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error", error);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => { 
    onAuthStateChanged(authFirebase, (user) => {
        if (user) {
        const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        // userAvatar: user.photoURL,
        userEmail: user.email,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
        }
    });
}

