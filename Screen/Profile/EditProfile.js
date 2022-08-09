// Import React and Component
import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
  Image,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableHighlight,
} from 'react-native';

import Config from 'react-native-config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import  ImagePicker from 'react-native-image-picker';
import * as ImagePicker from "react-native-image-picker"
//import {launchImageLibrary} from 'react-native-image-picker';
import ScreenTitle from './../Components/ScreenTitle';
import { Avatar } from "react-native-elements";

import { get, post, upload } from '../Helper/ApiCaller';

import Loader from '../Components/Loader';


const endPoint = Config.APP_ENDPOINT_LOCAL;

const EditProfile = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [token, setToken] = useState('');
  const [auth, setAuth] = useState({
    name: '',
    email: '',
    avatar: '',
    about: '',
  });

 
   useEffect(()  => {
      getAuth();
   }, []);

  const getAuth = async () => {   

    try {
        const authId = await AsyncStorage.getItem('authId')
       
        if (authId !== null) {

          const params = {
            id: authId,
          };
     

       const response =  await get(`getuser`, params).then((res) => {

              setAuth(res?.data?.data);

        }).catch(error => {
          console.log('get auth user from apieeee error',error)
        });

          
        //  await fetch(`${endPoint}/getuser?id=${authId}`, {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     //  'Authorization': `Token ${authParse.token}`
        //     },
        //   //  params: params,
        //  }).then(response => response.json())
        //  .then(responseJson => {
        //     console.log('get auth user from apieeee',responseJson);
        //     setAuth(responseJson?.data);
        //  }).catch(error => {
        //     console.log('get auth user from apieeee error',error);
        //  });

       
        }
    } catch (e) {
      // error reading value
      console.log('error1',e);
    }
  }

// console.log('auth1',auth);
  
  const handleSubmitPress = async () => {
    console.log('handleSubmitPress');
    setErrortext('');
    if (!auth?.email) {
      alert('Email required*');
      return;
    }

    const data={
      id: auth?._id,
      name: auth?.name,
      email: auth?.email,
      about: auth?.about,
    }

     console.log('submitted formdata',data);

    const response =  await post('updateuser', data).then((res) => {

          console.log('res dipp',res);
          navigation.replace('ProfileScreen');
              
        }).catch(err => console.log(err))


    };
   

  


  const renderEditProfile = () => {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);



    const handleUploadPhoto = async () => {
      console.log('handleUploadPhoto');

      ImagePicker.launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
        },
        async (response) => {
          const photoAsset = Object.assign({}, ...response?.assets)
          setAuth({...auth, avatar: photoAsset});

          let formdata = new FormData();
          formdata.append('id', auth?._id);
          formdata.append('fileData', {
            uri : photoAsset?.uri,
            type: photoAsset?.type,
            name: photoAsset?.fileName
           });
      
           console.log('submitted formdata',formdata);
      
          const getUploaded = await upload('upload', formdata);
          console.log('getUploaded', getUploaded);
      
          //  fetch(`${endPoint}/` + "upload",{
          //     method: 'post',
          //     headers: {
          //       'Accept': 'application/json',
          //       'Content-Type': 'multipart/form-data',
          //       },
          //     body: formdata
          //     }).then(response => {
          //         console.log("success ppppp", response)
          //       //  navigation.replace('ProfileScreen');
          //     }).catch(err => {
          //         console.log(err)
          //     });



        },
      )

    }

   // console.log('auth object change',auth);
    // auth = JSON.parse(auth);
    // console.log('auth object change uri', auth.uri);

    return (
      <View>
        <ScreenTitle title="Edit Profile"/>

        {/* <TouchableHighlight >
            <Button onPress={() => handleUploadPhoto()} title="Select Photo" />
        </TouchableHighlight> */}


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
            <View style={{alignItems: 'center', marginBottom:20}}>
            <Avatar
            size={120}
            rounded 
            icon={{name: 'user', type: 'font-awesome', color:'green', size: 130, backgroundColor:'white'}}
              source={{
                uri: 
                   auth?.avatar?.uri ? auth?.avatar?.uri :  auth?.avatar ? `${endPoint}/${auth?.avatar}` : '../../assets/images/user.png',
              }}
              containerStyle={{ backgroundColor: 'white' }}
              showEditButton = {true}
              onPress={() => console.log("Works!")}
              
              >
              <Avatar.Accessory size={35} onPress={() => handleUploadPhoto()}/>
            </Avatar>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserName) =>
                 // setUserName(UserName)
                 setAuth({...auth, name: UserName})
                }
                placeholder="Name" 
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                value={auth?.name}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                 // setUserEmail(UserEmail)
                 setAuth({...auth, email: UserEmail})
                }
                placeholder="Email"
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
                value={auth?.email}
              />
            </View>
            <View style={styles.SectionStyle}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              multiline={true}
              numberOfLines={4}
              placeholder="Bio"
              placeholderTextColor="#8b9cb5"
              onChangeText={(UserBio) =>
                //setUserBio(UserBio)
                setAuth({...auth, about: UserBio})
              }
              value={auth?.about}/>
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
              <Text style={styles.buttonTextStyle}>SAVE</Text>
            </TouchableOpacity>
            
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>



      </View>
    )
  }
 
  return (
    <ScrollView style={styles.scroll}>
    <View style={[styles.container]}>
      <View style={styles.cardContainer}>
        {renderEditProfile()}
      </View>
    </View>
  </ScrollView>
  );

}

export default EditProfile;
 
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
    marginTop: 60,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 7,
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
  textArea: {
    flex: 1,
    color: '#7DE24E',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    height: 80,
    justifyContent: "flex-start"
  },
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 10,
  },
  indicatorTab: {
    backgroundColor: 'transparent',
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
  },
  tabBar: {
    backgroundColor: '#EEE',
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
  },
  tabLabelNumber: {
    color: 'gray',
    fontSize: 12.5,
    textAlign: 'center',
  },
  tabLabelText: {
    color: 'black',
    fontSize: 22.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userBioText: {
    color: 'gray',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: '#5B5A5A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
  },
})