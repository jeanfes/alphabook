import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Index from './index';
import Favorite from './favorite';
import Settings from './settings';
import Profile from './profile';
import { IconHome, IconProfile, IconSaved, IconSettings } from '../../assets/icons/IconsTabLayout';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        OpenSansLight: require('../../assets/fonts/OpenSans-Light.ttf'),
        OpenSansRegular: require('../../assets/fonts/OpenSans-Regular.ttf'),
        OpenSansSemiBold: require('../../assets/fonts/OpenSans-SemiBold.ttf'),
        OpenSansBold: require('../../assets/fonts/OpenSans-Bold.ttf'),
        OpenSansExtraBold: require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
    });

    if (!loaded) {
        return null;
    }
    
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    paddingTop: 4,
                    paddingBottom: 4,
                },
            }}>
            <Tab.Screen
                name="Home"
                component={Index}
                options={{
                    tabBarActiveTintColor: '#EB5757',
                    title: 'Home',
                    tabBarLabelStyle: {
                        fontFamily: 'OpenSansRegular',
                        fontWeight: 500,
                    },
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
                    tabBarLabelStyle: {
                        fontFamily: 'OpenSansRegular',
                        fontWeight: 500,
                    },
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
                    tabBarLabelStyle: {
                        fontFamily: 'OpenSansRegular',
                        fontWeight: 500,
                    },
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
                    tabBarLabelStyle: {
                        fontFamily: 'OpenSansRegular',
                        fontWeight: 500,
                    },
                    tabBarIcon: ({ focused }) => (
                        <IconProfile color={focused ? '#EB5757' : '#fff'} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}