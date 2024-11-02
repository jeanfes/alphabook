import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { landingNavigationRef } from './navigation';
import SignIn from './sign_in';
import SignUp from './sign_up';
import Index from './index';

const Stack = createNativeStackNavigator();

export default function Landing() {
    return (
        <NavigationContainer ref={landingNavigationRef} independent>
            <Stack.Navigator initialRouteName="Index">
                <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
