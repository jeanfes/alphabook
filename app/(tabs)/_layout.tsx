import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Index from './index';
import Favorite from './favorite';
import Settings from './settings';
import Profile from './profile';
import { IconHome, IconProfile, IconSaved, IconSettings } from '../../assets/icons/IconsTabLayout';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>
            <Tab.Screen
                name="Home"
                component={Index}
                options={{
                    tabBarActiveTintColor: '#EB5757',
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <IconHome color={focused ? '#EB5757' : '#fff'} />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={Favorite}
                options={{
                    title: 'Favorite',
                    tabBarActiveTintColor: '#EB5757',
                    tabBarIcon: ({ focused }) => (
                        <IconSaved color={focused ? '#EB5757' : '#fff'} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: 'Settings',
                    tabBarActiveTintColor: '#EB5757',
                    tabBarIcon: ({ focused }) => (
                        <IconSettings color={focused ? '#EB5757' : '#fff'} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: 'Profile',
                    tabBarActiveTintColor: '#EB5757',
                    tabBarIcon: ({ focused }) => (
                        <IconProfile color={focused ? '#EB5757' : '#fff'} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}