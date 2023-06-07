import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {useSelector} from "react-redux";
import { onSnapshot, collection, query, getDocs } from "firebase/firestore";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons, EvilIcons } from "@expo/vector-icons";

const HorizontalLine = ({}) => {
  return <View style={styles.line}></View>;
};



export default function HomeScreenPosts({ navigation, route }) {
  const {login} = useSelector(state => state.auth);
  const { avatar } = useSelector(state => state.auth);
  const {email} = useSelector(state => state.auth);
  const handlePress = () => {
    navigation.navigate("Login");
  };
  const [posts, setPosts] = useState([]);
  //  let uniquePostId = '';
  //   if (route.params) {
  //       uniquePostId = route.params.uniquePostId;
  //   }


  // const getAllPosts = async () => {
  //   const q = await query(collection(db, "posts"));
  //   const posts = await onSnapshot(q, (querySnapshot) => {
  //     querySnapshot.forEach((post) => {
  //       setPosts((prevState) => [
  //         ...prevState,
  //         { id: post.id, ...post.data() },
  //       ]);
  //     });
  //   });
  // };
  
const getAllPosts = async () => {
    // setLoad(true);
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        setPosts((prevState) => [...prevState, { id: doc.id, ...doc.data() }]);
      });
      // setLoad(false);
    } catch (error) {
      // setLoad(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  if (posts.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Ще ніхто не зробив фотознімки</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.content}> */}
        
       <View style={styles.postsOwnerSection}>
                <Image style={styles.avatarImg} source={{uri: avatar}}/>
                <View style={styles.postsProfileText}>
          <Text>{login}</Text>
          <Text>{email}</Text>
                </View>
        <TouchableOpacity onPress={handlePress} style={{marginLeft: 101, marginRight: 15}}>
          {/* <Feather name="login" size={24} color="#BDBDBD" /> */}
        </TouchableOpacity>
      </View>
      <FlatList data={posts} keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => <View style={{ marginBottom: 34,  }}>
          <Image source={{ uri: item.photo }}
            style={{ width: 350, height: 200, borderRadius: 10, }} />
          <View style={styles.text}>
            <Text >{ item.comment}</Text>
          </View>
          {/* <View style={styles.locationCommentContainer}> */}
            <View style={styles.commentContainer}>
            <Pressable  title={"Comments"}
                                             onPress={() => navigation.navigate("Comments", {
                                                 postId: item.id,
                                                //  header: item.headers.name,
                                                //  photo: item.photo,
                                                //  place: item.headers.place,
                                                 location: item.location,
                                             })}>
               <View style={styles.commentContainer}>
                              <Ionicons style={styles.commentLogo} name="chatbubble-outline" size={24} color="#BDBDBD"/>
                              <Text style={styles.commentAmount}>
                                {item.comments}
                              </Text>
                            </View>
               
                </Pressable>
              {/* </View> */}
                                      
                                  
                      <View style={styles.location}>          
                    <Pressable title={"Map"}
            onPress={() => navigation.navigate("Map", {
           location: item.location,
              })}>
           <Ionicons name="location-outline" size={24} color="#BDBDBD"/>
                                          
              </Pressable>
              </View>          
          </View>
          
        </View>} />
           
      <HorizontalLine />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 11,
    paddingTop: 11,
    fontSize: 17,
  },
  line: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: "100%",
  },
  text: {
    display: 'flex',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    fontSize: 16,
    marginBottom: 11,
  },
  locationCommentContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 8,
  },
  commentContainer: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'flex-start',
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentLogo: {
    marginRight: 6,
  },
  commentAmount: {
    fontSize: 16,
    color: "#BDBDBD",
  },
});
