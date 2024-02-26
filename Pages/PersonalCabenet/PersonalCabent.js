import React, { useState, useEffect, createContext } from 'react';
import { Text, View,  SafeAreaView, ImageBackground, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, StatusBar} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MapView from 'react-native-maps';
import {useTranslation} from 'react-i18next';
import {  useSelector, useDispatch } from 'react-redux';
import {area1, street1, build1, flat1, instr1} from './../../actions';
import BtnButton from '../../Components/Button/Button';
import {icons} from "../../constants";
import * as ImagePicker from 'expo-image-picker';
import styled from "./style.scss";
export default function PersonalCabenet({ navigation }) {
	
    const {t} = useTranslation();
    const currentPhone = useSelector(state => state.userInfo.phone);

    const num = useSelector(state => state.childrens.children1.plan.sum);
    const long = useSelector(state => state.childrens.children1.plan.long);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // gender1 == 'boy' ? setImage(icons.boyRing) : setImage(icons.girlRing)
    }
  };

  return (
    <View style={{flex: 1}}>
        <ImageBackground
            style={{flex: 1, backgroundColor: '#F3EDDF'}}
            resizeMode='contain'
            source={icons.backFull}>
                <SafeAreaView>
                    <ScrollView style={{position: 'relative', width: '100%', paddingTop: StatusBar.currentHeight}}> 
                    <Image
						style={styled.image}
						source={icons.redTitle}/>
                    <TouchableOpacity style={styled.personal__icon} onPress={pickImage}>
                        <ImageBackground 
                        resizeMode='contain'
                        style={{ width: 150, height: 150}}
                        source={icons.photoPhone} >
                            {image? <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 120, marginTop: 17, marginLeft: 13, borderWidth: 2, borderColor: 'white', borderStyle: 'solid' }} /> :
                            <Image source={icons.boyRing} style={{ width: 120, height: 120, borderRadius: 120, marginTop: 17, marginLeft: 13 }} />
                            }
                        <Text></Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
        </ImageBackground>
    </View>
  );
}