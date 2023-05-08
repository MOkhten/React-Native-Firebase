import { authFirebase } from '../../firebase/config';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from 'firebase/auth';
import { authSlice } from './authReducer';

const { updateUserProfile, authStateChange } = authSlice.actions;

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

export const authSignOut = () => async (dispatch, getState) => {
    
};

export const authStateChangeUser = () => async (dispatch, getState) => { 
     onAuthStateChanged(authFirebase, (user) => setUser(user));
}

