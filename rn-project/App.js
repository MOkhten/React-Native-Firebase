
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import { Provider } from "react-redux";
import useRoute from "./router";
import { store } from "./redux/store";
import { db } from './firebase/config';

   export default function App() {

     const [user, setUser] = useState(null);
    
     db.auth().onAuthStateChanged((user) => setUser(user));
     const routing = useRoute(user);
     return (
       <Provider store={store}>
         <NavigationContainer>
      {routing}
      </NavigationContainer>
    </Provider>
    
  );
}

