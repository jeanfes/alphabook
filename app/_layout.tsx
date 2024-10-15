import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '@/context/AuthContext';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer independent>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}