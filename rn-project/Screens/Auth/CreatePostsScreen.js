import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { Camera } from "expo-camera";
import * as Location from 'expo-location';

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const CreatePostsScreen = ({navigation}) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState('');
   
    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();
        const location =  await Location.getCurrentPositionAsync();
        setPhoto(photo.uri);
    };

    const sendPhoto = () => {
        navigation.navigate('HomeScreen', {photo})
    };
    
    return (
       
        <View style={styles.container}>
            <Camera style={styles.camera} ref={setCamera} >
                {photo && <View style={styles.takePhotoContainer}>
                    <Image source={{ uri: photo }}
                    style={{ height: 240, width: 343, borderRadius: 8 }}/>
                </View>}
                <TouchableOpacity onPress={takePhoto} >
                   <MaterialCommunityIcons
                name="camera"
                size={32}
                color="rgba(245, 245, 245, 0.5)"
              />
             </TouchableOpacity>
            </Camera>
            <View >
                <Text style={styles.text}>Загрузите фото</Text>
                <View>
                    <TextInput style={styles.input}
                placeholder="Название"></TextInput>
                </View>
                 
                    
                    <TextInput style={styles.input}
                placeholder="Местность..."></TextInput>
                
                <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
                   <Text style={styles.sendLabel}>Опубликовать</Text>
             </TouchableOpacity>
            </View>
            </View>
            
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: '#fff',
        justifyContent: 'flex-start',
        marginTop: 32,
        
    // alignItems: "flex-start",
    },
    camera: {
        height: 240,
        marginTop: 32,
        justifyContent: 'center',
        // textAlign: 'center',
        alignItems: "center",
        marginHorizontal: 16,
        borderRadius: 8,
    },
    takePhotoContainer: {
        position: "absolute",
        top: 32,
        left: 16,
        borderColor: "#E8E8E8",
        borderWidth: 1,
        borderRadius: 8,
        
    },
    sendBtn: {
        marginHorizontal: 16,
        height: 51,
        backgroundColor: '#F6F6F6',
        borderEndWidth: 1,
        borderRadius: 100,
        marginTop: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendLabel: {
        color: '#BDBDBD',
        fontSize: 16,
    },
    input: {
        borderColor: 'transparent',
        borderBottomColor: '#E8E8E8',
        height: 40,
        marginTop: 42,
        borderWidth: 1,
        marginHorizontal: 16,
    },
    text: {
        marginHorizontal: 16,
        color: '#BDBDBD',
        marginTop: 8
    }

});

export default CreatePostsScreen;
