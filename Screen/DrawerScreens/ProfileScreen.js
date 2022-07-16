// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
 
// import AsyncStorage from '@react-native-community/async-storage';
 
// import Loader from './Components/Loader';

import Icon from 'react-native-vector-icons/FontAwesome';
 
const ProfileScreen = ({navigation}) => {
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

  };

  const renderContactHeader = () => {
    //const { avatar, name, bio } = this.props

    return (
      <View style={styles.headerContainer}>
        <View style={styles.userRow}>
          <Image
            style={styles.userImage}
            source={{uri: 'https://prodiproy.info/wp-content/uploads/2017/07/Prodip-Roy-Gray.png'}}
          />
          <View style={styles.userNameRow}>
            <Text style={styles.userNameText}>{'Prodip'}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{'short bio'}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{'Email: prodipmsc@gmail.com'}</Text>
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
    marginTop: 45,
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