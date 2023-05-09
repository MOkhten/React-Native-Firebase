import React from "react";
import { db } from "../../firebase/config";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
            <Button title='sign out' onPress={() => db.signOut()} />
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
