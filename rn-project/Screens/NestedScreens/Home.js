import React, { useState, useEffect } from "react";
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
  // console.log("route-params", route.params);
  
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  // console.log("posts:", posts);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ fontSize: 17, fontWeight: '500'}}>Публикации</Text>
        <TouchableOpacity onPress={handlePress} style={{marginLeft: 101, marginRight: 15}}>
          <Feather name="log-in" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <FlatList data={posts} keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => <View style={{marginBottom:10, justifyContent: 'center', alignItems: 'center'}}><Image source={{ uri: item.photo }}
                  style={{ width: 350, height: 200 }} /></View>} />
           <Button title="go to map" onPress={() => navigation.navigate("Map")} />
          <Button
              
        title="go to Comments"
              onPress={() => navigation.navigate("Comments")}
              
      />
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
