import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabLayout from './(tabs)/_layout';
import Landing from './(auth)/_layout';
import { useGlobalContext } from '@/context/GlobalContext';
import { useSecureStorage } from '@/hooks/storage/useSecureStorage';

const RootStack = createNativeStackNavigator();

export default function Navigator() {
    const { user, userMemory } = useGlobalContext();

    return (
        <RootStack.Navigator>
            {user || userMemory ? (
                <RootStack.Screen name="Main" component={TabLayout} options={{ headerShown: false }} />
            ) : (
                <RootStack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            )}
        </RootStack.Navigator>
    );
}
