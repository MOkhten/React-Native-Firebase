import { auth } from '../../firebase/config';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from 'firebase/auth';
import { authSlice } from './authReducer';

const { updateUserProfile, authStateChange } = authSlice.actions;

export const authSignUpUser = ({ email, password, name }) => async (dispatch, getState) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
         await updateProfile(auth.currentUser, {
             displayName: login,
             userId: user.uid,
         });
        const { displayName, uid, photoURL } = await authFirebase.currentUser;

      const userUpdateProfile = {
        userName: displayName,
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
         const user = await signInWithEmailAndPassword(auth, email, password)
        // const user = await db
      
    } catch(error) {
        console.log('error', error);
        console.log('error.message', error.message);
    }
    
};

export const authSignOut = () => async(dispatch, getState) => {
    
}

