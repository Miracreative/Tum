import React, { useState, useEffect, createContext } from 'react';
import { Text, View,  SafeAreaView, Image} from 'react-native';
import * as Location from 'expo-location';
import MapView, {Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import {useTranslation} from 'react-i18next';
import {  useSelector } from 'react-redux';

import BtnButton from '../../Components/Button/Button';
import {icons} from "../../constants";
import Header from '../../Components/Header/Header';
import styled from "./style.scss";
export default function ApplyLocation({ navigation }) {
	
    const {t} = useTranslation();
    const latitude = useSelector(state => state.latitude);
    const longitude = useSelector(state => state.longitude);
    const currentAddress = useSelector(state => state.currentAddress);
    const myRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: .1,
        longitudeDelta: .1
    }
  return (
    <SafeAreaView style={styled.apply}>
        <Image
            style={styled.back}
            source={icons.back}/>
        <Header onPress={() => navigation.navigate("FirstLocation")}/>
            <View style={{position: 'relative', flex: 1
        }}>
        <View>
            <Text
            style={styled.apply__title}>
            {t('applyTitle')}
            </Text>
            <Text
                style={styled.apply__text}>
                {t('locationText')}
            </Text>
        </View>
        <View style={styled.apply__container}>
                <MapView
                    // onPress={(e) => console.log(e.nativeEvent.coordinate)}
                    style={styled.apply__map}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: .1,
                        longitudeDelta: .1

                    }}
                    region={myRegion}
                    showsUserLocation={true}
                    onRegionChangeComplete={region => {region}}
                    >
                   
                </MapView>
        </View>
        <View>
                    <Image 
                            source={icons.pin} 
                            style={styled.apply__image}/>
                    <Text style={styled.apply__address}>{currentAddress}</Text>
                        
                </View>
     <View style={styled.apply__btns}>
         <BtnButton onPress={() => navigation.navigate('Auth')} title={t('continue')} buttonStyle={{backgroundColor: '#F55926',borderWidth: 2, borderColor: '#F55926'}} textStyle={{color: 'rgba(244, 237, 225, 1)', }}/>
         <BtnButton onPress={() => navigation.navigate('ChooseLocation')} title={t('chooseMannualy')} buttonStyle={{backgroundColor: 'rgba(244, 237, 225, 1)', borderStyle: 'solid', borderWidth: 2, borderColor: 'transparent', width: '50%'}} textStyle={{color: '#0C0300'}}/>
     </View>
 </View>
</SafeAreaView>
  );
}
