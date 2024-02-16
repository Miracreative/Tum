import React, {useState} from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView,ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';
import 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {gen1} from './../../actions';
import { useDispatch} from 'react-redux';
import BtnButton from '../../Components/Button/Button';
import {icons} from "../../constants";
import Header from '../../Components/Header/Header';
import styled from "./style.scss"; 
export default function Gender({ navigation }) {

  let {t} = useTranslation();
  const [gender, setGender] = useState(null);
  const dispatch = useDispatch();

  return (
    
        <View style={styled.gender}>
          <ImageBackground
            resizeMode="cover"
            style={styled.back}
            source={icons.backFull}>
              <SafeAreaView style={{flex:1, justifyContent: 'space-between', alignItems: 'center'}}>
                <Header style={{flex: 0.1}} onPress={() => navigation.goBack()} isButtons={false}/>
                <Text style={[styled.gender__title, {fontSize: RFValue ( 24,  740)}]}>{t('genderTitle')}</Text>
                <Text style={[styled.gender__descr, {fontSize: RFValue ( 14,  740)}]}>{t('genderDescr')}</Text>
                <TouchableOpacity style={styled.gender__iconContainer}
                                  onPress={() => setGender('boy')}>
                  <Image style={styled.gender__icon}
                          source={(gender=='boy') ? icons.redBoy : icons.boy} />
                  <Text style={[styled.gender__text, {fontSize: RFValue ( 20,  740)}]}>{t('boy')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styled.gender__iconContainer}
                                  onPress={() => setGender('girl')}>
                  <Image style={styled.gender__icon}
                          source={(gender=='girl') ? icons.redGirl : icons.girl} />
                  <Text style={[styled.gender__text, {fontSize: RFValue ( 20,  740)}]}>{t('girl')}</Text>
                </TouchableOpacity>
                <BtnButton onPress={() => {dispatch(gen1(gender))
                                            navigation.navigate('Name')}
                                            } title={t('next')} buttonStyle={{backgroundColor: '#F55926',borderWidth: 2, borderColor: '#F55926', opacity: gender ? 1 : 0.7, pointerEvents: gender ? 'auto' : 'none', marginBottom: 40}} textStyle={{color: 'rgba(244, 237, 225, 1)', }}/>
              </SafeAreaView>
          </ImageBackground>
    </View>
  );
}
