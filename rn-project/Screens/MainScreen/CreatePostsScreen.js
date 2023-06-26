import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import * as Location from "expo-location";
import { db, storage } from "../../firebase/config";
import { collection, doc, setDoc, addDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const CreatePostsScreen = ({navigation}) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [comment, setComment] = useState('');
    const [location, setLocation] = useState(null);

    const { userId, login } = useSelector((state)=>state.auth);

    useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    }, []);
    
    const requestPermissions = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      console.log("status lib", status);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);
   
    const takePhoto = async () => {
        const {uri} = await camera.takePictureAsync();
        setPhoto(uri);
    };

    const sendPhoto = () => {
        uploadPostToServer();
        navigation.navigate('HomeScreenPosts', {photo})
    };

    const uploadPostToServer = async () => {
        // const photo = await uploadPhotoToServer();
        // const createPost = collection(db, "posts");
        // await setDoc(doc(createPost), {
        //     photo: photo,
        //     comment,
        //     location: location,
        //     login,
        //     userId,
        // });
    try {
      const uploadPhoto = await uploadPhotoToServer();

      const collectionRef = doc(collection(db, "posts"));

      await setDoc(collectionRef, {
        photo: uploadPhoto,
        location,
        comment,
        // comments: 0,
        userId,
        login,
        // timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log("upload post", error);
    }
    }

    const uploadPhotoToServer = async () => {
        const responce = await fetch(photo);
        const file = await responce.blob();

        const unoquePostId = Date.now().toString();
        const data = ref(storage, `postImage/${unoquePostId}`);
        await uploadBytes(data, file);

        const proseededPhoto = await getDownloadURL(data);
        return proseededPhoto;
        
    }
    
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
                        
                        placeholder="Название"
                    onChangeText={setComment}></TextInput>
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
