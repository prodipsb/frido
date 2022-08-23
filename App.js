/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
// import type {Node} from 'react';
// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ToastAndroid,
  Button,
  BackHandler
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Config from 'react-native-config';

import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './Screen/LoginScreen';
import SplashScreen from './Screen/SplashScreen';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import HomeScreen from './Screen/DrawerScreens/HomeScreen';
import AuthenticatedNavigationRoutes from './Screen/AuthenticatedNavigationRoutes';
import ProfileScreen from './Screen/DrawerScreens/ProfileScreen';
import { HeaderBackButton } from '@react-navigation/elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfile from './Screen/Profile/EditProfile';
import StyleStatsScreen from './Screen/StackScreens/StyleStatScreen';
import StyleStatScreen from './Screen/StackScreens/StyleStatScreen';
import ColorStatScreen from './Screen/StackScreens/ColorStatScreen';
import { Avatar } from 'react-native-elements';
import StoreCombineItems from './Screen/StackScreens/StoreCombineItems';

const Stack = createStackNavigator();


const endPoint = Config.APP_ENDPOINT_LOCAL;

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    return null;
  }
  return null;
};

const App = () => {

  const [auth, setAuth] = useState(null);
  const [visibleToast, setvisibleToast] = useState(false);

  useEffect(() => {
    getAuth()
  }, []);


  const getAuth = async () => {
    const auth = await AsyncStorage.getItem('auth');
    const authJson = JSON.parse(auth);
    setAuth(authJson);
  }

  const handleButtonPress = () => {
    console.log('Button Pressed');
    setvisibleToast(true);
  };

  return (
    <NavigationContainer>
    <Stack.Navigator 
    initialRouteName="SplashScreen"
    >
    <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />


       {/* Auth Navigator: Include Login and Signup */}
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      </Stack.Group>

      {/* Navigation Authenticated Home as a landing page */}
      <Stack.Screen
          name="AuthenticatedNavigationRoutes"
          component={AuthenticatedNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={({navigation})=>({
            headerLeft: () => (
              <HeaderBackButton
                  labelVisible={false}
                  tintColor={'#009d28'}
                  onPress={() => navigation.canGoBack() ? navigation.goBack() : BackHandler.exitApp()}
              />
             ),
            headerTitle: (props) => ( // App Logo
              <Image
                style={{ flex:1, width: 230, height: 40, resizeMode: 'contain' }}
                source={require('./assets/images/frydo-logo.png')}
                resizeMode='contain'
              />
            ),
            headerTitleStyle: { flex: 1, textAlign: 'center'},
            headerRight: () => (
              <Avatar
                rounded
                icon={{name: 'user', color: '#009d28', size:35, type: 'font-awesome'}}
                source={{
                  uri: auth?.avatar?.uri ? auth?.avatar?.uri : auth?.avatar?.includes("https://")? auth?.avatar : `${endPoint}/${auth?.avatar}`,
                  cache: 'reload'
                }}
                onPress={() => navigation.navigate('ProfileScreen')}
                activeOpacity={0.7}
                containerStyle={{ borderColor: '#009d28', color:'#009d28', marginRight: 10, borderStyle: 'solid', borderWidth: 1}}
              />
             ),
          })}
        />

      {/* <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        /> */}

        {/* <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />    */}

        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
         // options={{headerShown: true}}
         options={({navigation})=>({
            headerLeft: () => (
              <HeaderBackButton
                  labelVisible={false}
                  tintColor={'#009d28'}
                  onPress={() => navigation.goBack()}
              />
             ),
            headerTitle: (props) => ( // App Logo
              <Image
                style={{ flex:1, width: 230, height: 40, resizeMode: 'contain' }}
                source={require('./assets/images/frydo-logo.png')}
                resizeMode='contain'
              />
            ),
           // headerTitleStyle: { flex: 1, textAlign: 'center'},
            headerRight: () => (
              <View style={{ backgroundColor:'#009d28', paddingLeft:5, borderTopLeftRadius:10, borderBottomLeftRadius:10}}>
              <MaterialCommunityIcons style={{paddingRight:15}}  onPress={() => navigation.navigate('AuthenticatedNavigationRoutes')} name="home-outline" color="#fff" size={26} />
              </View>
             ),
          })}
        />   

      <Stack.Screen
          name="EditProfile"
          component={EditProfile}
         // options={{headerShown: true}}
         options={({navigation})=>({
            headerLeft: () => (
              <HeaderBackButton
                  labelVisible={false}
                  tintColor={'#009d28'}
                  onPress={() => navigation.goBack()}
              />
             ),
            headerTitle: (props) => ( // App Logo
              <Image
                style={{ flex:1, width: 230, height: 40, resizeMode: 'contain' }}
                source={require('./assets/images/frydo-logo.png')}
                resizeMode='contain'
              />
            ),
            headerTitleStyle: { flex: 1, textAlign: 'center'},
            headerRight: () => (
              <View style={{ backgroundColor:'#009d28', paddingLeft:5, borderTopLeftRadius:10, borderBottomLeftRadius:10}}>
              <MaterialCommunityIcons style={{paddingRight:15}}  onPress={() => navigation.navigate('ProfileScreen')} name="home-outline" color="#fff" size={26} />
              </View>
             ),
          })}
        />


    <Stack.Screen
          name="StoreCombineItems"
          component={StoreCombineItems}
         options={({navigation})=>({
            headerLeft: () => (
              <HeaderBackButton
                  labelVisible={false}
                  tintColor={'#009d28'}
                  onPress={() => navigation.goBack()}
              />
             ),
            headerTitle: (props) => ( // App Logo
              <Image
                style={{ flex:1, width: 230, height: 40, resizeMode: 'contain' }}
                source={require('./assets/images/frydo-logo.png')}
                resizeMode='contain'
              />
            ),
            headerTitleStyle: { flex: 1, textAlign: 'center'},
            headerRight: () => (
              <View style={{ backgroundColor:'#009d28', paddingLeft:5, borderTopLeftRadius:10, borderBottomLeftRadius:10}}>
              <MaterialCommunityIcons style={{paddingRight:15}}  onPress={() => navigation.navigate('ProfileScreen')} name="home-outline" color="#fff" size={26} />
              </View>
             ),
          })}
        />

      {/* <Stack.Screen
          name="StyleStatScreen"
          component={StyleStatScreen}
          options={({navigation})=>({
            headerLeft: () => (
              <HeaderBackButton
                  labelVisible={false}
                  tintColor={'#009d28'}
                  onPress={() => navigation.goBack()}
              />
             ),
            headerTitle: (props) => ( // App Logo
              <Image
                style={{ flex:1, width: 230, height: 40, resizeMode: 'contain' }}
                source={require('./assets/images/frydo-logo.png')}
                resizeMode='contain'
              />
            ),
           // headerTitleStyle: { flex: 1, textAlign: 'center'},
            headerRight: () => (
              <View style={{ backgroundColor:'#009d28', paddingLeft:5, borderTopLeftRadius:10, borderBottomLeftRadius:10}}>
              <MaterialCommunityIcons style={{paddingRight:15}}  onPress={() => navigation.navigate('AuthenticatedNavigationRoutes')} name="home-outline" color="#fff" size={26} />
              </View>
             ),
          })}
        />    */}

        {/* <Stack.Screen
          name="ColorStatScreen"
          component={ColorStatScreen}
          options={({navigation})=>({
            headerLeft: () => (
              <HeaderBackButton
                  labelVisible={false}
                  tintColor={'#009d28'}
                  onPress={() => navigation.goBack()}
              />
             ),
            headerTitle: (props) => ( // App Logo
              <Image
                style={{ flex:1, width: 230, height: 40, resizeMode: 'contain' }}
                source={require('./assets/images/frydo-logo.png')}
                resizeMode='contain'
              />
            ),
            headerRight: () => (
              <View style={{ backgroundColor:'#009d28', paddingLeft:5, borderTopLeftRadius:10, borderBottomLeftRadius:10}}>
              <MaterialCommunityIcons style={{paddingRight:15}}  onPress={() => navigation.navigate('AuthenticatedNavigationRoutes')} name="home-outline" color="#fff" size={26} />
              </View>
             ),
          })}
        />    */}

    </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
