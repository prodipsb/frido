// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
 
// Import React
import React from 'react';
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
 
// Import Navigators from React Navigation
 import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './DrawerScreens/HomeScreen';
const RootDrawerNavigator = createDrawerNavigator();
 
// Import Screens
 
const Stack = createStackNavigator();
 
const DrawerNavigatorRoutes = (props) => {
  return (
    <NavigationContainer independent={true}>
    <RootDrawerNavigator.Navigator initialRouteName="HomeScreen">
      <RootDrawerNavigator.Screen name="HomeScreen" component={HomeScreen} />
    </RootDrawerNavigator.Navigator>
  </NavigationContainer>
    );
  }
 
export default DrawerNavigatorRoutes;
