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

    const currentLanguage = useSelector(state => state.language);
    const currentPhone = useSelector(state => state.userInfo.phone);
    const userName = useSelector(state => state.userInfo.userName);
    const userEmail = useSelector(state => state.userInfo.email);
    const userCardNumber = useSelector(state => state.userInfo.cardNumber);
    const num = useSelector(state => state.childrens.children1.plan.sum);
    const long = useSelector(state => state.childrens.children1.plan.long);
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [language, setLanguage] = useState(currentLanguage);

  const pickImage = async () => { 
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{flex: 1, width: '100%', backgroundColor: '#FFFFFFF', }}>
      <SafeAreaView style={{flex: 1, width: '100%', backgroundColor: '#FFFFFFF'}}>
          <ScrollView style={{position: 'relative',  backgroundColor: '#F3EDDF', marginTop: StatusBar.currentHeight}}> 
          <Image
            style={styled.back}
            source={icons.back}/>
          <Image
            style={styled.image}
            source={icons.redTitle}/>
          <TouchableOpacity style={styled.personal__icon} onPress={pickImage}>
              <ImageBackground 
              resizeMode='contain'
              style={{ width: 150, height: 150}}
              source={icons.photoPhone} >
                  {image? <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 120, marginTop: 17, marginLeft: 13, borderWidth: 2, borderColor: 'white' }} /> :
                  <Image source={icons.boyRing} style={{ width: 120, height: 120, borderRadius: 120, marginTop: 17, marginLeft: 13 }} />
                  }
              </ImageBackground>
          </TouchableOpacity>
          <Text style={[styled.personal__text, {fontSize: RFValue ( 20,  740)}]}>{userName}</Text>
          <Text style={[styled.personal__text, {fontSize: RFValue ( 16,  740), paddingBottom: 40}]}>{userEmail}</Text>
          <View style={styled.personal__box}>
            <View style={styled.personal__stroke}>
              <Text style={[styled.personal__descr, {fontSize: RFValue ( 16,  740)}]}>{t('method')}</Text>
              <TouchableOpacity style={styled.personal__block}>
                <Text style={[styled.personal__active, {fontSize: RFValue ( 16,  740)}]}>{t('addCard')}</Text>
                <Image
                  source={icons.toRight}
                  style={styled.personal__img}
                  />
              </TouchableOpacity>
            </View>
            <View style={styled.personal__stroke}>
              <Text style={[styled.personal__descr, {fontSize: RFValue ( 16,  740)}]}>{t('lang')}</Text>
              <TouchableOpacity style={styled.personal__block}>
                <Text style={[styled.personal__active, {fontSize: RFValue ( 16,  740)}]}>{language == 'en' ? t('english') : t('arabian')}</Text>
                <Image
                  source={icons.toRight}
                  style={styled.personal__img}
                  />
              </TouchableOpacity>
            </View>
            <View style={styled.personal__stroke}>
              <Text style={[styled.personal__descr, {fontSize: RFValue ( 16,  740)}]}>{t('history')}</Text>
              <TouchableOpacity style={styled.personal__block}>
                <Image
                  source={icons.toRight}
                  style={styled.personal__img}
                  />
              </TouchableOpacity>
            </View>
            <View style={styled.personal__stroke}>
              <Text style={[styled.personal__descr, {fontSize: RFValue ( 16,  740)}]}>{t('dishes')}</Text>
              <TouchableOpacity style={styled.personal__block}>
                <Image
                  source={icons.toRight}
                  style={styled.personal__img}
                  />
              </TouchableOpacity>
            </View>
            <View style={styled.personal__stroke}>
              <Text style={[styled.personal__descr, {fontSize: RFValue ( 16,  740), fontWeight: 500}]}>{userEmail}</Text>
              <TouchableOpacity style={styled.personal__block}>
                <Image
                  source={icons.toRight}
                  style={styled.personal__img}
                  />
              </TouchableOpacity>
            </View>
            <View style={styled.personal__stroke}>
              <Text style={[styled.personal__descr, {fontSize: RFValue ( 16,  740), fontWeight: 500}]}>{userCardNumber ? userCardNumber : t('addCard')}</Text>
              <TouchableOpacity style={styled.personal__block}>
                <Image
                  source={icons.toRight}
                  style={styled.personal__img}
                  />
              </TouchableOpacity>
            </View>
          </View>
          <BtnButton onPress={() => {console.log('logout')}} title={t('logOut')} buttonStyle={{marginTop: 30, backgroundColor:"rgba(255, 0, 0, 1)", marginBottom: 30}} textStyle={{color: 'rgba(244, 237, 225, 1)'}}/>
          <View style={styled.personal__family}>
            <Text style={[styled.personal__title, {fontSize: RFValue ( 24,  740), paddingBottom: 40}]}>{t('family')}</Text>
          </View>
          </ScrollView>

          
      </SafeAreaView>
    </View>
  );
}