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

const HomeOptions = [
  {
    id: "1",
    text: "Closet",
    imageLink: require('../../Image/Home/closet.png'),
  },
  {
    id: "2",
    text: "Looks",
    imageLink: require('../../Image/Home/looks.png'),
  },
  {
    id: "3",
    text: "Inspiration",
    imageLink: require('../../Image/Home/inspiration.png'),
  },
  {
    id: "4",
    text: "Calendar",
    imageLink: require('../../Image/Home/calender.png'),
  },
  {
    id: "5",
    text: "Packing",
    imageLink: require('../../Image/Home/packing.png'),
  },
  {
    id: "6",
    text: "Style Stats",
    imageLink: require('../../Image/Home/style-stats.png'),
  },
  {
    id: "7",
    text: "Shop",
    imageLink: require('../../Image/Home/shop.png'),
  },
  {
    id: "8",
    text: "Style Export",
    imageLink: require('../../Image/Home/style-export.png'),
  }

];

const showAlert = (item) => {
  Alert.alert(
   'Title',
   `Click on : ${item.text}`,
   [
     {text: 'OK', onPress: () => console.log('OK Pressed')},
   ],
   { cancelable: false }
 )
}

const GridView = ({item}) => (
  <View style={styles.gridItem}>
    <TouchableOpacity onPress={() => showAlert(item)}>
        <Image 
          style={{height:100,width:100}} 
          source={item.imageLink} 
          resizeMode={'contain'}
        />
        <View style={styles.textStyle}>
          <Text>{item.text}</Text>
        </View>
    </TouchableOpacity>
   
   </View>
);
 
const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>
        <View  style={styles.screenLevel}>
          <Text>Home</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.listView}
          data={HomeOptions}
          renderItem={({ item }) => <GridView key={item.id} item={item} />}
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
  },
  gridItem: {
    marginBottom: 15,
  },
  listView: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  
  },

  textStyle: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
  },

});
