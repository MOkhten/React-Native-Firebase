import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './Screens/Auth/RegistrationScreen';
import LoginScreen from "./Screens/Auth/LoginScreen";
import PostsScreen from "./Screens/MainScreen/PostsScreen";
// import CreatePostsScreen from "./Screens/MainScreen/CreatePostsScreen";
import MapScreen from "./Screens/NestedScreens/MapScreen";
import CommentsScreen from "./Screens/NestedScreens/CommentsScreen"
// import ProfileScreen from "./Screens/MainScreen/ProfileScreen";

const MainTab =  createStackNavigator();


  const useRoute = (isAuth) => {
    if (!isAuth) {
      return (
        <MainTab.Navigator initialRouteName="LoginScreen">
            <MainTab.Screen name="RegistrationScreen"
                              component={RegistrationScreen} options={{
                headerShown: false,
            }}/>
            <MainTab.Screen name="LoginScreen"
                              component={LoginScreen} options={{
                headerShown: false,
            }}/>
        </MainTab.Navigator>
      );
    }
    return (
      <MainTab.Navigator initialRouteName="PostsScreen"
        screenOptions={{
          tabBarShowLabel: false,
        }}>
        <MainTab.Screen name="PostsScreen"
          component={PostsScreen} options={{
            headerShown: false,
          }} />
        <MainTab.Screen name="MapScreen"
          component={MapScreen} options={{
            headerShown: false,
          }} />
        <MainTab.Screen name="CommentsScreen"
          component={CommentsScreen} options={{
            headerShown: false,
          }}
           />
        
      </MainTab.Navigator>
    );
};
  
export default useRoute;