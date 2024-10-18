import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from './sign_in';
import SignUp from './sign_up';
import Index from './index';

const Stack = createNativeStackNavigator();

const linking = {
    prefixes: ['alphabook://', 'https://alphabook.com'],
    config: {
        screens: {
            Index: 'index',
            SignIn: 'sign-in',
            SignUp: 'sign-up',
        },
    },
};

export default function Landing() {

    return (
        <NavigationContainer independent linking={linking}>
            <Stack.Navigator initialRouteName="Index">
                <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};