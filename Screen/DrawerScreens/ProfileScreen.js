// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
  
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import { mUser }  from '../../assets/images/user.png';
import { Button, List } from 'react-native-paper';
import ScreenTitle from '../Components/ScreenTitle';
import { Avatar } from "react-native-elements";
import { get } from '../Helper/ApiCaller';


 const endPoint = Config.APP_ENDPOINT_LOCAL;


const ProfileScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [auth, setAuth] = useState('');
  const [avatar, setAvatar] = useState('');
  const [profiderId, setProviderId] = useState('');

   useEffect(()  => {
    getAuth();

  }, []);

  const getAuth = async () => {   
    
    try {
      
      const auth = await AsyncStorage.getItem('auth');
      const authJson = JSON.parse(auth);
      // console.log('getAuth22', authJson);
      setAuth(authJson);
        //  const authId = await AsyncStorage.getItem('authId')
        //  const providerId = await AsyncStorage.getItem('providerId')
        //  setProviderId(providerId);

        //  const authAvatar = await AsyncStorage.getItem('avatar')
        //  setAvatar(authAvatar);

      //     const params = {
      //       id: authId,
      //       provider_id: providerId
      //     };

        

      //     console.log('params', params);
     

      //  await get('getuser', params).then((res) => {

      //         console.log('signel user', res?.data);

      //         setAuth(res?.data?.data);

      //   }).catch(error => {
      //     console.log('get auth user from apieeee error',error)
      //   });

       
    } catch (e) {
      console.log('error1',e);
    }

  }




  const renderContactHeader = () => {
    const [expanded, setExpanded] = React.useState(true);


    const logout = () => {
      console.log('logout');
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('auth');
      AsyncStorage.removeItem('authId');
      AsyncStorage.removeItem('authName');-
      AsyncStorage.removeItem('authEmail');
      AsyncStorage.removeItem('avatar');
      navigation.replace('LoginScreen');
    }


    const editProfile = () => {
      navigation.navigate('EditProfile');
    }

    // console.log('auuth.avatar auth', auth);
    // console.log('auuth.avatar', auth?.avatar);
    // console.log('auth?.avatar?.includes("https://")', auth?.avatar?.includes("https://"));
    // console.log('`${endPoint}/${auth?.avatar}`', `${endPoint}/${auth?.avatar}`);
    // console.log('auuth.avatar name', auth.photo);
   

    return (
      <View style={styles.headerContainer}>
        <ScreenTitle title="Profile"/>
        <View style={styles.userRow}>

            <Avatar
              size={100}
              rounded 
              icon={{name: 'user', type: 'font-awesome', color:'green', size: 130, backgroundColor:'white'}}
              source={{
                uri: auth?.avatar?.includes("https://") ? auth?.avatar : `${endPoint}/${auth?.avatar}`,
                cache: 'reload'
              }}
              containerStyle={{ borderColor: 'green', borderWidth: 1, margin: 10 }}
              showEditButton = {true}
              onPress={() => console.log("Works!")}
              >
                <Avatar.Accessory size={25} onPress={() => editProfile()}/>
            </Avatar>

          <View style={styles.userNameRow}>
            <Text style={styles.userNameText}>{auth?.name}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{auth?.email}</Text>
          </View>
        </View>

        <List.Section 
        style={{backgroundColor:'#fff'}}
        >
          <List.Accordion
            title="Calender"
            style={{ width:300,backgroundColor:'#fff', borderBottomColor:'#ccc', borderBottomWidth:1}}
            >
            <List.Item title="First item" />
          </List.Accordion>

          <List.Accordion
            title="Closet"
            style={{ width:300,backgroundColor:'#fff', borderBottomColor:'#ccc', borderBottomWidth:1}}
            >
            <List.Item title="Second item" />
          </List.Accordion>

          <List.Accordion
            title="Style Stats"
            style={{ width:300,backgroundColor:'#fff', borderBottomColor:'#ccc', borderBottomWidth:1}}
            >
            <List.Item title="First item" />
          </List.Accordion>

          <List.Accordion
            title="Packing"
            style={{ width:300,backgroundColor:'#fff', borderBottomColor:'#ccc', borderBottomWidth:1}}
            >
            <List.Item title="First item" />
          </List.Accordion>

          <List.Accordion
            title="Settings"
            style={{ width:300,backgroundColor:'#fff', borderBottomColor:'#ccc', borderBottomWidth:1}}
            >
            <List.Item title="First item" />
          </List.Accordion>

          <List.Accordion
            title="Logout"
            style={{ width:300,backgroundColor:'#fff', borderBottomColor:'#ccc', borderBottomWidth:1}}
            >
            <List.Item  onPress={() => logout()} title="Logout" />
          </List.Accordion>

        </List.Section>

      </View>
    )
  }
 
  return (
    <ScrollView style={styles.scroll}>
    <View style={[styles.container]}>
      <View style={styles.cardContainer}>
        {renderContactHeader()}
      </View>
    </View>
  </ScrollView>
  );
};
export default ProfileScreen;
 
const styles = StyleSheet.create({
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
    marginTop:10,
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
    marginBottom: 2,
  },
})