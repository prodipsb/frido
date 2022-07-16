import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  Image, 
  Button,
  TouchableOpacity, 
} from 'react-native';
 
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
 
// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import ProfileScreen from './DrawerScreens/ProfileScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

import { HeaderBackButton } from '@react-navigation/elements';
import { Avatar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createMaterialBottomTabNavigator();
 
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
 
const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerLeft: () => (
        <HeaderBackButton
            labelVisible={false}
            tintColor={'#000'}
            onPress={() => navigation.goBack()}
        />
       ),
      headerTitle: (props) => ( // App Logo
        <Image
          style={{ flex:1, width: 230, height: 40, resizeMode: 'contain' }}
          source={require('../Image/frido-logo.png')}
          resizeMode='contain'
        />
      ),
      headerTitleStyle: { flex: 1, textAlign: 'center'},
      headerRight: () => (
        <Avatar
          rounded
          icon={{name: 'user', color: '#009d28', size:35, type: 'font-awesome'}}
          onPress={() => props.navigation.navigate('ProfileScreen')}
          activeOpacity={0.7}
          overlayContainerStyle={{backgroundColor: '#fff'}}
          containerStyle={{ borderColor: '#009d28', color:'#009d28', marginRight: 10, borderStyle: 'solid', borderWidth: 1}}
        />
       ),
    }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false
        }}
        
      />
    </Stack.Navigator>
  );
};
 

const SettingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};


 
const DrawerNavigatorRoutes = (props) => {
  return (
    <>
    {/* <Drawer.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#fff',
        drawerActiveBackgroundColor: '#307ecc',
        drawerInactiveTintColor: '#fff',
        headerBackTitleVisible: true,
        headerTitle: (props) => ( // App Logo
        <Image
          style={{ width: 240, height: 40 }}
          source={require('../Image/frido-logo.png')}
          resizeMode='contain'
        />
      ),
      headerLeft: () => (
       <HeaderBackButton
           labelVisible={false}
           tintColor={'#FFF'}
           onPress={() => navigation.goBack()}
       />
      ),
      headerRight: () => (
      <Avatar
        rounded
        icon={{name: 'user', color: '#009d28', size:35, type: 'font-awesome'}}
        onPress={() => props.navigation.navigate('ProfileScreen')}
        activeOpacity={0.7}
        overlayContainerStyle={{backgroundColor: '#fff'}}
        containerStyle={{ borderColor: '#009d28', color:'#009d28', marginRight: 10, borderStyle: 'solid', borderWidth: 1}}
      />
     ),
      }}
      drawerContent={CustomSidebarMenu}
      >
      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: 'Dashboard',
          color: '#ccc',
          drawerIcon: ({focused, size}) => (
            <Icon
               name="dashboard"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         )
        }}
        component={HomeScreenStack}
        
      />
      <Drawer.Screen
        name="SettingScreenStack"
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({focused, size}) => (
            <Icon
               name="settings"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         )
        }}
        component={SettingScreenStack}
      />

    <Drawer.Screen
        name="ProfileScreenStack"
        options={{
          drawerLabel: 'Profile',
          color: '#ccc',
          drawerIcon: ({focused, size}) => (
            <FontAwesomeIcon
               name="user"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         )
        }}
        component={ProfileScreenStack}
        
      />

    </Drawer.Navigator> */}

    <Tab.Navigator
        initialRouteName="ProfileScreen"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'tomato' }}
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
          name="ProfileScreenStack"
          component={ProfileScreenStack}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>

    </>

  );
};
 
export default DrawerNavigatorRoutes;
