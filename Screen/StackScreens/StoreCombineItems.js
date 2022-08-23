import React, {useState, useEffect} from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  Image, 
  TouchableOpacity, 
  TouchableHighlight,
  ScrollView ,
  View,
  TextInput,
  Platform,
  StatusBar,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import { Card } from 'react-native-elements'
import { Button } from 'react-native-paper';
import ScreenTitle from '../Components/ScreenTitle';
import Loader from '../Components/Loader';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { get } from '../Helper/ApiCaller';


const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 100;
const CARD_WIDTH = width * 0.3;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

import Config from 'react-native-config';

const endPoint = Config.APP_ENDPOINT_LOCAL;
 
const StoreCombineItems = ({ route, navigation }) => {

  console.log('route', route)
  console.log('route.params item', route.params.item)
  console.log('route.params shoe', route.params.shoe)
  /* 2. Get the param */
  const { itemId } = route.params;

  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState('');
  const [shoes, setShoes] = useState([]);
  const [selectedShoeId, setSelectedShoeId] = useState();

  useEffect(() => {
   getItem()
   getShoes()
  }, [route]);


  const getItem = async() => {
    console.log('getItems', itemId);
    setLoading(true);

    const params = {
      id: itemId
    }

    const items = await get('api/v1/item', params).then((res) => {
      console.log('all item', res?.data?.data);
      setItem(res?.data?.data);
      setLoading(false);

      }).catch(error => {
        console.log('fetch items error ',error)
      });
  }

  const getShoes = async() => {

    const shoeItems = await get('api/v1/items/shoe').then((res) => {
      console.log('all shoe items', res?.data?.data);
      setShoes(res?.data?.data);
      }).catch(error => {
        console.log('fetch shoe items error ',error)
      });
  }

  const storeUserItems = () => {
    console.log('store user items')

    const payload = {
      'user_id': 1,
      'item_id':1,
      'shoe_id':1,
      'pant_id':1,
    }
  }


  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff', paddingTop:20}}>
      <Loader loading={loading} />
  
       <View style={{ paddingLeft: 20, paddingRight:20}}>
        <TouchableOpacity>
          <Card style={styles.mCard}>
          <Card.Title style={{backgroundColor:'green', color:'#fff', fontSize:18, padding:15, borderTopLeftRadius:10, borderTopRightRadius:10}}>Edit <FontAwesomeIcon name="edit" size={18} /></Card.Title>
              <Card.Image 
              source={{ uri:endPoint+'/'+route?.params?.item?.photo}} 
              style={{height:330}} 
              resizeMode='cover'
              />

              <Image
               style={{width:200, height:150, position:'absolute', bottom:0, right:0}}
               source={{ uri:endPoint+'/'+route?.params?.shoe?.photo}} 
               />

          </Card>
        </TouchableOpacity>
      </View>

      <TouchableHighlight style={styles.btnSec}>
        <Button color="#fff" style={styles.addButton} onPress={() => navigation.navigation.navigate("AddItem")} uppercase={false}>Add More</Button>
      </TouchableHighlight>
      

      <TouchableHighlight style={{position:'absolute', bottom:0, right:0}}>
        <Button onPress={() => storeUserItems()} color='#fff' style={styles.bottomSaveBtn} uppercase={false}>Save</Button>
      </TouchableHighlight>

    </SafeAreaView>
  );
};
 
export default StoreCombineItems;

const styles = StyleSheet.create({


  mCard: {
      borderRadius: 10,
      backgroundColor:'green',
  },


  card: {
    // padding: 10,
    elevation: 3,
    // backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 15,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },


  addButton:{
    width: '40%',
    color:'#fff',
    backgroundColor:'green',
    marginTop:50,
    marginBottom: 10,
    textTransform: 'capitalize',
    alignSelf:'center',
  },

  bottomSaveBtn:{
    paddingTop:30, 
    backgroundColor:'green', 
    color:'#fff', 
    height:80, 
    width:90, 
    borderTopLeftRadius:100, 
    borderBottomLeftRadius:0
  }

});
