import React, { useState, useEffect, createContext } from 'react';
import { Text, View,  SafeAreaView, Image, ImageBackground, KeyboardAvoidingView, Platform, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, TextInput, StatusBar} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MapView from 'react-native-maps';
import {useTranslation} from 'react-i18next';
import {  useSelector, useDispatch } from 'react-redux';
import {area1, street1, build1, flat1, instr1} from './../../actions';
import BtnButton from '../../Components/Button/Button';
import {icons} from "../../constants";
import Header from '../../Components/Header/Header';
import styled from "./style.scss";
export default function ApplyLocation({ navigation }) {
	
    const {t} = useTranslation();
    const latitude = useSelector(state => state.userInfo.latitude);
    const longitude = useSelector(state => state.userInfo.longitude);
    const currentAddress = useSelector(state => state.userInfo.currentAddress);
    const currentArea = useSelector(state => state.childrens.children1.deliveryDetails.area);
    const currentBuilding = useSelector(state => state.childrens.children1.deliveryDetails.building);
    const currentFlat = useSelector(state => state.childrens.children1.deliveryDetails.flat);
    const currentStreet = useSelector(state => state.childrens.children1.deliveryDetails.street);
    const currentDeliveryInstructions = useSelector(state => state.childrens.children1.deliveryDetails.deliveryInstructions);
    const dispatch = useDispatch()

    const myRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: .1,
        longitudeDelta: .1
    }
    const [activePlus, setActivePlus] = useState(false);
    const [activeHome, setActiveHome] = useState(0);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [area, setArea] = useState(currentArea);
    const [areaValid, setAreaValid] = useState(true);
    const [building, setBuilding] = useState(currentBuilding);
    const [buildingValid, setBuildingValid] = useState(true);
    const [street, setStreet] = useState(currentStreet);
    const [streetValid, setStreetValid] = useState(true);
    const [flat, setFlat] = useState(currentFlat);
    const [instructions, setInstructions] = useState(currentDeliveryInstructions);

    const [activeContinue, setActiveContinue] = useState(true);   

    let addresses = [
        t('home')
    ];

    const validate = (text, validator, num) => {
        if(text.length >= num) {
            validator(true)
            if(streetValid && areaValid && buildingValid && area.length >= 1, street.length >= 1 && building.length >= 1) {
                setActiveContinue(true)
            }
        } else {
            validator(false)
            setActiveContinue(false)
        }
    }

    const addressesList = addresses.map((item, i) => {
  
        return (
            <TouchableOpacity onPress={() => setActiveHome(i)} style={[styled.apply__item, {width: 'auto', backgroundColor: (activeHome==i) ? '#FF9D7D' : '#FFFFFF'}]}>
              <View style={[styled.apply__shadow, {backgroundColor: (activeHome==i) ? '#F55926' : '#FFFFFF'}]}></View>
              <Text style={[styled.apply__date, {color: (activeHome==i) ? '#F3EDDF' : '#F55926', fontWeight: (activeHome==i) ? 500 : 300, fontSize: RFValue ( 14,  740)} ]}  key={i}>{item}</Text>
            </TouchableOpacity>  
        )
    });

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      >
        <View style={{flex: 1}}>
            <ImageBackground
                style={{flex: 1, backgroundColor: '#F3EDDF'}}
                resizeMode='contain'
                source={icons.backFull}>
                    <SafeAreaView style={{paddingTop: StatusBar.currentHeight}}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                Keyboard.dismiss()
                                setIsShowKeyboard(false)
                              }}>
                            <ScrollView>
                                <Header onPress={() => navigation.goBack()} isButtons={false} isStatus={false}/>
                                <Text style={[styled.apply__title, {fontSize: RFValue ( 24,  740)}]}>{t('editAddress')}</Text>
                                    <View style={styled.apply__container}>
                                        <MapView
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
                                    <Text style={[styled.apply__address, {fontSize: RFValue ( 20,  740)}]}>{currentAddress}</Text>
                                    <View style={styled.apply__border}></View>
                                    <Text style={[styled.apply__title, {fontSize: RFValue ( 24,  740)}]}>{t('home')}</Text>
                                    <View style={styled.apply__addressesContainer}>
                                        {addressesList}
                                        <TouchableOpacity onPress={() => console.log('+++')} style={[styled.apply__item, {width: 'auto', backgroundColor: activePlus ? '#FF9D7D' : '#FF9D7D'}]}>
                                        <View style={[styled.apply__shadow, {backgroundColor: activePlus ? '#FF9D7D' : '#FF9D7D', borderColor: 'transparent'}]}></View>
                                                <Text style={[styled.apply__date, {color: '#FFFFFF', fontWeight: (activePlus) ? 500 : 300, fontSize: RFValue ( 14,  740)} ]}>+</Text>
                                        </TouchableOpacity> 
                                    </View>
                                <View style={styled.apply__border}></View>
                                <Text style={[styled.apply__address, {fontSize: RFValue ( 14,  740), marginBottom: 5, marginTop: 15}]}>{t('area')}</Text>
                                <TextInput
                                    style={[styled.apply__input, {borderColor: areaValid ? 'rgba(12, 3, 0, 0.5)' : 'rgba(245, 89, 38, 1)'}]}
                                    onChangeText={text => {setArea(()=>text)
                                                            validate(area, setAreaValid, 1)}}
                                    onFocus={() => {setIsShowKeyboard(true)}}
                                    value={area}
                                    onSubmitEditing={() => {Keyboard.dismiss; setIsShowKeyboard(false) }}/>
                                <View style={styled.apply__wrapper}>
                                    <View style={{width: '49%'}}>
                                        <Text style={[styled.apply__address, {fontSize: RFValue ( 14,  740), marginBottom: 5, marginTop: 15}]}>{t('building')}</Text>
                                        <TextInput
                                            style={[styled.apply__input, {borderColor: buildingValid ? 'rgba(12, 3, 0, 0.5)' : 'rgba(245, 89, 38, 1)'}]}
                                            onChangeText={text => {setBuilding(()=>text)
                                                                    validate(building, setBuildingValid, 0)}}
                                            onFocus={() => {setIsShowKeyboard(true)}}
                                            value={building}
                                            onSubmitEditing={() => {Keyboard.dismiss; setIsShowKeyboard(false) }}/>
                                    </View>
                                    <View style={{width: '49%'}}>
                                        <Text style={[styled.apply__address, {fontSize: RFValue ( 14,  740), marginBottom: 5, marginTop: 15}]}>{t('flat')}</Text>
                                        <TextInput
                                            style={[styled.apply__input, {borderColor:'rgba(12, 3, 0, 0.5)'}]}
                                            onChangeText={text => {setFlat(()=>text)}}
                                            onFocus={() => {setIsShowKeyboard(true)}}
                                            value={flat}
                                            onSubmitEditing={() => {Keyboard.dismiss; setIsShowKeyboard(false) }}/>
                                    </View>
                                </View>
                                <Text style={[styled.apply__address, {fontSize: RFValue ( 14,  740), marginBottom: 5, marginTop: 15}]}>{t('street')}</Text>
                                <TextInput
                                    style={[styled.apply__input, {borderColor: streetValid ? 'rgba(12, 3, 0, 0.5)' : 'rgba(245, 89, 38, 1)'}]}
                                    onChangeText={text => {setStreet(()=>text)
                                                            validate(street, setStreetValid, 1)}}
                                    onFocus={() => {setIsShowKeyboard(true)}}
                                    value={street}
                                    onSubmitEditing={() => {Keyboard.dismiss; setIsShowKeyboard(false) }}/>
                                <Text style={[styled.apply__address, {fontSize: RFValue ( 14,  740), marginBottom: 5, marginTop: 15}]}>{t('instructions')}</Text>
                                <TextInput
                                    style={[styled.apply__input, {borderColor: 'rgba(12, 3, 0, 0.5)'}]}
                                    onChangeText={text => {setInstructions(()=>text)}}
                                    onFocus={() => {setIsShowKeyboard(true)}}
                                    value={instructions}
                                    onSubmitEditing={() => {Keyboard.dismiss; setIsShowKeyboard(false) }}/>
                                <BtnButton onPress={() => {navigation.navigate('DeliveryDetails')
                                                            dispatch(area1(area))
                                                            dispatch(street1(street))
                                                            dispatch(build1(building))
                                                            dispatch(flat1(flat))
                                                            dispatch(instr1(instructions))}} title={t('continue')} buttonStyle={{backgroundColor:  '#F55926',borderWidth: 2, borderColor: '#F55926', marginTop: 25, marginBottom: 40, opacity: activeContinue ? 1 : 0.8, pointerEvents: activeContinue ? 'auto' : 'none'}} textStyle={{color: 'rgba(244, 237, 225, 1)', }}/>
                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </SafeAreaView>
            </ImageBackground>
        </View>
      </KeyboardAvoidingView>
   
  );
}