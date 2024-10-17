import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '@/context/AuthContext';
import Navigator from './navigator';

export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer independent>
        <Navigator />
      </NavigationContainer>
    </AuthProvider>
  );
}