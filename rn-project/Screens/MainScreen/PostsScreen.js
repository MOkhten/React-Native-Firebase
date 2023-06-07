import React from "react";
import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreenPosts from "../NestedScreens/Home";
import CommentsScreen from "../NestedScreens/CommentsScreen";
import MapScreen from "../NestedScreens/MapScreen";
import {authSignOutUser} from "../../redux/auth/authOperations";
import {useDispatch} from "react-redux";
import {Pressable} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();
    const signOut = () => {
        dispatch(authSignOutUser())
    }
  return (
    <NestedScreen.Navigator  initialRouteName="HomeScreenPosts"
        >
      <NestedScreen.Screen
        name="HomeScreenPosts"
        component={HomeScreenPosts}
        options={{
                                   title: 'Posts',
                                   headerTitleAlign: 'center',
                                   headerRightContainerStyle: {
                                       paddingRight: 40,
                                   },
                                   headerRight: () => (
                                       <Pressable
                                           onPress={signOut}
                                           title="LogOut"
                                       >
                                           <MaterialCommunityIcons name="logout" size={24} color="grey"/>
                                       </Pressable>
                                   ),
                                   headerLeft: null
                               }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;