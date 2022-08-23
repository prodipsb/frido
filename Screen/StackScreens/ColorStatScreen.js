import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  Image, 
  TouchableOpacity, 
  Alert, 
  ScrollView ,
  FlatList, 
} from 'react-native';
import { Card, Divider } from 'react-native-paper';
import ScreenTitle from '../Components/ScreenTitle';
import { ListItem, Icon } from 'react-native-elements'

const colors = [
  {
    id:1,
    title: 'Black',
    qty: 7
   // icon: 'flight-takeoff'
  },
  {
    id:2,
    title: 'Orange',
    qty: 21
  },
  {
    id:3,
    title: 'Grey',
    qty: 11
  },
  {
    id:4,
    title: 'Blue',
    qty: 20
  },
  {
    id:5,
    title: 'Yellow',
    qty: 11
  },
  {
    id:6,
    title: 'Red',
    qty: 15
  },
  {
    id:7,
    title: 'Pink',
    qty: 12
  },
  {
    id:8,
    title: 'Green',
    qty: 11
  }

]



const ColorBlock = ({color}) => (
  <TouchableOpacity>
  <View style={{width:25, height:25, backgroundColor:color, marginRight:7, borderRadius:5, justifyContent:'space-between'}}/>
  </TouchableOpacity>
)
 
const ColorStatScreen = (navigation) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>
      <ScrollView style={{paddingBottom:100}}>
       <View >
       <ScreenTitle title="Color Stats"/>
        <View style={{marginTop:30}}>
        <Text style={{alignSelf:'flex-end', marginBottom:10, marginRight:10}}>Total Items</Text>  
        <Divider style={{borderWidth:1, borderColor:'#eee' }}/>
        <View style={{paddingLeft: 16, paddingRight:16, paddingBottom:10}}>
        {
          colors.map((color, i, {length}) => (
            <>
            <ListItem key={i} style={{ maxHeight:50, borderBottomWidth:2, borderBottomColor: '#efefef'}}>
              <ColorBlock color={color.title.toLowerCase()}/>
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight:'bold'}}>{color?.title}</ListItem.Title>
              </ListItem.Content>
              <Text style={{fontSize:18, fontWeight:'bold'}}>{color?.qty}</Text>
            </ListItem>
            {i !== length - 1 && <Divider style={{borderWidth:1, borderColor:'#eee' }}/>}
             </>
          ))
        }
        </View>
        <Divider style={{borderWidth:1, borderColor:'#eee' }}/>
        </View>


      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
 
export default ColorStatScreen;

const styles = StyleSheet.create({
  textStyle: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem:{
   height:45,
   fontWeight:'bold', 
   backgroundColor:'#fff', 
   borderBottomColor:'#ccc', 
   borderBottomWidth:1,
   paddingVertical:3,
   
  }

});
