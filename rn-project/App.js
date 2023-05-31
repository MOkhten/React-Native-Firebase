// import React from "react";
// import { Provider} from "react-redux";
// import { store } from "./redux/store";
// import Main from "./components/Main";

//    export default function App() {
  import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
   'Roboto-Reg': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

     return (
       <Provider store={store}>
       <Main/>
    </Provider>
    
  );
}

