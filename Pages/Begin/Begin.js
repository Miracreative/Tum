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
export default function Begin({ navigation }) {

  let {t} = useTranslation();
  const [gender, setGender] = useState(null);
  const dispatch = useDispatch();

  return (
    
        <View style={styled.begin}>
          <ImageBackground
            resizeMode="cover"
            style={styled.back}
            source={icons.backFull}>
              <SafeAreaView style={{flex:1, justifyContent: 'space-between', alignItems: 'center', position: 'relative'}}>
                <Image
                    style={{position: 'absolute', top: '9%', right: '19%', width: 32, height: 32}}
                    source={icons.flower}/>
                <Image
                    style={{position: 'absolute', top: '29%', right: '7%'}}
                    source={icons.flower}/>
                <Image
                    style={{position: 'absolute', top: '59%', left: '7%'}}
                    source={icons.flower}/>
                <Image
                    style={{position: 'absolute', top: '27%', left: '12%'}}
                    source={icons.star}/>
                <Header style={{flex: 0.1}} onPress={() => navigation.goBack()} isButtons={false}/>
                <Image
                    style={styled.image}
                    source={icons.redTitle}/>
                <View  style={{flex: 0.8, width: '100%'}}>
                    <ImageBackground
                    resizeMode="contain"
                    style={styled.back}
                    source={icons.potato}>

                        <Text style={[styled.begin__text, {fontSize: RFValue ( 20,  740)}]}>{t("letsGo")}</Text>

                    </ImageBackground>
                </View>
                <BtnButton onPress={() => {dispatch(gen1(gender))
                                            navigation.navigate('Name')}
                                            } title={t('begin')} buttonStyle={{backgroundColor: '#F55926',borderWidth: 2, borderColor: '#F55926', marginBottom: 40}} textStyle={{color: 'rgba(244, 237, 225, 1)', }}/>
              </SafeAreaView>
          </ImageBackground>
    </View>
  );
}
