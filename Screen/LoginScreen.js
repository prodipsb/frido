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
 import Config from 'react-native-config';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import Loader from './Components/Loader';

import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { get, post } from './Helper/ApiCaller';
 
const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
 
  const passwordInputRef = createRef();

 
  const handleSubmitPress = async () => {
    
  //  const endPoint = Config.APP_ENDPOINT;
    // console.log('endPoint',Config.APP_ENDPOINT);
   //  console.log('port',Config.PORT);
    setErrortext('');
    if (!userEmail) {
      setErrortext('Email required');
      return;
    }
    if (!userPassword) {
      setErrortext('Password required*');
      return;
    }
    setLoading(true);
     let dataToSend = {email: userEmail, password: userPassword};
    // let formBody = [];
    // for (let key in dataToSend) {
    //   let encodedKey = encodeURIComponent(key);
    //   let encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');
  //  console.log('formBody',`${endPoint}/api/v1/user/signin`);

    const payload = {
        email: userEmail, 
        password: userPassword
    }
    console.log("Frydo signin payload", payload)

    await post('api/v1/user/signin', payload)
            .then((response)=> {
              console.log('response return though axios post method1', response?.data?.user);

              //Hide Loader
              setLoading(false);

              if (response) {

                AsyncStorage.setItem('token', response?.data?.token);
                AsyncStorage.setItem('auth', JSON.stringify(response?.data?.user));
                navigation.replace('AuthenticatedNavigationRoutes');

              
              } else {
              
                setErrortext(response?.error);
                console.log(response?.error);
               

              }
              
    })
    .catch((err) => {
      console.log('axios return errr', response);
      //Hide Loader
      setLoading(false);
      console.error(err);
    });

 
 /*   const endPoint = Config.APP_ENDPOINT_LOCAL;
    fetch(`${endPoint}/api/v1/user/signin`, {
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
        // console.log('login auth responseJson', responseJson);
        // console.log('login auth responseJson token', responseJson.token);
        // console.log('login auth', JSON.stringify(responseJson));
        // If server response message same as Data Matched
        if (responseJson?.error) {
          setErrortext(responseJson?.error);
          console.log(responseJson?.error);
         
        } else {
          AsyncStorage.setItem('token', responseJson?.token);
          AsyncStorage.setItem('authId', responseJson?.user?._id);
          AsyncStorage.setItem('authName', responseJson?.user?.name);
          AsyncStorage.setItem('authEmail', responseJson?.user?.email);
          AsyncStorage.setItem('avatar', responseJson?.user?.avatar);
         navigation.replace('AuthenticatedNavigationRoutes');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });

      */
      
  };


  const googleSignIn = async () => {
    console.log('enter signIn');
    try {
      setLoading(true);

      GoogleSignin.configure(
        {
          //webClientId is required if you need offline access
          offlineAccess: false,
          androidClientId: '1003551906970-i25crgugmgbtgsamm79qa7vt64pqabdn.apps.googleusercontent.com',
          scopes: ['profile', 'email']
        });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google User Info --> ', userInfo);
     // this.setState({ userInfo });
      
     if(userInfo){

      const params ={
        email: userInfo.user.email,
      }

      const response = await get('getuser', params)
            .catch(err =>{console.log('err', err)});

      AsyncStorage.setItem('auth', JSON.stringify(response?.data?.data));
      setLoading(false);
      navigation.replace('AuthenticatedNavigationRoutes');

    }


    } catch (error) {
      setLoading(false);
      console.log('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };


 
  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
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
                source={require('../assets/images/frydo-logo.png')}
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

            <Icon style={styles.socialIcon} size={24} color="#009d28" name="google"  onPress={googleSignIn}/>
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
    color: '#8b9cb5',
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
