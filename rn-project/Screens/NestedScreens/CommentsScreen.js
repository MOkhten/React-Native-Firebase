import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {collection, setDoc, doc, onSnapshot} from "firebase/firestore";
import {View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { db } from "../../firebase/config";

const CommentsScreen = ({ route }) => {
    const { postId } = route.params;
    const [comment, setComment] = useState('');
    const [allComment, setAllComment] = useState([]);
    const { login } = useSelector((state) => state.auth);
    const createPost = async() => {
        try {
      const postRef = doc(
        collection(db, "posts", postId, 'comments'),
        postId
      );
      await setDoc(postRef, {
        comment,
        login,
      });
      setComment("");
      console.log("Post created successfuly", comment);
    } catch (error) {
      console.log("error creating post:", error);
    }
  };
    const getAllPosts = async () => {
                onSnapshot(collection(db, "posts", postId, 'comments'), (data) => {
                    const allPosts = data.docs.map((doc) => ({
                        // ...doc.data(),
                      // id: doc.id,
                      id: doc.id, ...doc.data()
                    }));
                    setAllComment((prev) => [...prev, ...allPosts]);
                    // setLoading(false);
                });
  
            }
    useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
            <FlatList
        data={allComment}
        renderItem={({ item }) => (
            <View
                // key={item.id}
                style={styles.commentContainer}
            >
            <Text>{item.login}</Text>
            <Text>{item.comment}</Text>
          </View>
        )}
       keyExtractor={(item, index) => item.id + index}
                />
                </SafeAreaView>
         <View>
                <TextInput
                    style={styles.input} 
          value={comment}              
                        placeholder="Комментировать..."
                    onChangeText={setComment}>
                   
                    
                </TextInput>
                <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
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
    // alignItems: 'center',
    justifyContent: 'flex-end'
    },
    sendLabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
    // input: {
    //     padding: 16,
    //     backgroundColor: '#F6F6F6',
    //     borderRadius: 100,
    //     color: '#BDBDBD',
    //     marginBottom: 16,
    // },
    commentContainer: {
    backgroundColor: "#e1dfe2",
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 10,
    },
    input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    height: 50,
    padding: 16,
   
  },
});

export default CommentsScreen;
