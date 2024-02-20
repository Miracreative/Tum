import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, Image, Alert, SafeAreaView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import {useTranslation} from 'react-i18next';
import BottomSheet from '@gorhom/bottom-sheet';
import 'react-native-gesture-handler';
import {addr, lat, long, build1, street1, area1} from './../../actions';
import { useDispatch, useSelector } from 'react-redux';
import BtnButton from '../../Components/Button/Button';
import {icons} from "../../constants";
import Header from '../../Components/Header/Header';
import styled from "./style.scss";
export default function AutoLocation({ navigation }) {
    const latitude = useSelector(state => state.userInfo.latitude);
    const longitude = useSelector(state => state.userInfo.longitude);
    
    const dispatch = useDispatch();
    const {t} = useTranslation();
	const [location, setLocation] = useState();
    const [address, setAddress] = useState();
    const [area, setArea] = useState();
    const [street, setStreet] = useState();
    const [building, setBuilding] = useState()
    // const [latitude, setLatitude] = useState(47.4217937);
    // const [longitude, setLongtitude] = useState(-122.083922);
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
                setArea(item.city);
                setStreet(item.street);
                setBuilding(item.name);
                setDisplayCurrentAddress(address);
                // localStorage.setItem("address", displayCurrentAddress);
            }
        } }
        const CheckIfLocationEnabled = async () => {
            let enabled = await Location.hasServicesEnabledAsync();
        
            if (!enabled) {
              console.log('fack')
            } else {
              setLocationServiceEnabled(enabled);
              console.log(enabled)
            }
        }
        getPermissions()
        
        // CheckIfLocationEnabled();
    }, [])
    const snapPoints = useMemo(() => ["45%", "5%"], []);


    // const geocode = async () => {
    //     const geocodedLocation = await Location.geocodeAsync(address)
    //     console.log(geocodedLocation)
    // }

    // const reverseGeocode = async () => {
    //     const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
    //         longtitude: location.coords.longtitude,
    //         latitude: location.coords,latitude
    //     });

    //     console.log(reverseGeocodeAddress)
    // }
    const myRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: .1,
        longitudeDelta: .1
    }
   
  return (
    
        <View style={styled.location}>
            <SafeAreaView style={styled.location}>
                <Header onPress={() => navigation.goBack()} isButtons={false}/>
                <LinearGradient
                    colors={['black', 'gray', 'transparent']}
                    style={styled.location__gradient}>
                </LinearGradient>
                <MapView style={styled.location__map}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: .1,
                        longitudeDelta: .1

                    }}
                    region={myRegion}
                        >
                    <Marker 
                        coordinate={myRegion} 
                        // draggable
                        // onDragEnd={(e) => setLatitude(e.nativeEvent.coordinate.latitude)}
                        style={styled.location__pin}>
                            <Image
                            source={icons.pin} />
                    </Marker>
                </MapView>
                <BottomSheet 
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={borderRadius= '20px 20px 0 0' }
                    >
                    <View style={{justifyContent: 'space-between'}}> 
                        <Image 
                                source={icons.pin} 
                                style={styled.location__image}/>
                        <Text style={styled.location__address}>{displayCurrentAddress}</Text>
                            <BtnButton onPress={() => {
                                navigation.navigate("ApplyLocation");
                                dispatch(addr(displayCurrentAddress))
                                dispatch(area1(area))
                                dispatch(street1(street))
                                dispatch(build1(building))
                            }} title={t('add')} buttonStyle={{backgroundColor: '#F55926'}} textStyle={{color: 'rgba(244, 237, 225, 1)'}}/>
                    </View>
                </BottomSheet>
            </SafeAreaView>
    </View>
    
    
  );
}
