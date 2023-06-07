import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {AntDesign} from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image
} from 'react-native';

import { useDispatch } from 'react-redux';

import { authSignUpUser} from '../../redux/auth/authOperations';
import { db } from "../../firebase/config";


  const initialState = {
    login: '',
    email: '',
    password: '',
    avatar: null,
  };


  export default function RegistrationScreen({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setstate] = useState(initialState);
    const [dimensions, setDimentions] = useState(Dimensions.get('window').width);
    const [fileResponse, setFileResponse] = useState(null);
    

    const dispatch = useDispatch();
    const storage = getStorage();

    const requestPermissions = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
    } catch (error) {
      console.log("error", error);
    }
    };
    
    useEffect(() => {
    requestPermissions();
  }, []);

    useEffect(() => {
      const onChange = () => {
        const width = Dimensions.get('window').width;
        setDimentions(width);
      }
      Dimensions.addEventListener('change', onChange);
      return () => {
        Dimensions.removeEventListener('change', onChange);
      }
    }, []);

    const pickImage = async () => {
    try {
      await MediaLibrary.requestPermissionsAsync();

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setstate(prev => ({ ...prev, avatar: result.assets[0].uri }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

    const uploadPhotoToServer = async () => {
    const uniquePostId = Date.now().toString();

    try {
      const response = await fetch(state.avatar);

      const file = await response.blob();

      const imageRef = ref(db, `userAvatars/${uniquePostId}`);

      await uploadBytes(imageRef, file);

      const link = await getDownloadURL(imageRef);

      return link;
    } catch (error) {
      console.log('uploadPhotoToServer', error.message);
    }
  };
    
     const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  
  const handleSubmit = async() => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    let photo;
    if (state.avatar) {
      photo = await uploadPhotoToServer();
    } else {
      photo =
        'https://firebasestorage.googleapis.com/v0/b/rn-imagelibrary.appspot.com/o/userAvatars%2F%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA%20%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202023-06-03%20%D0%BE%2015.01.32.png?alt=media&token=271ad0cf-ff14-46b4-8125-85e9aaed16f5';
    }

    dispatch(authSignUpUser(...state, photo));
    setstate(initialState);
  };
    
    
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
    
    <ImageBackground style={styles.image} source={require('../../images/photo.jpg')}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={{
           ...styles.form, paddingBottom: isShowKeyboard ? 16 : 120,
                         width: dimensions,
                 }}>
             <View style={{backgroundColor: '#fff', width: dimensions, position: 'absolute', height: 570,top: -420, left: 0, borderRadius: 25}}>
            <Text style={styles.header}>Регистрация</Text>
                <View style={styles.thumb}>
                  <TouchableOpacity style={styles.avatarPlaceholder} onPress={pickImage} >
                    <Image  source={{ uri: state.avatarUri }} style={styles.avatar}/>
                  <AntDesign
								name="pluscircleo"
								size={25}
								color="#FF6C00"
								style={{
									
									// backgroundColor: "#fff",
									borderRadius: 50,
								}}
                    />
                    </TouchableOpacity>
              {/* <MaterialIcons name="add-a-photo" size={24} color="grey"/> */}
           </View>
          <View>
              <TextInput style={styles.input}
                placeholder="Логин"
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setstate((prevState) => ({ ...prevState, login: value }))}
                value={state.login}/>
            </View>
        
            <View style={{marginTop: 16}}>
              <TextInput style={styles.input}
                placeholder="Адрес электронной почты"
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setstate((prevState) => ({ ...prevState, email: value }))}
                value={state.email}/>
          </View>
        
        
        <View style={{marginTop: 16}}>
            <TextInput style={styles.input}
                secureTextEntry={true}
                placeholder="Пароль"
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setstate((prevState) => ({ ...prevState, password: value }))}
                value={state.password}/>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btnStyle}>Зарегистрироваться</Text>
              
                </TouchableOpacity>
                
         
        
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("LoginScreen")} style={{marginTop: 16}}>
              <Text style={styles.footer}>Уже есть аккаунт? Войти</Text>
                </TouchableOpacity>
                </View>
           </View>
     </KeyboardAvoidingView>
          
      </ImageBackground>
        
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: "flex-end",
     alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginHorizontal: 16,
    height: 50,
    borderRadius: 8,
    color: "#BDBDBD",
    paddingLeft: 16,
    fontFamily: "Roboto-Reg",
    backgroundColor: "#F6F6F6",
  },

  form: {
    marginHorizontal: 16,
  },

  btn: {
      backgroundColor: "#FF6C00",
      marginHorizontal: 16,
    height: 50,
    borderRadius: 100,
    marginTop: 43,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  btnStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 16,
  },

  footer: {
     color: "#1B4371",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: "center",
    marginTop: 16
    },

  header: {
      textAlign: "center",
    fontSize: 30,
    marginBottom: 32,
    marginTop: 92,
      // marginTop:16,
    fontFamily: "Roboto-Bold",
  },
  thumb: {
		width: 120,
		height: 120,
		backgroundColor: "#F6F6F6",
		position: "absolute",
		top: -60,
		left: "50%",
		transform: [{translateX: -60}],
		borderRadius: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 10,
position: "absolute",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 10,
    position: "relative",
  }
});
