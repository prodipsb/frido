import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
  
const ScreenTitle = (props) => {
  return (
    <View  style={styles.screenLevel}>
      <Text style={styles.textStyle}>{props.title}</Text>
    </View>
  );
};
 
export default ScreenTitle;
 
const styles = StyleSheet.create({
  screenLevel: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  textStyle: {
    flexDirection: 'row',
    fontSize: 17,
    color:'green', 
    fontWeight:'bold'
  }
});
