import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { onSnapshot, collection, query, getDocs } from "firebase/firestore";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button } from "react-native";
import { Feather } from "@expo/vector-icons";

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
          <View>
            <Text>{ item.comment}</Text>
          </View>
          <View>
            <Button title="go to map" onPress={() => navigation.navigate("Map", {location: item.location})} />
          <Button
              
        title="go to Comments"
              onPress={() => navigation.navigate("Comments")}
              
      />
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
    alignItems: "flex-end",
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
});
