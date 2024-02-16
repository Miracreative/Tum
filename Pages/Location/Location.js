import React from 'react';
import { Text, View, SafeAreaView, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import BtnButton from '../../Components/Button/Button';
import {icons} from "../../constants";
import Header from '../../Components/Header/Header';
import styled from "./style.scss";
export default function Location({ navigation }) {
    const {t} = useTranslation();
	
  return (
    <SafeAreaView style={styled.location}>
           <Image
                style={styled.location__img}
                source={icons.firstLocation}/>
           <Image
            style={styled.back}
            source={icons.back}/>
		<Header onPress={() => navigation.navigate("Main")}/>
            <View style={{position: 'relative', flex: 1
        }}>
     
            <Text
                style={styled.location__title}>
                {t('locationTitle')}
            </Text>
            <Text
                style={styled.location__text}>
                {t('locationText')}
            </Text>
            <View
                style={{
                    position: 'absolute',
                    bottom: 20,
                    width: '100%',
                }}>
                <BtnButton onPress={() => navigation.navigate('AutoLocation')} title={t('shareLocation')} buttonStyle={{backgroundColor: '#F55926',borderWidth: 2, borderColor: '#F55926'}} textStyle={{color: 'rgba(244, 237, 225, 1)', }}/>
                <BtnButton onPress={() => navigation.navigate('ChooseLocation')} title={t('chooseMannualy')} buttonStyle={{backgroundColor: 'rgba(244, 237, 225, 1)', borderStyle: 'solid', borderWidth: 2, borderColor: 'transparent', width: '50%'}} textStyle={{color: '#0C0300'}}/>
            </View>
        </View>
    </SafeAreaView>
  );
}
