import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import { Provider} from "react-redux";
import { store } from "./redux/store";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import Main from "./components/Main";

   export default function App() {
  // const auth = getAuth();
    //  onAuthStateChanged(auth, (user) => setUser(user));

     return (
       <Provider store={store}>
       <Main/>
    </Provider>
    
  );
}

