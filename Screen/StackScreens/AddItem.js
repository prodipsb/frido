import React, {useState} from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView ,
  View,
  TextInput,
  KeyboardAvoidingView,  
} from 'react-native';
import { Card } from 'react-native-elements'
import Loader from '../Components/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScreenTitle from '../Components/ScreenTitle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import * as Animatable from 'react-native-animatable';

import {Picker} from '@react-native-picker/picker';

import * as ImagePicker from "react-native-image-picker"
import { postForm } from '../Helper/ApiCaller';

 
const AddItem = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [selectedColor, setselectedColor] = useState('');
  const [selectedInspiration, setSelectedInspiration] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [title, setTitle] = useState('');
  const [details, setdetails] = useState('')
  const [file, setFile] = useState('')

  const Tab = createMaterialBottomTabNavigator();
  // const [colors, setcolors] = useState([
  //   'White',
  //   'Black',
  //   'Red',
  //   'Blue',
  //   'Green',
  //   'Yellow',
  // ].sort()
  // );

  // const [inspirations, setInspirations] = useState([
  //   'inspiration 1',
  //   'inspiration 2',
  //   'inspiration 3',
  // ].sort()
  // );


  const colors = [
    {
      id:1,
      title: 'Black',
    },
    {
      id:2,
      title: 'Orange',
    },
    {
      id:3,
      title: 'Grey',
    },
    {
      id:4,
      title: 'Blue',
    },
    {
      id:5,
      title: 'Yellow',
    },
    {
      id:6,
      title: 'Red',
    },
    {
      id:7,
      title: 'Pink',
    },
    {
      id:8,
      title: 'Green',
    }
  
  ]

  const inspirations = [
    {
      id:1,
      title: 'My Favorite Outfits',
    },
    {
      id:2,
      title: 'Simple Outfits',
    },
    {
      id:3,
      title: 'Accessories',
    },
    {
      id:4,
      title: 'Winter Inspiration',
    },
    {
      id:5,
      title: 'Miscellaneour',
    },
    {
      id:6,
      title: 'Wedding',
    },
    {
      id:7,
      title: 'Blogs',
    },
    {
      id:8,
      title: 'Fashion Trend',
    },
    {
      id:9,
      title: 'Fashion Show',
    },
    {
      id:10,
      title: 'Vogue Runway',
    },
  
  ]

  const handleUploadPhoto = async () => {
    console.log('handleUploadPhoto');

    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      async (response) => {
        const photoAsset = Object.assign({}, ...response?.assets)
        setFile({photoAsset});

        // let formdata = new FormData();
        // formdata.append('fileData', {
        //   uri : photoAsset?.uri,
        //   type: photoAsset?.type,
        //   name: photoAsset?.fileName
        //  });
    
         console.log('submitted photoAsset',photoAsset);
    
     


      },
    )

  }

  const handleSubmitButton = async () => {
    setErrortext('');

    //Show Loader
    setLoading(true);

    // const data ={
    //   title:title,
    //   color:selectedColor,
    //   inspiration:selectedInspiration,
    //   details:details,
    // }


    let formdata = new FormData();
    formdata.append('title', title);
    formdata.append('color', selectedColor);
    formdata.append('inspiration', selectedInspiration);
    formdata.append('type', selectedType);
    formdata.append('details', details);
    formdata.append('fileData', {
      uri : file?.photoAsset?.uri,
      type: file?.photoAsset?.type,
      name: file?.photoAsset?.fileName
     });

     console.log('submitted formdata',formdata);

      const response =  await postForm('item/save', formdata).then((res) => {
      console.log('res dipp',res?.data?.data);

      setLoading(false);

      navigation.replace('ClosetScreen');
          
    }).catch(err => console.log(err))

  };

  // console.log('item',title);
  // console.log('color',selectedColor);
  // console.log('insiration',selectedInspiration);
  // console.log('file',file);
  // console.log('file uri',file?.uri);
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>

    <ScreenTitle title="Add Item"/>

       {/* <Animatable.View animation="fadeInUpBig"> */}

       {/* <Animated.ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToInterval={CARD_WIDTH + 20}
              snapToAlignment="center"> */}

             

            <View style={styles.mainBody}>
                  <Loader loading={loading} />
                  <ScrollView
                  //  keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                      flex: 1,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>

                    {/* <KeyboardAvoidingView enabled> */}

                    {/* <KeyboardAvoidingView
                        style={styles.container}
                        behavior="padding"
                      > */}

                    <KeyboardAwareScrollView
                          resetScrollToCoords={{ x: 0, y: 0 }}
                          contentContainerStyle={styles.container}
                          scrollEnabled={true}
                        >

                      {/* title */}
                      <View style={styles.SectionStyle}>
                        <TextInput
                          style={styles.inputStyle}
                          onChangeText={(value) => setTitle(value)}
                          underlineColorAndroid="#f000"
                          placeholder="Title"
                          placeholderTextColor="#8b9cb5"
                          keyboardType="email-address"
                          returnKeyType="next"
                          blurOnSubmit={false}
                        />
                      </View>
                      {/* end title */}


                      {/* color */}
                      <View style={styles.selectFieldStyle}>
                      <Picker
                        style={styles.fontColor}
                        placeholder="Select Color"
                        selectedValue={selectedColor}
                        onValueChange={(itemValue, itemIndex) =>{
                          setselectedColor(itemValue);
                        }}
                      >
                        <Picker.Item style={styles.fontColor} label={'Color'} />
                        {
                          colors.map((item, index) => (
                            <Picker.Item style={styles.fontColor} key={index} label={item?.title} value={item?.title} />
                          ))
                        }
                      </Picker>
                      </View>
                       {/* end color */}


                      {/* inspiration */}
                      <View style={styles.selectFieldStyle}>
                      <Picker
                        style={styles.fontColor}
                        selectedValue={selectedInspiration}
                        onValueChange={(itemValue, itemIndex) =>{
                          setSelectedInspiration(itemValue);
                        }}
                      >
                        <Picker.Item style={styles.fontColor} label={'Inspiration'} />
                        {
                          inspirations.map((item, index) => (
                            <Picker.Item style={styles.fontColor} key={index} label={item?.title} value={item?.title} />
                          ))
                        }
                      </Picker>
                      </View>
                      {/* end inspiration */}

                      {/* item type */}
                      <View style={styles.selectFieldStyle}>
                      <Picker
                        style={styles.fontColor}
                        selectedValue={selectedType}
                        onValueChange={(itemValue, itemIndex) =>{
                          setSelectedType(itemValue);
                        }}
                      >
                       
                      <Picker.Item style={styles.fontColor} key={1} label={'Shirt'} value={'shirt'} />
                      <Picker.Item style={styles.fontColor} key={2} label={'Pant'} value={'pant'} />
                      <Picker.Item style={styles.fontColor} key={3} label={'Shoe'} value={'shoe'} />
                    
                      </Picker>
                      </View>
                      {/* end item type */}

                      
                      <View style={styles.SectionStyle}>
                        <TextInput
                          style={[ styles.inputStyle, styles.textAreaStyle]}
                          onChangeText={(value) =>
                            setdetails(value)
                          }
                          underlineColorAndroid="#f000"
                          placeholder="Description"
                          placeholderTextColor="#8b9cb5"
                          returnKeyType="next"
                          blurOnSubmit={false}
                          multiline={true}
                        />
                      </View>


                      <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => handleUploadPhoto()}
                        >
                        <Text style={styles.buttonTextStyle}>Upload File</Text>
                      </TouchableOpacity>

                      {file?.photoAsset?.uri &&
                       <View style={styles.SectionStyle}>
                       <Image
                        style={{width: 300, height: 350}}
                        source={{uri: file?.photoAsset?.uri}}
                        resizeMode={'cover'} // cover or contain its upto you view look
                        />
                        </View>
                      }
                      
                    
                      {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                          {errortext}
                        </Text>
                      ) : null}
                      <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>SAVE</Text>
                      </TouchableOpacity>
                  


                    {/* </KeyboardAvoidingView> */}

                    </KeyboardAwareScrollView>
                  </ScrollView>
                  
                </View>



            {/* </Animated.ScrollView> */}

       {/* </Animatable.View> */}

    </SafeAreaView>
  );
};
 
export default AddItem;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
   // margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#009d28',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },

  inputStyle: {
    flex: 1,
    color: '#8b9cb5',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  textAreaStyle: {
    height: 70,
    marginTop: 10,
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: '#8b9cb5',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  selectFieldStyle :{
    marginTop: 20,
    height:55, 
    color: '#8b9cb5', 
    marginLeft:30, 
    marginRight:35, 
    borderRadius:35, 
    borderWidth:1, 
    borderColor:'#dadae8'
  },
  fontColor : {
    color: '#8b9cb5',
  },
  
});