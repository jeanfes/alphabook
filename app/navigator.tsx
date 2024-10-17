import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '@/context/AuthContext';
import TabLayout from './(tabs)/_layout';
import Landing from './(auth)/_layout';

const Stack = createNativeStackNavigator();

export default function Navigator() {
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
                        name="Landing"
                        component={Landing}
                        options={{ headerShown: false }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}