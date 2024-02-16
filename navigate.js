import React from 'react';
import Main from './Pages/Main/Main';
import Name from './Pages/Name/Name';
import Email from './Pages/Email/Email';
import Gender from './Pages/Gender/Gender';
import Results from './Pages/Results/Results';

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
           
        </Stack.Navigator>
    </NavigationContainer>;
   
}