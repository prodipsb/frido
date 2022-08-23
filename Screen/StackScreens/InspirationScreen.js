import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  Image, 
  TouchableOpacity, 
  Alert, 
  ScrollView 
} from 'react-native';
import ScreenTitle from '../Components/ScreenTitle';


const inspirationItems = [
  {
    id:1,
    title: 'My Favorite Outfits',
    qty: 5,
    image: require('../../assets/images/item.png')
  },
  {
    id:2,
    title: 'Simple Outfits',
    qty: 19,
    image: require('../../assets/images/item.png')
  },
  {
    id:3,
    title: 'Accessories',
    qty: 1,
    image: require('../../assets/images/item.png')
  },
  {
    id:4,
    title: 'Winter Inspiration',
    qty: 12,
    image: require('../../assets/images/item.png')
  },
  {
    id:5,
    title: 'Miscellaneour',
    qty: 5,
    image: require('../../assets/images/item.png')
  },
  {
    id:6,
    title: 'Wedding',
    qty: 5,
    image: require('../../assets/images/item.png')
  },
  {
    id:7,
    title: 'Blogs',
    qty: 1,
    image: require('../../assets/images/item.png')
  },
  {
    id:8,
    title: 'Fashion Trend',
    qty: 9,
    image: require('../../assets/images/item.png')
  },
  {
    id:9,
    title: 'Fashion Show',
    qty: 10,
    image: require('../../assets/images/item.png')
  },
  {
    id:10,
    title: 'Vogue Runway',
    qty: 1,
    image: require('../../assets/images/item.png')
  },

]

const FavCard = ({item}) => (
  <TouchableOpacity>
  <View style={{marginTop:15}}>

  <View
    style={{
      flexDirection: 'row',
      padding:10,
      borderColor: '#e2dede',
      shadowColor: "#938d8d",
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
      shadowOffset: {
        height: 1,
        width: 1
      }
    }}>

  <View style={{ borderColor:'#eae8e8', borderWidth:1, padding:3, borderTopLeftRadius:8, borderBottomLeftRadius:8, marginRight:25 }}>
    <Image 
          source={item?.image} 
          style={{width:40, height:50}} 
          resizeMode='cover'/>
    </View>
    <View style={{paddingVertical:10}}>
      <Text style={{fontSize:16, fontWeight:'bold', color:'#4c4545'}}>{item?.title}</Text>
      <Text style={{marginTop:5}}>{item?.qty} items</Text>
    </View>
      
    </View>

    </View>
  </TouchableOpacity>
)
 
const InspirationScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>
       <View style={{flex: 1, padding: 16}}>
       <ScreenTitle title="Inspiration"/>

        <ScrollView>
    
        {
          inspirationItems.map((item, i) => (
            <FavCard key={i} item={item}/>
          ))
        }
       

        </ScrollView>

      </View>

    </SafeAreaView>
  );
};
 
export default InspirationScreen;

const styles = StyleSheet.create({
  textStyle: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
  },

});
