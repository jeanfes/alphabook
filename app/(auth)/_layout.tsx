import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './index';
import SignIn from './sign_in';
import SignUp from './sign_up';

const Stack = createNativeStackNavigator();

export default function Landing() {
    return (
        <Stack.Navigator initialRouteName="IndexLanding">
            <Stack.Screen name="IndexLanding" component={Index} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
