import React from "react";
// import { moduleName } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenPosts from "../NestedScreens/Home";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
// import CommentsScreen from "../NestedScreens/CommentsScreen";
// import MapScreen from "../NestedScreens/MapScreen";
import { View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
// import {authSignOutUser} from "../../redux/auth/authOperations";
// import {useDispatch} from "react-redux";
// import {Pressable} from "react-native";
// import {MaterialCommunityIcons} from '@expo/vector-icons';

const NestedScreen = createBottomTabNavigator();

const PostsScreen = () => {
  // const dispatch = useDispatch();
  //   const signOut = () => {
  //       dispatch(authSignOutUser())
  //   }
  return (
    <NestedScreen.Navigator initialRouteName="HomeScreenPosts"
      screenOptions={{
        tabBarShowLabel: false,
      }}
        >
      <NestedScreen.Screen
        name="HomeScreenPosts"
        component={HomeScreenPosts}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={24} color="grey" />
          ),
        }}
      />
      <NestedScreen.Screen options={{
          title: "Create post",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={{ backgroundColor: "#FF6C00", borderRadius: 100, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5 }}>
                <Ionicons name="add-sharp" size={24} color="white" />
            </View>
          ),
        }}
        name={"CreatePostsScreen"}
        component={CreatePostsScreen} />
      <NestedScreen.Screen  options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
           
              <AntDesign name="user" size={24} color="grey" />
          ),
        }}
        name={"ProfileScreen"}
        component={ProfileScreen}/>
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;