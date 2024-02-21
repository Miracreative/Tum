import React from 'react';
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

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

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
        </Stack.Navigator>
    </NavigationContainer>;
   
}