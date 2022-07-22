// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
  
// import Loader from './Components/Loader';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
 import ScreenTitle from './../Components/ScreenTitle';
 import {ListItem, Avatar } from "react-native-elements";
 import { Button, List } from 'react-native-paper';





const ProfileScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [auth, setAuth] = useState('');

   // load the data
   useEffect(()  => {
    getData();
    //const storedValue = await AsyncStorage.getItem("auth");
   // console.log('storedValue',storedValue);
   // setAuth({storedValue})
  }, []);

  const getData = async () => {

    try {
        const value = await AsyncStorage.getItem('auth')
        if (value !== null) {
            setAuth(JSON.parse(value))
        }
    } catch (e) {
        // error reading value
    }
}

console.log('auth',auth.user);
  
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

  };

  // const list = [
  //   {
  //     title: 'Appointments',
  //     icon: 'av-timer'
  //   },
  //   {
  //     title: 'Trips',
  //     icon: 'flight-takeoff'
  //   },
  // ]

  const renderContactHeader = () => {
    const [expanded, setExpanded] = React.useState(true);
    //const { avatar, name, bio } = this.props
    const handlePress = () => setExpanded(!expanded);


    const logout = () => {
      console.log('logout');
      AsyncStorage.removeItem('auth');
      navigation.replace('LoginScreen');
    }


    const editProfile = () => {
      navigation.navigate('EditProfile');
    }

    return (
      <View style={styles.headerContainer}>
        <ScreenTitle title="Profile"/>
        <View style={styles.userRow}>

        {/* <Avatar
          size={100}
          rounded 
          icon={{name: 'user', type: 'font-awesome'}}
          source={{
            uri:
            auth?.user?.avatar ? auth?.user?.avatar : null
          }}
          >
          <Avatar.Accessory />
        </Avatar> */}
        <Button onPress={editProfile}>Edit</Button>
        <Avatar
         size={'large'}
         rounded 
         icon={{name: 'user', type: 'font-awesome', color:'green', size: 80, backgroundColor:'white'}}
          source={{
            uri:
            auth?.user?.avatar ? auth?.user?.avatar : '../../assets/images/user.png'
          }}
          containerStyle={{ backgroundColor: 'white' }}
          showEditButton = {true}
          onPress={() => console.log("Works!")}
          
          >
          <Avatar.Accessory size={23} />
          {/* <Avatar.Accessory onEditPress={ console.log('click on edit') } /> */}
        </Avatar>

          <View style={styles.userNameRow}>
            <Text style={styles.userNameText}>{auth?.user?.name}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{auth?.user?.email}</Text>
          </View>
        </View>
        <View style={styles.socialRow}>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#3B5A98"
              name="facebook-square"
              onPress={() => console.log('facebook')}
            />
          </View>
          <View style={styles.socialIcon}>
            <Icon
              size={30}
              type="entypo"
              color="#56ACEE"
              name="twitter-square"
              onPress={() => console.log('twitter')}
            />
          </View>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#DD4C39"
              name="google-plus-square"
              onPress={() => console.log('google')}
            />
          </View>
        </View>

        {/* <View>
        {
          list.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))
        }
      </View> */}

        <List.Section 
        style={{backgroundColor:'#fff'}}
        >
          <List.Accordion
            title="Calender"
            style={{ width:300,backgroundColor:'#fff', borderBottomColor:'#ccc', borderBottomWidth:1}}
            >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>

          <List.Accordion
            title="Closet"
            style={{ width:300,backgroundColor:'#fff', borderBottomColor:'#ccc', borderBottomWidth:1}}
            >
            <List.Item title="First1111 item" />
            <List.Item title="Second item" />
          </List.Accordion>

          <List.Accordion
            title="Style Stats"
            style={{ width:300,backgroundColor:'#fff', borderBottomColor:'#ccc', borderBottomWidth:1}}
            >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>

          <List.Accordion
            title="Packing"
            style={{ width:300,backgroundColor:'#fff', borderBottomColor:'#ccc', borderBottomWidth:1}}
            >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>

          <List.Accordion
            title="Settings"
            style={{ width:300,backgroundColor:'#fff', borderBottomColor:'#ccc', borderBottomWidth:1}}
            >
            <List.Item title="First item" />
            <List.Item title="Second item" />
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