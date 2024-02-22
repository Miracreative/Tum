import React, { useState, useEffect, createContext } from 'react';
import { Text, View,  SafeAreaView, ImageBackground, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, StatusBar} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MapView from 'react-native-maps';
import {useTranslation} from 'react-i18next';
import {  useSelector, useDispatch } from 'react-redux';
import {area1, street1, build1, flat1, instr1} from './../../actions';
import BtnButton from '../../Components/Button/Button';
import {icons} from "../../constants";
import Header from '../../Components/Header/Header';
import styled from "./style.scss";
export default function DeliveryDetails({ navigation }) {
	
    const {t} = useTranslation();
    const latitude = useSelector(state => state.userInfo.latitude);
    const longitude = useSelector(state => state.userInfo.longitude);
    const currentAddress = useSelector(state => state.userInfo.currentAddress);
    const currentPhone = useSelector(state => state.userInfo.phone);

    const num = useSelector(state => state.childrens.children1.plan.sum);
    const long = useSelector(state => state.childrens.children1.plan.long);
    const dispatch = useDispatch();

    const [active, setActive] = useState(0);

    const myRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: .1,
        longitudeDelta: .1
    }

    const paymentMethods = [
        {
            title: t('creditCard'),
            icon: icons.visa
        },
        {
            title: t('applePay'),
            icon: icons.applePay
        }
    ]

    const paymentButtons = paymentMethods.map((paymentMethod, i) => {
        return (
            <View key={i} style = {{width: '100%'}}>
                 <Text style={[styled.delivery__text, {fontSize: RFValue ( 14,  740), marginTop: 20, fontWeight: 500}]} >{paymentMethod.title}</Text>
                <TouchableOpacity  onPress={() => {setActive(i)}} style=     {[styled.delivery__item, {backgroundColor: (active==i) ? '#F55926' : 'transparent'}]}>
                    <View style={[styled.delivery__shadow, {backgroundColor: (active==i) ? '#F55926' : 'transparent'}]}></View>
                    <Image 
                        resizeMode='contain'
                        style={[styled.delivery__image, {tintColor: (active==i) ? '#FFFFFF' : '#F55926'}]}
                        source={paymentMethod.icon}
                    />
                </TouchableOpacity>  
            </View>
           
        )
    })

  return (
    <View style={{flex: 1}}>
        <ImageBackground
            style={{flex: 1, backgroundColor: '#F3EDDF'}}
            resizeMode='contain'
            source={icons.backFull}>
                <SafeAreaView 
                // style={{paddingTop: StatusBar.currentHeight}}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            Keyboard.dismiss()
                            setIsShowKeyboard(false)
                            }}>
                        <ScrollView style={{position: 'relative', width: '100%'}}> 
                            <Header onPress={() => navigation.goBack()} isButtons={false} isStatus={false}/>
                            <Text style={[styled.delivery__title, {fontSize: RFValue ( 24,  740)}]}>{t('deliveryAddress')}</Text>
                                <View style={styled.delivery__container}>
                                    <MapView
                                        style={styled.delivery__map}
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
                                <Text style={[styled.delivery__address, {fontSize: RFValue ( 20,  740)}]}> {currentAddress} </Text>
                                <Text style={[styled.delivery__address, { fontSize: RFValue ( 24,  740), fontWeight: 700}]}> {currentPhone ? currentPhone : "+971 50 865 00 00"} </Text>
                               
                                        
                            <BtnButton onPress={() => {navigation.navigate('Auth')
                                                        }} title={t('change')} buttonStyle={{backgroundColor:  '#F55926',borderWidth: 2, borderColor: '#F55926', marginTop: 25, marginBottom: 40, opacity: 1 , pointerEvents:  'auto'}} textStyle={{color: 'rgba(244, 237, 225, 1)', }}/>
                            <View style={styled.delivery__border}></View>
                            <Text style={[styled.delivery__title, {fontSize: RFValue ( 24,  740)}]}>{t('method')}</Text>
                            {paymentButtons}
                            <View style={styled.delivery__plan}>
                                <Image style={styled.delivery__img}
                                        source={icons.doubleGexagon} />
                                <Text style={[styled.delivery__amount, {fontSize: RFValue ( 14,  740)}]}>{t('total')}</Text>
                                <Text style={[styled.delivery__price, {fontSize: RFValue ( 64,  740)}]}>{num}</Text>
                                <Text style={[styled.delivery__amount, {fontSize: RFValue ( 14,  740)}]}>{long}</Text>
                            </View>
                            <BtnButton onPress={() => {navigation.navigate('Begin')
                                                        }} title={t('continue')} buttonStyle={{backgroundColor:  '#F55926',borderWidth: 2, borderColor: '#F55926', marginTop: 25, marginBottom: 40, opacity: 1 , pointerEvents:  'auto'}} textStyle={{color: 'rgba(244, 237, 225, 1)', }}/>
                            <View style={styled.delivery__backDown}>
                                <Image style={styled.delivery__backImg}
                                        source={icons.backDown}/>
                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
        </ImageBackground>
    </View>
  );
}