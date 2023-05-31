import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign, Octicons, Feather } from '@expo/vector-icons';

import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/Auth/PostsScreen";
import CreatePostsScreen from "./Screens/Auth/CreatePostsScreen";
// import MapScreen from "./Screens/NestedScreens/MapScreen";
// import CommentsScreen from "./Screens/NestedScreens/CommentsScreen"
import ProfileScreen from "./Screens/Auth/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab =  createBottomTabNavigator();

// const screenOptions = ({ navigation, route }) => ({
//   headerShown: true,
//   headerTintColor: styles.header.colorPrimary,
//   headerTitleAlign: styles.headerTitle.alignItems,
//   headerTitleStyle: styles.headerTitle,
//   headerTitleContainerStyle: styles.headerContainerItem,
//   headerRightContainerStyle: styles.headerContainerItem,
//   headerLeftContainerStyle: styles.headerContainerItem,
//   headerLeft: () => (
//     <Feather
//       name="arrow-left"
//       size={24}
//       color={styles.header.colorPrimary}
//       onPress={navigation.goBack}
//     />
//   ),
//   headerRight: () => (
//     <Feather
//       name="log-out"
//       size={24}
//       color={styles.header.colorSecondary}
//       onPress={navigation.goBack}
//     />
//   ),
// });

// const useRoute = isAuth => {
//   if (!isAuth) {
//     return (
//       <MainTab.Navigator
//         initialRouteName="Login"
//         screenOptions={screenOptions}
//       >
//         <MainTab.Screen
//           name="Register"
//           component={RegistrationScreen}
//           options={{
//             headerShown: false,
//           }}
//         />
//         <MainTab.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{
//             headerShown: false,
//           }}
//         />
//       </MainTab.Navigator>
//     );
//   }

//   return (
//     <MainTab.Navigator initialRouteName="Login" screenOptions={screenOptions}>
//        <MainTab.Screen
            
//             name="Posts" component={PostsScreen} options={{ headerShown: false}}
//              />
//         <MainTab.Screen
           
//          name="CreatePosts" component={CreatePostsScreen} options={{
//                     headerShown: false,
//                 }} />
//         <MainTab.Screen
            
//             name="Profile" component={ProfileScreen} options={{
//                     headerShown: false,
//                 }} />
//     </MainTab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     colorPrimary: '#212121',
//     colorSecondary: '#BDBDBD',
//   },
//   headerTitle: {
//     alignItems: 'center',
//     fontWeight: '500',
//     fontSize: 17,
//   },
//   headerContainerItem: {
//     justifyContent: 'flex-end',
//     paddingBottom: 11,
//     paddingHorizontal: 16,
//   },
// });
  const useRoute = (isAuth) => {
    if (!isAuth) {
      return (<AuthStack.Navigator>
        <AuthStack.Screen options={{
          headerShown: false,
        }} name="Login" component={LoginScreen} />
        <AuthStack.Screen options={{
          headerShown: false,
        }} name="Register" component={RegistrationScreen} />
      </AuthStack.Navigator>
      );
    }
    return <MainTab.Navigator tabBarOptions={{showLabel: false}}>
        <MainTab.Screen
            options={{ headerShown: false, tabBarIcon: ({ focused, size, color }) => (<AntDesign name="appstore-o" size={24} color="rgba(33, 33, 33, 0.8)" />) }}
            name="Posts" component={PostsScreen} />
        <MainTab.Screen
           options={{headerShown: false, tabBarIcon: ({focused, size, color}) => (<View style={{ backgroundColor: '#FF6C00', borderRadius: 50, paddingLeft: 29, paddingRight: 29, paddingBottom: 13, paddingTop: 13, }}><Octicons name="plus" size={24} color="#fff"/></View>)}}
         name="CreatePosts" component={CreatePostsScreen} />
        <MainTab.Screen
            options={{ headerShown: false, tabBarIcon: ({ focused, size, color }) => (<Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />) }}
            name="Profile" component={ProfileScreen} />
        
      </MainTab.Navigator>
};
  
export default useRoute;