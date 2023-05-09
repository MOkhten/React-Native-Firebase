import React from "react";
import { useDispatch } from "react-redux";
import { db } from "../../firebase/config";
import { View, Text, StyleSheet, Button } from "react-native";
import { authSignOutUser } from "../../redux/auth/authOperations";

const ProfileScreen = () => {
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(authSignOutUser());
    } 
    return (
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
            <Button title='sign out' onPress={signOut} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    }
});

export default ProfileScreen;
