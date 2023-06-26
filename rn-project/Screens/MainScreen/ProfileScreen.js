import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { collection, where, getDocs, query } from "firebase/firestore";
import { authSignOutUser } from "../../redux/auth/authOperations";

const ProfileScreen = ({navigation, route}) => {
    const { userId } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
   const [deletedPost, setDeletedPost] = useState('');
    const [makePhoto, setMakePhoto] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);

  const dispatch = useDispatch();
  
  const storage = getStorage();

    // useEffect(() => {
    // getUserPosts();
    // }, []);
  
  const userPostsRef = query(collection(db, "posts"), where("userId", "==", userId));

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

  useEffect(() => {

        getAllPosts();

    }, [deletedPost])

    const toggleMakePhoto = () => {
        if (!makePhoto) {
            setMakePhoto('camera')
        }
        if (makePhoto === 'camera' || makePhoto === 'user') {
            setMakePhoto(null)
        }
    }

    const getAllPosts = async () => {
        const querySnapshot = await getDocs(userPostsRef);
        const allPosts = querySnapshot.docs.map((post) => ({
            ...post.data(), id: post.id
        }));

        const sortedPosts = allPosts.sort(
            (firstContact, secondContact) =>
                secondContact.id - firstContact.id);
        setPosts(sortedPosts);
    }


    const deletePost = async (postId) => {
        await deleteDoc(doc(db, "posts", postId));
        setDeletedPost(postId);
    }


    const uploadAvatar = async () => {

        if (avatarUrl) {
            const response = await fetch(`${avatarUrl}`)
            const file = await response.blob();
            const uniquePostId = Date.now().toString()

            const imageRef = await ref(storage, `avatars/${uniquePostId}`)
            await uploadBytes(imageRef, file);
            const newAvatar = await getDownloadURL(imageRef);

            dispatch(profileUpdateAvatar({avatar: newAvatar}));

            setAvatarUrl(null);
            setMakePhoto(null);
        }
    }

    const takePicture = async () => {
        if (cameraRef) {
            const {uri} = await cameraRef.takePictureAsync();
            setAvatarUrl(uri);
            setMakePhoto('user')
            await MediaLibrary.createAssetAsync(uri);
        }
    }

    const goToMap = (location) => {
        navigation.navigate("Map", {
            location: location,
        })
    }

    const goToComments = (item) => (
        navigation.navigate("Comments", {
            id: item.id,
            header: item.headers.name,
            photo: item.photo,
            place: item.headers.place,
            location: item.location,
        })
    )
    
    // const getUserPosts = async() => {
    //      try {
    //   const querySnapshot = await getDocs(
    //     query(collection(db, "posts"), where("userId", "==", userId))
    //   );
    //   if (querySnapshot.empty) {
    //     console.log("No user posts found");
    //     return;
    //   }
    //   const posts = querySnapshot.docs.map((doc) => doc.data());
    //   setUserPosts(posts);
    // } catch (error) {
    //   console.error("Error fetching user posts: ", error);
    // }
    // }
    

    const signOut = () => {
        dispatch(authSignOutUser());
    } 
    return (
        <View style={styles.container}>
          <ImageBackground
        source={require("../../images/photo.jpg")}
        resizeMode="cover"
        style={styles.image}
        >
           <View style={styles.avatarPlace}>
                            {!makePhoto &&
                                <Image style={styles.avatarImage}
                                       source={{uri: avatar}}/>
                            }
                            {makePhoto === 'camera' &&
                                <Camera
                                    style={styles.avatarImage}
                                    type={type}
                                    ref={(ref) => {
                                        setCameraRef(ref);
                                    }}
                                >

                                    <View style={styles.makePhotoButton}>
                                        {makePhoto === 'camera' &&
                                            <Pressable
                                                onPress={takePicture}
                                                title="TakePicture"
                                            >
                                                <MaterialIcons name="add-a-photo" size={24} color="grey"/>
                                            </Pressable>
                                        }
                                    </View>

                                </Camera>
                            }
                            {makePhoto === 'user' &&
                                <View>
                                    <Image style={styles.avatarImage} source={{uri: avatarUrl}}/>
                                    <Pressable
                                        style={styles.makePhotoButton}
                                        onPress={uploadAvatar}
                                        title="UploadPicture"
                                    >
                                        <MaterialCommunityIcons name="cloud-upload" size={24} color="grey"/>
                                    </Pressable>
                                </View>
                            }
                        </View>

        <TouchableOpacity style={styles.btnPress} onPress={signOut}>
          <Text style={{ color: `#fff` }}>Log out</Text>
        </TouchableOpacity>
        {userPosts.length > 0 ? (
          <FlatList
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <Image
                  source={{ uri: item.photo }}
                  style={{
                    width: 350,
                    height: 250,
                    borderRadius: 10,
                  }}
                />
                <Text>{item.comment}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No posts found</Text>
        )}
      </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    
    },
    image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  btnPress: {
    marginTop: 60,
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "#FF6C00",
    width: 200,
    color: "#ffffff",
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
