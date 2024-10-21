import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '@/context/AuthContext';
import TabLayout from './(tabs)/_layout';
import Landing from './(auth)/_layout';

const RootStack = createNativeStackNavigator();

export default function Navigator() {
    const { user } = useContext(AuthContext);

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
