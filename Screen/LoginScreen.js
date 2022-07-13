// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
 
// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

// import { FaBeer } from 'react-icons/fa';
// import { FaCalendarAlt } from "react-icons/fa";
 
// import AsyncStorage from '@react-native-community/async-storage';
 
// import Loader from './Components/Loader';

import Icon from 'react-native-vector-icons/FontAwesome';
 
const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
 
  const passwordInputRef = createRef();
 
  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Email required*');
      return;
    }
    if (!userPassword) {
      alert('Password required*');
      return;
    }
  //  setLoading(true);
    let dataToSend = {email: userEmail, password: userPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log('formBody',formBody);
 
    fetch('http://10.0.2.2:3000/api/v1/user/signin', {
      method: 'POST',
      body:JSON.stringify(dataToSend),
      // headers: {
      //   //Header Defination
      //   'Content-Type':
      //   'application/x-www-form-urlencoded;charset=UTF-8',
      // },
      headers: {
        'Content-Type': 'application/json'
      },
      
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log('login ress', responseJson);
        // If server response message same as Data Matched
        if (responseJson) {
          // AsyncStorage.setItem('user_id', responseJson.data.email);
         // console.log(responseJson.data.email);
           navigation.replace('DrawerNavigationRoutes');
        } else {
          setErrortext(responseJson.msg);
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
 
  return (
    <View style={styles.mainBody}>
      {/* <Loader loading={loading} /> */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../Image/frido.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>SIGN IN</Text>
            </TouchableOpacity>

            <Text style={styles.signInAlt}>Or Sign In With</Text>

            <View style={styles.socialLogin}>

            <Icon style={styles.socialIcon} size={24} color="#009d28" name="google" />
            <Icon style={styles.socialIcon} size={24} color="#009d28" name="twitter" />
            <Icon style={styles.socialIcon} size={24} color="#009d28" name="instagram" />

            </View>

            <Text style={styles.register}>
              Don't have an account?  
              <Text
              style={styles.registerTextStyle}
               onPress={() => navigation.navigate('RegisterScreen')}
              >
              Sign Up
            </Text>
            </Text>
            
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;
 
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#009d28',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#009d28',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#7DE24E',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  register: {
    alignSelf: 'center',
    marginTop: 20,
  },
  registerTextStyle: {
    color: '#009d28',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  signInAlt: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    alignSelf: 'center',
    padding: 10,
  },
  socialLogin : {
    flexDirection: 'row',
    textAlign: 'center',
    alignSelf: 'center',
  },
  socialIcon: {
      borderRadius:5,
      borderWidth: 1,
      borderColor: 'rgb(170, 207, 202)',
      padding: 10,
      margin: 5,
  }
});
