import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, Image, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as Location from 'expo-location';
import MapView, {Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import {useTranslation} from 'react-i18next';
import BottomSheet from '@gorhom/bottom-sheet';
import 'react-native-gesture-handler';
import {addr, lat, long} from './../../actions';
import { useDispatch, useSelector } from 'react-redux';
import BtnButton from '../../Components/Button/Button';
import {icons} from "../../constants";
import Header from '../../Components/Header/Header';
import styled from "./style.scss";
export default function ChooseLocation({ navigation }) {
    const latitude = useSelector(state => state.latitude);
    const longitude = useSelector(state => state.longitude);
    const dispatch = useDispatch();
    const {t} = useTranslation();
	const [location, setLocation] = useState();
    const [available, setAvailable] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
        'Wait, we are fetching you location...'
      );

    useEffect(() => {
        const getPermissions = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();

            if( status !== 'granted') {
                Alert.alert(
                    'Permission not granted',
                    'Allow the app to use location service.',
                    [{ text: 'OK' }],
                    { cancelable: false })
            }

            let currentLocation = await Location.getCurrentPositionAsync();
            setLocation(currentLocation);
            dispatch(lat(currentLocation.coords.latitude))
            dispatch(long(currentLocation.coords.longitude))
            let { coords } = await Location.getCurrentPositionAsync();
            if(coords) {
                const {latitude, longitude} = coords;
                let response = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude
                })
                for (let item of response) {
                    let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
              
                setDisplayCurrentAddress(address);
                localStorage.setItem("address", displayCurrentAddress);
            }
        } }
        const CheckIfLocationEnabled = async () => {
            let enabled = await Location.hasServicesEnabledAsync();
        
            if (!enabled) {
              console.log('not enabled')
            } else {
              setLocationServiceEnabled(enabled);
              console.log(enabled)
            }
        }
        getPermissions()
        
        // CheckIfLocationEnabled();
    }, [])
   
    const snapPoints = useMemo(() => ["45%", "5%"], []);
  return (
    
        <View style={styled.choose}>
            <Header onPress={() => navigation.goBack()} isButtons={false}/>
            <View 
            style={{
                flex: 1
            }}>
                <LinearGradient
                    colors={['black', 'gray', 'transparent']}
                    style={styled.choose__gradient}>
                    </LinearGradient>
                <MapView
                    onPress={(e) => {
                        dispatch(lat(e.nativeEvent.coordinate.latitude))
                        dispatch(long(e.nativeEvent.coordinate.longitude))
                        const getPermissions2 = async () => {
                         let response = await Location.reverseGeocodeAsync({
                            latitude : e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                        for (let item of response) {
                            let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                            setDisplayCurrentAddress(address)
                            if(item.city?.indexOf('Riyadh') || item.city?.indexOf('الرياض')) {
                                setAvailable(true)
                            } else {
                                setAvailable(false)
                            }
                        }
                    }
                        getPermissions2();
                    }}
                    style={styled.choose__map}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: .1,
                        longitudeDelta: .1

                    }}
                    region={{latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: .1,
                            longitudeDelta: .1}}
                    showsUserLocation={true}
                    onRegionChangeComplete={region => {region}}
                    >
                    <Marker 
                        coordinate={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: .1,
                            longitudeDelta: .1
                        }} 
                        style={styled.choose__pin}>
                            <Image
                            source={icons.pin} />
                    </Marker>
                </MapView>
            <BottomSheet 
                index={0}
                snapPoints={snapPoints}
                backgroundStyle={borderRadius= '20px 20px 0 0' }>
                <View>
                    <Image 
                            source={icons.pin} 
                            style={styled.choose__image}/>
                    <Text style={styled.choose__address}>{displayCurrentAddress}</Text>
                    {
                        available ? null : <Text style={[styled.choose__text, {color: 'red', fontSize: 14}]}>invalid delivery area</Text>
                    }
                        <BtnButton onPress={() => {
                            navigation.navigate("ApplyLocation");
                            dispatch(addr(displayCurrentAddress))
                        }} title={t('add')} buttonStyle={{backgroundColor: '#F55926', opacity: available ? 1 : 0.7, pointerEvents: available ? 'auto' : 'none'}} textStyle={{color: 'rgba(244, 237, 225, 1)'}}/>
                </View>
            </BottomSheet>
            </View>
    </View>
    
    
  );
}
