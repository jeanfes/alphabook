import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabLayout from './(tabs)/_layout';
import Landing from './(auth)/_layout';
import { useGlobalContext } from '@/context/GlobalContext';

const RootStack = createNativeStackNavigator();

export default function Navigator() {
    const { user } = useGlobalContext();

    return (
        <RootStack.Navigator>
            {user ? (
                <RootStack.Screen name="Main" component={TabLayout} options={{ headerShown: false }} />
            ) : (
                <RootStack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            )}
        </RootStack.Navigator>
    );
}
