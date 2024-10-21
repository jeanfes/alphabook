import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  Text, Animated, StyleSheet } from 'react-native';
import Favorites from './favorites';
import Settings from './settings';
import Profile from './profile';
import { IconHome, IconProfile, IconSaved, IconSettings } from '../../assets/icons/IconsTabLayout';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import StackIndex from './index';

const Tab = createBottomTabNavigator();

const AnimatedLabel = ({ focused, title }: { focused: boolean; title: string }) => {
    const maxHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(maxHeight, {
            toValue: focused ? 20 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [focused]);

    return <Animated.View style={[styles.labelContainer, { maxHeight }]}>{focused && <Text style={styles.label}>{title}</Text>}</Animated.View>;
};

const styles = StyleSheet.create({
    labelContainer: {
        overflow: 'hidden',
    },
    label: {
        fontSize: 10,
        fontFamily: 'OpenSansRegular',
        fontWeight: '500',
        color: '#EB5757',
    },
});

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
            }}
        >
            <Tab.Screen
                name="Home"
                component={StackIndex}
                options={{
                    title: 'Home',
                    tabBarLabel: ({ focused }) => <AnimatedLabel focused={focused} title="Home" />,
                    tabBarIcon: ({ focused }) => <IconHome color={focused ? '#EB5757' : '#fff'} />,
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    title: 'Favorites',
                    tabBarLabel: ({ focused }) => <AnimatedLabel focused={focused} title="Favorites" />,
                    tabBarIcon: ({ focused }) => <IconSaved color={focused ? '#EB5757' : '#fff'} />,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: 'Settings',
                    tabBarLabel: ({ focused }) => <AnimatedLabel focused={focused} title="Settings" />,
                    tabBarIcon: ({ focused }) => <IconSettings color={focused ? '#EB5757' : '#fff'} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: 'Profile',
                    tabBarLabel: ({ focused }) => <AnimatedLabel focused={focused} title="Profile" />,
                    tabBarIcon: ({ focused }) => <IconProfile color={focused ? '#EB5757' : '#fff'} />,
                }}
            />
        </Tab.Navigator>
    );
}
