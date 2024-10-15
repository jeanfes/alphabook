import { Tabs } from 'expo-router';
import React from 'react';
import { IconHome, IconProfile, IconSaved, IconSettings } from '../../assets/icons/Icons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarActiveTintColor: '#EB5757',
                    tabBarIcon: ({ focused }) => (
                        <>
                            {focused ? (
                                <IconHome color='#EB5757' />
                            ) : (
                                <IconHome color='#fff' />
                            )
                            }
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name="favorite"
                options={{
                    title: 'Favorite',
                    tabBarActiveTintColor: '#EB5757',
                    tabBarIcon: ({ focused }) => (
                        <>
                            {focused ? (
                                <IconSaved color='#EB5757' />
                            ) : (
                                <IconSaved color='#fff' />
                            )
                            }
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarActiveTintColor: '#EB5757',
                    tabBarIcon: ({ focused }) => (
                        <>
                            {focused ? (
                                <IconSettings color='#EB5757' />
                            ) : (
                                <IconSettings color='#fff' />
                            )
                            }
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarActiveTintColor: '#EB5757',
                    tabBarIcon: ({ focused }) => (
                        <>
                            {focused ? (
                                <IconProfile color='#EB5757' />
                            ) : (
                                <IconProfile color='#fff' />
                            )
                            }
                        </>
                    ),
                }}
            />
        </Tabs>
    );
}
