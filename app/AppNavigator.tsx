import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '@/context/AuthContext';
import Login from './Login';
import TabLayout from './(tabs)/_layout';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { user } = useContext(AuthContext);

    return (
        <NavigationContainer independent>
            <Stack.Navigator>
                {user ? (
                    <Stack.Screen
                        name="Main"
                        component={TabLayout}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}