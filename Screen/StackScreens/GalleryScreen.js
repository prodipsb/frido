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
import ScreenTitle from './../Components/ScreenTitle';
import Loader from '../Components/Loader';

import * as Animatable from 'react-native-animatable';
import { get } from '../Helper/ApiCaller';


const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 100;
const CARD_WIDTH = width * 0.3;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

import Config from 'react-native-config';

const endPoint = Config.APP_ENDPOINT_LOCAL;
 
const GalleryScreen = ({ route, navigation }) => {

  /* 2. Get the param */
  const { itemId } = route.params;

  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState('');
  const [shoes, setShoes] = useState([]);
  const [selectedShoeId, setSelectedShoeId] = useState();
  const [selectedShoe, setSelectedShoe] = useState();

  useEffect(() => {
   getItem()
   getShoes()
  }, [route]);


  const getItem = async() => {
    setLoading(true);

    const params = {
      id: itemId
    }

    const items = await get('api/v1/item', params).then((res) => {
      setItem(res?.data?.data);
      setLoading(false);

      }).catch(error => {
        console.log('fetch items error ',error)
      });
  }

  const getShoes = async() => {

    const shoeItems = await get('api/v1/items/shoe').then((res) => {
      setShoes(res?.data?.data);
      }).catch(error => {
        console.log('fetch shoe items error ',error)
      });
  }


  const handleSelectedShoe = async(shoe) => {
      setSelectedShoe(shoe);
      setSelectedShoeId(shoe?._id);
  }


  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>
      <Loader loading={loading} />

       <View  style={styles.screenLevel}>
        <Text 
          onPress={() => navigation.navigate("StoreCombineItems", {
            item: item,
            shoe : selectedShoe
          })}  
          style={styles.textStyle}>Add Item</Text>
       </View>


       <View style={{ paddingLeft: 30, paddingRight:30}}>
        <TouchableOpacity>
          <Card style={styles.mCard}>
              <Card.Image 
              source={{ uri:endPoint+'/'+item?.photo}} 
              style={{height:340}} 
              resizeMode='cover'
              />
          </Card>
        </TouchableOpacity>
      </View>


      
       <Text onPress={() => navigation.navigation.navigate("ClosetScreen")} style={styles.viewBtn}>View All</Text>

       <Animatable.View animation="fadeInUpBig">

       <Animated.ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToInterval={CARD_WIDTH + 20}
              snapToAlignment="center">


              {shoes.map((shoe, index) => {

              return (<TouchableOpacity onPress={() => handleSelectedShoe(shoe)} key={index}>
                
                <View style={styles.card}>
                  {shoe?._id == selectedShoeId ? <View style={styles.activePoint}></View> : ''}
                  <Image
                    source={{ uri:endPoint+'/'+shoe?.photo}} 
                    style={styles.cardImage}
                    resizeMode="contain"
                  />
                </View>
                </TouchableOpacity>
                );

              })}

            </Animated.ScrollView>

       </Animatable.View>

    </SafeAreaView>
  );
};
 
export default GalleryScreen;

const styles = StyleSheet.create({
  screenLevel: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  textStyle: {
    flexDirection: 'row',
    color:'green', 
    fontWeight:'bold',
    cursor:'pointer'
  },

  mCard: {
      borderRadius: 10,
      backgroundColor:'green'
  },


  card: {
    elevation: 3,
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
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },


  activePoint : {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: 'green',
    position: 'absolute',
    marginTop: 14,
    marginLeft: 12,
    zIndex: 1,
  },

  viewBtn : {
    fontWeight: 'bold', 
    fontSize:15,
    color:'green',
    justifyContent:'flex-end', 
    textAlign:'right', 
    marginRight:10, 
    marginTop:10, 
    marginBottom:5, 
    cursor:'pointer'
  }

});
