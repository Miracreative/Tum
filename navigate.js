import React from 'react';
import { Image, Text } from 'react-native';
import Main from './Pages/Main/Main';
import Name from './Pages/Name/Name';
import Email from './Pages/Email/Email';
import Gender from './Pages/Gender/Gender';
import Results from './Pages/Results/Results';
import Location from './Pages/Location/Location';
import AutoLocation from './Pages/AutoLocation/AutoLocation';
import ChooseLocation from './Pages/ChooseLocation/ChooseLocation';
import ApplyLocation from './Pages/ApplyLocation/ApplyLocation';
import FirstDay from './Pages/FirstDay/FirstDay';
import Auth from './Pages/Authentification/Auth';
import AuthConfirm from './Pages/AuthentificationConfirm/AuthentificationConfirm';
import DeliveryDetails from './Pages/DeliveryDetails/DeliveryDetails';
import Begin from './Pages/Begin/Begin';
import PersonalCabenet from './Pages/PersonalCabenet/PersonalCabent';
import { icons } from './constants';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style:{
                    position: 'absolute',
                    bottom: 30, 
                    left: 30, 
                    right: 30, 
                    elevation: 0,
                    backgroundColor: "blue",
                    borderRadius: 20,
                    height: 60,

                }
            }}
            screenOptions={
                ({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === 'Support') {
                    iconName = focused ? icons.supportMenuActive : icons.supportMenu;
                    } else if (route.name === 'Delivery') {
                        iconName = focused ? icons.deliveryMenuActive : icons.deliveryMenu;
                    } else if (route.name === 'Account') {
                        iconName = focused ? icons.accountMenuActive : icons.accountMenu;
                    } else if (route.name === 'Entertaiment') {
                        iconName = focused ? icons.entertaimentMenuActive : icons.entertaimentMenu;
                    } else if (route.name === 'Catering') {
                        iconName = focused ? icons.cateringMenuActive : icons.cateringMenu;
                    }
                  return <Image source={iconName} style={{width: 32, height: 27, objectFit: 'contain', margin: 'auto'}} />
                },
                tabBarActiveTintColor: '#F3EDDF',
                tabBarInactiveTintColor: '#0C0300',
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 30, 
                    left: 30, 
                    right: 30, 
                    elevation: 0,
                    backgroundColor: "#ffffff",
                    borderRadius: 20,
                    height: 60,
                }
            })}
            >
            <Tab.Screen name='Delivery' component={PersonalCabenet}/>
            <Tab.Screen name='Support' component={PersonalCabenet}/>
            <Tab.Screen name='Account' component={PersonalCabenet}/>
            <Tab.Screen name='Entertaiment' component={PersonalCabenet}/>
            <Tab.Screen name='Catering' component={PersonalCabenet}/>
        </Tab.Navigator>
   )
}


const Stack = createNativeStackNavigator();

export default function Navigate() {

    return  <NavigationContainer>
        <Stack.Navigator
            // initialRouteName="Main"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="Main"
                component={Main}
            />

            <Stack.Screen
                name="Email"
                component={Email}
            />

            <Stack.Screen
                name="Gender"
                component={Gender}
            />
           
            <Stack.Screen
                name="Name"
                component={Name}
            />

            <Stack.Screen
                name="Results"
                component={Results}
            />
            <Stack.Screen
                name="FirstDay"
                component={FirstDay}
            />

            <Stack.Screen
                name="Location"
                component={Location}
            />

            <Stack.Screen
                name="AutoLocation"
                component={AutoLocation}
            />

            <Stack.Screen
                name="ChooseLocation"
                component={ChooseLocation}
            />
             <Stack.Screen
                name="ApplyLocation"
                component={ApplyLocation}
            />
            <Stack.Screen
                name="Auth"
                component={Auth}
            />

            <Stack.Screen
                name="AuthConfirm"
                component={AuthConfirm}
            />
            <Stack.Screen
                name="DeliveryDetails"
                component={DeliveryDetails}
            />

            <Stack.Screen
                name="Begin"
                component={Begin}
            />
             <Stack.Screen
                name="PersonalCabenet"
                component={PersonalCabenet}
            />

            <Stack.Screen
                name="Account"
                component={TabNavigator}
            />
        </Stack.Navigator>
    </NavigationContainer>;
   
}