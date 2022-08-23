import React, {useState, useEffect} from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  Image, 
  Button,
  TouchableOpacity, 
} from 'react-native';

import Config from 'react-native-config';
 
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
 
// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import ProfileScreen from './DrawerScreens/ProfileScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

import ClosetScreen from './StackScreens/ClosetScreen';
import LookScreen from './StackScreens/LookScreen';
import InspirationScreen from './StackScreens/InspirationScreen';
import CalenderScreen from './StackScreens/CalenderScreen';
import PackingScreen from './StackScreens/PackingScreen';
import StyleStatsScreen from './StackScreens/StyleStatScreen';
import ShopScreen from './StackScreens/ShopScreen';
import StyleExportScreen from './StackScreens/StyleExportScreen';

import { HeaderBackButton } from '@react-navigation/elements';
import { Avatar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import GalleryScreen from './StackScreens/GalleryScreen';
import AddItem from './StackScreens/AddItem';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const endPoint = Config.APP_ENDPOINT_LOCAL;
 
const HomeScreenStack = ({navigation}) => {

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    getAuth()
  }, []);


const getAuth = async () => {
  const auth = await AsyncStorage.getItem('auth');
  const authJson = JSON.parse(auth);
  setAuth(authJson);
}

  return (
    <Stack.Navigator
    initialRouteName="HomeScreen">
      
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}

      />

      <Stack.Screen
        name="ClosetScreen"
        component={ClosetScreen}
        options={{
          headerShown: false,
        }}

      />

      <Stack.Screen
        name="InspirationScreen"
        component={InspirationScreen}
        options={{
          headerShown: false
        }}
        
      />

      <Stack.Screen
        name="StyleStatsScreen"
        component={StyleStatsScreen}
        options={{
          headerShown: false,
        }}

      />

      <Stack.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={{
          headerShown: false
        }}
        
      />
       <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={{
          headerShown: false
        }}
        
      />

    </Stack.Navigator>
  );
};


 
const AuthenticatedNavigationRoutes = () => {

  return (
    <Tab.Navigator
        initialRouteName={'HomeScreenStack'}
        activeColor="#fff"
        barStyle= {{
          borderWidth: 0.5,
          borderBottomWidth: 1,
          backgroundColor:'#7bb260',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderColor: 'transparent',
          overflow: 'hidden',
      }}
      >
        

        <Tab.Screen
          name="HomeScreenStack"
          component={HomeScreenStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
              headerShown: true,
            }}
        />

        <Tab.Screen
          name="ClosetScreen"
          component={ClosetScreen}
          options={{
            tabBarLabel: 'Closet',
            tabBarIcon: ({ color }) => (
              <Image
                style={{ flex:1, width: 50, height: 40, resizeMode: 'contain' }}
                source={require('../assets/images/icons/closet.png')}
                resizeMode='contain'
              />
            ),
            headerShown: true,
          }}
        />

        <Tab.Screen
          name="GalleryScreen"
          component={GalleryScreen}
          options={{
            tabBarLabel: 'Gallery',
            tabBarIcon: ({ color }) => (
              <Image
                style={{ flex:1, width: 50, height: 40, resizeMode: 'contain' }}
                source={require('../assets/images/icons/looks.png')}
                resizeMode='contain'
              />
            ),
            headerShown: true,
          }}
        />

        <Tab.Screen
          name="InspirationScreen"
          component={InspirationScreen}
          options={{
            tabBarLabel: 'Inspiration',
            tabBarIcon: ({ color }) => (
              <Image
                style={{ flex:1, width: 50, height: 40, resizeMode: 'contain' }}
                source={require('../assets/images/icons/inspiration.png')}
                resizeMode='contain'
              />
            ),
            headerShown: true,
          }}
        />
    
        <Tab.Screen
          name="CalenderScreen"
          component={CalenderScreen}
          options={{
            tabBarLabel: 'Calender',
            tabBarIcon: ({ color }) => (
              <Image
                style={{ flex:1, width: 50, height: 40, resizeMode: 'contain' }}
                source={require('../assets/images/icons/calender.png')}
                resizeMode='contain'
              />
            ),
          }}
        />

      </Tab.Navigator>

  );
};
 
export default AuthenticatedNavigationRoutes;
