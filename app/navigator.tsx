import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGlobalContext } from '@/context/GlobalContext';
import Landing from './(auth)/_layout';
import Main from './(tabs)/_layout';

const RootStack = createNativeStackNavigator();

export default function Navigator() {
    const { user, userMemory } = useGlobalContext();

    return (
        <RootStack.Navigator>
            {user || userMemory ? (
                <RootStack.Screen name="Main" component={Main} options={{ headerShown: false }} />
            ) : (
                <RootStack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            )}
        </RootStack.Navigator>
    );
}
