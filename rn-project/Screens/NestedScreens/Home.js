import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { onSnapshot, collection, query, getDocs } from "firebase/firestore";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import {Ionicons} from '@expo/vector-icons';

const HorizontalLine = ({}) => {
  return <View style={styles.line}></View>;
};



export default function HomeScreenPosts({ navigation, route }) {
  const handlePress = () => {
    navigation.navigate("Login");
  };
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const q = await query(collection(db, "posts"));
    const posts = await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((post) => {
        setPosts((prevState) => [
          ...prevState,
          { id: post.id, ...post.data() },
        ]);
      });
    });
  };
  
  useEffect(() => {
    getAllPosts();
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ fontSize: 17, fontWeight: '500'}}>Публикации</Text>
        <TouchableOpacity onPress={handlePress} style={{marginLeft: 101, marginRight: 15}}>
          <Feather name="log-in" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <FlatList data={posts} keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: item.photo }}
            style={{ width: 350, height: 200 }} />
          <View style={styles.text}>
            <Text >{ item.comment}</Text>
          </View>
          <View style={styles.locationCommentContainer}>
            <Pressable  title={"Comments"}
                                             onPress={() => navigation.navigate("Comments", {
                                                 id: item.id,
                                                 header: item.headers.name,
                                                 photo: item.photo,
                                                 place: item.headers.place,
                                                 location: item.location,
                                             })}>
              <View style={styles.commentContainer}>
                <Text style={{color: 'grey'}}>
                                          <Ionicons name="chatbubble-outline" size={24} color="#BDBDBD"/>
                                          {item.commentsCount ?? 0}
                                      </Text>
              </View>
                                      
                                  </Pressable>
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
    alignItems: 'baseline',
  },
});
