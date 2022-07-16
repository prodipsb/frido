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

import ClosetScreen from './StackScreens/ClosetScreen';
import LookScreen from './StackScreens/LookScreen';
import InspirationScreen from './StackScreens/InspirationScreen';
import CalenderScreen from './StackScreens/CalenderScreen';
import PackingScreen from './StackScreens/PackingScreen';
import StyleStatsScreen from './StackScreens/StyleStatsScreen';
import ShopScreen from './StackScreens/ShopScreen';
import StyleExportScreen from './StackScreens/StyleExportScreen';

import { HeaderBackButton } from '@react-navigation/elements';
import { Avatar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
 
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
          onPress={() => navigation.navigate('ProfileScreen')}
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


const ClosetScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
    initialRouteName="ClosetScreen"
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
          onPress={() => navigation.navigate('ProfileScreen')}
          activeOpacity={0.7}
          overlayContainerStyle={{backgroundColor: '#fff'}}
          containerStyle={{ borderColor: '#009d28', color:'#009d28', marginRight: 10, borderStyle: 'solid', borderWidth: 1}}
        />
       ),
    }}
    >
      <Stack.Screen
        name="ClosetScreen"
        component={ClosetScreen}
        options={{
          headerShown: true,
        }}
        
      />
    </Stack.Navigator>
  );
};

const LooksScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
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
          onPress={() => navigation.navigate('ProfileScreen')}
          activeOpacity={0.7}
          overlayContainerStyle={{backgroundColor: '#fff'}}
          containerStyle={{ borderColor: '#009d28', color:'#009d28', marginRight: 10, borderStyle: 'solid', borderWidth: 1}}
        />
       ),
    }}
    >
      <Stack.Screen
        name="LookScreen"
        component={LookScreen}
        options={{
          headerShown: true
        }}
        
      />
    </Stack.Navigator>
  );
};

const InspirationScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
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
          onPress={() => navigation.navigate('ProfileScreen')}
          activeOpacity={0.7}
          overlayContainerStyle={{backgroundColor: '#fff'}}
          containerStyle={{ borderColor: '#009d28', color:'#009d28', marginRight: 10, borderStyle: 'solid', borderWidth: 1}}
        />
       ),
    }}
    >
      <Stack.Screen
        name="InspirationScreen"
        component={InspirationScreen}
        options={{
          headerShown: true
        }}
        
      />
    </Stack.Navigator>
  );
};

const CalenderScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CalenderScreen"
        component={CalenderScreen}
        options={{
          headerShown: true
        }}
        
      />
    </Stack.Navigator>
  );
};


 
const AuthenticatedNavigationRoutes = (props) => {
  return (
    <Tab.Navigator
        initialRouteName="HomeScreenStack"
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
      // screenOptions = {{
      //   headerLeft: () => (
      //     <HeaderBackButton
      //         labelVisible={false}
      //         tintColor={'#000'}
      //         onPress={() => navigation.goBack()}
      //     />
      //    ),
      //   headerTitle: (props) => ( // App Logo
      //     <Image
      //       style={{ flex:1, width: 230, height: 40, resizeMode: 'contain' }}
      //       source={require('../Image/frido-logo.png')}
      //       resizeMode='contain'
      //     />
      //   ),
      //   headerTitleStyle: { flex: 1, textAlign: 'center'},
      //   headerRight: (props) => (
      //     <Avatar
      //       rounded
      //       icon={{name: 'user', color: '#009d28', size:35, type: 'font-awesome'}}
      //     //  onPress={() => props.navigation.navigate('ProfileScreen')}
      //       activeOpacity={0.7}
      //       overlayContainerStyle={{backgroundColor: '#fff'}}
      //       containerStyle={{ borderColor: '#009d28', color:'#009d28', marginRight: 10, borderStyle: 'solid', borderWidth: 1}}
      //     />
      //    ),
      // }}
      >

        <Tab.Screen
          name="HomeScreenStack"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
              headerShown: true,
            }}
          component={HomeScreenStack}
        />

        <Tab.Screen
          name="ClosetScreenStack"
          component={ClosetScreenStack}
          options={{
            tabBarLabel: 'Closet',
            tabBarIcon: ({ color }) => (
              <Image
                style={{ flex:1, width: 50, height: 40, resizeMode: 'contain' }}
                source={require('../Image/Icons/closet.png')}
                resizeMode='contain'
              />
            ),
            headerShown: true,
          }}
        />

        <Tab.Screen
          name="LooksScreenStack"
          component={LooksScreenStack}
          options={{
            tabBarLabel: 'Looks',
            tabBarIcon: ({ color }) => (
              <Image
                style={{ flex:1, width: 50, height: 40, resizeMode: 'contain' }}
                source={require('../Image/Icons/looks.png')}
                resizeMode='contain'
              />
            ),
            headerShown: true,
          }}
        />

        <Tab.Screen
          name="InspirationScreenStack"
          component={InspirationScreenStack}
          options={{
            tabBarLabel: 'Inspiration',
            tabBarIcon: ({ color }) => (
              <Image
                style={{ flex:1, width: 50, height: 40, resizeMode: 'contain' }}
                source={require('../Image/Icons/inspiration.png')}
                resizeMode='contain'
              />
            ),
            headerShown: true,
          }}
        />
    
        <Tab.Screen
          name="CalenderScreenStack"
          component={CalenderScreenStack}
          options={{
            tabBarLabel: 'Calender',
            tabBarIcon: ({ color }) => (
              <Image
                style={{ flex:1, width: 50, height: 40, resizeMode: 'contain' }}
                source={require('../Image/Icons/calender.png')}
                resizeMode='contain'
              />
            ),
          }}
        />

      </Tab.Navigator>

  );
};
 
export default AuthenticatedNavigationRoutes;
