import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  Text, 
  Image, 
  TouchableOpacity, 
  Alert, 
  ScrollView 
} from 'react-native';
import ProfileScreen from './ProfileScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenTitle from './../Components/ScreenTitle';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createMaterialBottomTabNavigator();

const HomeOptions = [
  {
    id: "1",
    text: "Closet",
    imageLink: require('../../assets/images/home/closet.png'),
  },
  {
    id: "2",
    text: "My Looks",
    imageLink: require('../../assets/images/home/looks.png'),
  },
  {
    id: "3",
    text: "Inspiration",
    imageLink: require('../../assets/images/home/inspiration.png'),
  },
  {
    id: "4",
    text: "Calendar",
    imageLink: require('../../assets/images/home/calender.png'),
  },
  {
    id: "5",
    text: "Packing",
    imageLink: require('../../assets/images/home/packing.png'),
  },
  {
    id: "6",
    text: "Style Stats",
    imageLink: require('../../assets/images/home/style-stats.png'),
  },
  {
    id: "7",
    text: "Shop",
    imageLink: require('../../assets/images/home/shop.png'),
  },
  {
    id: "8",
    text: "Style Expert",
    imageLink: require('../../assets/images/home/style-export.png'),
  },
  {
    id: "9",
    text: "Profile",
    imageLink: require('../../assets/images/home/profile.png'),
  },
  {
    id: "10",
    text: "Chat",
    imageLink: require('../../assets/images/home/chat.png'),
  }

];

const showAlert = (item, routeNav) => {

  console.log('routeNav', routeNav);
  if(item.text == 'Profile'){
    routeNav.navigation.replace('ProfileScreen')
  }else if(item.text == 'Closet'){
    routeNav.navigation.replace('ClosetScreen')
  }else if(item.text == 'Style Stats'){
    routeNav.navigation.replace('StyleStatScreen')
  }else if(item.text == 'Inspiration'){
    console.log('Inspirationoooo');
    routeNav.navigation.replace('InspirationScreen')
  }else{

  Alert.alert(
   'Title',
   `Click on : ${item.text}`,
   [
     {text: 'OK', onPress: () => console.log('OK Pressed')},
   ],
   { cancelable: false }
  )

  }
}

const GridView = ({item, routeNav}) => (
  <View style={styles.gridItem}>
    <TouchableOpacity onPress={() => showAlert(item, routeNav)}>
        <Image 
          style={{height:100,width:100}} 
          source={item.imageLink} 
          resizeMode={'contain'}
        />
        <View style={styles.itemTitleSection}>
          <Text style={styles.itemTitle}>{item?.text}</Text>
        </View>
    </TouchableOpacity>
   
   </View>
);
 
const HomeScreen = (navigation) => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
        <ScreenTitle title="Home"/>

        <FlatList
          contentContainerStyle={styles.listView}
          data={HomeOptions}
          renderItem={({ item }) =>
          <TouchableOpacity  onPress={(navigation) => navigation.navigate("ProfileScreen")} >
           <GridView key={item.id} item={item} routeNav={navigation}/>
           </TouchableOpacity>
           }
          keyExtractor={item => item.id}
          numColumns={3}
          key={item => item.id}
        />

    </SafeAreaView>
  );
};
 
export default HomeScreen;

const styles = StyleSheet.create({

  screenLevel: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    color: '#000',
  },
  gridItem: {
    marginBottom: 15,
  },
  listView: {
   // margin: 20,
    justifyContent: 'center',
  //  backgroundColor: 'white',
   // alignItems: 'center',
  
  },

  itemTitleSection: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemTitle: {
    color:'#000',
    fontWeight:'bold',
  },

});
