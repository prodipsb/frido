import React, {useState, useEffect} from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  Text, 
  Image, 
  TouchableOpacity, 
  TouchableHighlight,
  Alert, 
  ScrollView 
} from 'react-native';
import { Button } from 'react-native-paper';
import { green100 } from 'react-native-paper/lib/typescript/styles/colors';
import { get } from '../Helper/ApiCaller';
import ScreenTitle from './../Components/ScreenTitle';
import Loader from '../Components/Loader';

import Config from 'react-native-config';

const endPoint = Config.APP_ENDPOINT_LOCAL;



const showAlert = (item, routeNav) => {
  console.log('showAlert', item);

  routeNav?.navigation?.navigate('GalleryScreen', {
    itemId: item._id,
  });
  // if(item.text == 'Profile'){
  //   routeNav.navigation.replace('ProfileScreen')
  // }else{

  // Alert.alert(
  //  'Title',
  //  `Click on : ${item.text}`,
  //  [
  //    {text: 'OK', onPress: () => console.log('OK Pressed')},
  //  ],
  //  { cancelable: false }
  // )

  // }
}

const GridView = ({item, routeNav}) => (
  <View style={styles.gridItem}>
    <TouchableOpacity onPress={() => showAlert(item, routeNav)}>
    
        <Image 
          style={{height:80,width:80, margin:7}} 
          source={{ uri:endPoint+'/'+item?.photo}} 
          resizeMode={'contain'}
        />
    </TouchableOpacity>
   
   </View>
);
 
const ClosetScreen = (navigation) => {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
   getItems()
  }, []);


  const getItems = async() => {
    setLoading(true);
    const items = await get('api/v1/items').then((res) => {
      setItems(res?.data?.data);
      setLoading(false);

      }).catch(error => {
        console.log('fetch items error ',error)
      });
  }

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#fff'}}>
      <Loader loading={loading} />
        <ScreenTitle title="All Items"/>

        <FlatList
          contentContainerStyle={styles.listView}
          data={items}
          renderItem={({ item }) =>
          <TouchableOpacity>
           <GridView key={item._id} item={item} routeNav={navigation}/>
           </TouchableOpacity>
           }
          keyExtractor={item => item._id}
          numColumns={3}
          key={item => item._id}
        />

       
        <TouchableHighlight style={styles.btnSec}>
          <Button color="#fff" style={styles.addButton} onPress={() => navigation.navigation.navigate("AddItem")} uppercase={false}>Add More</Button>
        </TouchableHighlight>
        
    </SafeAreaView>
    
  );
};
 
export default ClosetScreen;

const styles = StyleSheet.create({

  screenLevel: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    color: '#000',
  },
  gridItem: {
    margin: 6,
    border:1 ,
    borderWidth: 1,
    borderColor: '#dadae8',
    borderRadius: 10,
  },
  listView: {
    justifyContent: 'center',
  //  backgroundColor: 'white',
   // alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40
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

  btnSec: {
    justifyContent: 'center',
    alignItems: 'center',
   
  },

  addButton:{
    width: '40%',
    color:'#fff',
    backgroundColor:'green',
    marginBottom: 10,
    textTransform: 'capitalize',
  }

});