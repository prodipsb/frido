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
 
const StyleExportScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>
       <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#8b9cb5',
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Style Export Screen{'\n'}
            In Progress..
          </Text>
        </View>
      </View>

    </SafeAreaView>
  );
};
 
export default StyleExportScreen;

const styles = StyleSheet.create({
  textStyle: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
  },

});
