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
import { List } from 'react-native-paper';

const styleStats = [
  {
    id: "1",
    label: "Item Count",
    value: 249,
  },
  {
    id: "2",
    label: "Total Closet Value",
    value: '$ 433.9',
  }

];

const GridView = ({item}) => (

  <View style={{flex:1, margin: 5,}}>
  <Text style={{marginBottom:15}}>{item.label}</Text>
  <Card
  style={{
    padding: 18,
    borderRadius: 10,
    borderColor: '#e2dede',
    borderWidth: 1,
    shadowColor: "#938d8d",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 7,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }}>
  <View>
    <Text style={{fontSize:18, fontWeight:'bold', color:'#494141'}}>{item.value}</Text>
  </View>
  </Card>
  </View>

);

const colors = [
  'Red',
  'Magenta',
  'Yellow',
  'Orange',
  'Gray',
  'Blue',
  'Green',
  'Black'
]

const ColorBlock = ({color}) => (
  <TouchableOpacity>
  <View style={{width:35, height:35, backgroundColor:color, marginRight:7, borderRadius:10, justifyContent:'space-between'}}/>
  </TouchableOpacity>
)

const ColorStatsIntro = (navigation) => (
  <View style={{marginTop:25}}>
  <View style={{flexDirection:'row', justifyContent:'space-between',marginBottom:15}}>
    <Text style={{ color:'#494141', fontSize:20, fontWeight:'bold'}}>{'Color Stats'}</Text>
    <Text onPress={() => navigation?.navigation?.navigation?.navigate("ColorStatScreen")} style={{color:'green', fontWeight:'bold'}}>{'View All'}</Text>
  </View>
  <View style={{flexDirection:'row'}}>
  {
    colors.map((color, index) => (
      <ColorBlock key={index} color={color.toLowerCase()}/>
    ))
  }
  </View>
  </View>
);
 
const StyleStatScreen = (navigation) => {
 
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>
     
       <View style={{ padding: 16}}>
       <ScreenTitle title="Style Stats"/>

       <FlatList
          data={styleStats}
          renderItem={({ item }) =>
           <GridView key={item.id} item={item}/>
          }
          keyExtractor={item => item.id}
          numColumns={2}
          key={item => item.id}
        />

        <ColorStatsIntro navigation={navigation}/>

        <ScrollView style={{paddingBottom:100}}>
        <View style={{marginTop:30}}>
          
        <List.Section>
          <Divider style={{borderWidth:1, borderColor:'#eee' }}/>
          <List.Accordion
            title="22 Most Recently Added"
            style={styles.listItem}
            >
            <List.Item title="Sub Menu" />
          </List.Accordion>

          <List.Accordion
            title="Never Used In An Outfit"
           style={styles.listItem}
            >
            <List.Item title="Second item" />
          </List.Accordion>

          <List.Accordion
            title="Never Logged On Calendar"
           style={styles.listItem}
            >
            <List.Item title="First item" />
          </List.Accordion>

          <List.Accordion
            title="22 Least Worn"
           style={styles.listItem}
            >
            <List.Item title="First item" />
          </List.Accordion>

          <List.Accordion
            title="22 Most Worn"
            style={styles.listItem}
            >
            <List.Item title="First item" />
          </List.Accordion>

        </List.Section>
        </View>
        </ScrollView>


      </View>
     
    </SafeAreaView>
  );
};
 
export default StyleStatScreen;

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
