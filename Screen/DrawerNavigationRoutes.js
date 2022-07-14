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
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

import { HeaderBackButton } from '@react-navigation/elements';

import Icon from 'react-native-vector-icons/MaterialIcons';
 
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
 
const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
        // options={{
        //   headerTitle: (props) => ( // App Logo
        //    <Image
        //      style={{ width: 250, height: 50 }}
        //      source={require('../Image/frido-logo.png')}
        //      resizeMode='contain'
        //    />
        //  ),
        //  headerLeft: () => (
        //   <HeaderBackButton
        //       labelVisible={false}
        //       tintColor={'#FFF'}
        //       onPress={() => navigation.goBack()}
        //   />
        //  ),
        //  headerRight: () => (
        //   <Button
        //     onPress={() => alert('This is a button!')}
        //     title="Info"
        //     color="#fff"
        //   />
        // ),
        //  headerTitleStyle: { flex: 1, textAlign: 'center', alignSelf: 'center' },
        //  }}
        // options={{
        //   title: 'Dashboard', //Set Header Title
        //   headerLeft: () => (
        //     <NavigationDrawerHeader navigationProps={navigation} />
        //   ),
        //   headerStyle: {
        //     backgroundColor: '#307ecc', //Set Header color
        //   },
        //   headerTintColor: '#fff', //Set Header text color
        //   headerTitleStyle: {
        //     fontWeight: 'bold', //Set Header text style
        //   },
        // }}
      />
    </Stack.Navigator>
  );
};
 

const SettingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};


 
const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#fff',
        drawerActiveBackgroundColor: '#307ecc',
        drawerInactiveTintColor: '#fff',
        headerBackTitleVisible: true,
        // drawerStyle: {
        //   activeTintColor: 'red',
        //   color: '#ccc',
        //   itemStyle: {marginVertical: 5, color: 'white'},
        //   labelStyle: {
        //     color: '#ccc',
        //   }    
        // },
        headerTitle: (props) => ( // App Logo
        <Image
          style={{ width: 250, height: 50 }}
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
       <Button
         onPress={() => alert('This is a button!')}
         title="Info"
         color="#fff"
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
    </Drawer.Navigator>
  );
};
 
export default DrawerNavigatorRoutes;
