import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {collection, doc, query, setDoc, getDocs, updateDoc, deleteDoc} from "firebase/firestore";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { db } from "../../firebase/config";

const CommentsScreen = ({ route }) => {
    const { postId } = route.params;
    const [comment, setComment] = useState('');
    const { login } = useSelector((state) => state.auth);
    const createPost = async() => {
        const uniqueCommentId = Date.now().toString()

        await setDoc(doc(db, 'posts', postId, 'comments', uniqueCommentId), {
            comment,
            login,
            // userId,
        });
        // setCommentId(uniqueCommentId);
        // setComment(null)
    }
    return (
        <View style={styles.container}>
         <View>
                    <TextInput style={styles.input} 
                        
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
    input: {
        padding: 16,
        backgroundColor: '#F6F6F6',
        borderRadius: 100,
        color: '#BDBDBD',
        marginBottom: 16,
    }
});

export default CommentsScreen;
