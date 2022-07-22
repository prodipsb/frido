// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Config from 'react-native-config';
 
import Loader from './Components/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
 
const endPoint = Config.APP_ENDPOINT;

const RegisterScreen = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);
 
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
 
  const handleSubmitButton = () => {
    setErrortext('');

    if (!userEmail) {
      setErrortext('Email required*');
      return;
    }
    if (!userPassword) {
      setErrortext('Password required*');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      email: userEmail,
      password: userPassword,
    };

    console.log('dataToSend',dataToSend);
 
   // return false;
    // var formBody = [];
    // for (var key in dataToSend) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');
    // console.log('formBody',formBody);
 
    fetch(`${endPoint}/api/v1/user/signup`, {
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
        console.log('responseJson', responseJson);
     //   return false;
        // If server response message same as Data Matched
        if (responseJson) {
          setIsRegistraionSuccess(true);
          console.log(
            'Registration Successful. Please Login to proceed'
          );
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };


  const signIn = async () => {
    console.log('enter signIn');
    try {
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

       //Show Loader
      setLoading(true);

      const userData = {
        name: userInfo.user.name,
        email: userInfo.user.email,
        provider: 'google',
        provider_id: userInfo.user.id,
        avatar: userInfo.user.photo,
      }

      console.log('userData', userData);
   
     fetch(`${endPoint}/api/v1/user/signup`, {
      method: 'POST',
      body:JSON.stringify(userData),
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
        console.log('responseJson', responseJson);
        // If server response message same as Data Matched
        if (responseJson) {

           //Hide Loader
          setLoading(false);

          setIsRegistraionSuccess(true);
          console.log(
            'Registration Successful. Please Login to proceed'
          );
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });

    }


    } catch (error) {
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



  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/images/success.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
       
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
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
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Confirm Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
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
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>SIGN UP</Text>
          </TouchableOpacity>

          <Text style={styles.signInAlt}>Or Sign Up With</Text>

          <View style={styles.socialLogin}>
          {/* <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
            /> */}
              <Icon style={styles.socialIcon} size={24} color="#009d28" name="google" onPress={signIn}/>
              <Icon style={styles.socialIcon} size={24} color="#009d28" name="twitter" />
              <Icon style={styles.socialIcon} size={24} color="#009d28" name="instagram" />

          </View>

          <Text style={styles.register}>
              Already an account?  
              <Text
              style={styles.registerTextStyle}
               onPress={() => props.navigation.navigate('LoginScreen')}
              >
              Sign In
            </Text>
            </Text>

        </KeyboardAvoidingView>
      </ScrollView>
      
    </View>
  );
};
export default RegisterScreen;
 
const styles = StyleSheet.create({
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
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
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
    borderColor: '#009d28s',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: '#8b9cb5',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
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
  },
  register: {
    color: '#8b9cb5',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  registerTextStyle: {
    color: '#009d28',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
});
