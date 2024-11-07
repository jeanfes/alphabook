import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Animated, StyleSheet, StatusBar } from 'react-native';
import { IconAlpha, IconHome, IconProfile, IconSaved, IconStore } from '../../assets/icons/IconsTabLayout';
import { useFonts } from 'expo-font';
import StackProfile from './stackprofile';
import StackFavorites from './stackfavorites';
import StackHome from './stackhome';
import StackAlpha from './stackalpha';
import StackStore from './stackstore';

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

export default function Main() {
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
        <>
            <StatusBar backgroundColor={'#FFFFFF'} barStyle="light-content" />
            <Tab.Navigator
                initialRouteName="StackHome"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        height: 60,
                        paddingTop: 4,
                        paddingBottom: 4,
                    },
                }}
            >
                <Tab.Screen
                    name="StackHome"
                    component={StackHome}
                    options={{
                        title: 'Home',
                        tabBarLabel: ({ focused }) => <AnimatedLabel focused={focused} title="Home" />,
                        tabBarIcon: ({ focused }) => <IconHome color={focused ? '#EB5757' : '#fff'} />,
                    }}
                />
                <Tab.Screen
                    name="StackFavorites"
                    component={StackFavorites}
                    options={{
                        title: 'Favorites',
                        tabBarLabel: ({ focused }) => <AnimatedLabel focused={focused} title="Favorites" />,
                        tabBarIcon: ({ focused }) => <IconSaved color={focused ? '#EB5757' : '#fff'} />,
                    }}
                />
                <Tab.Screen
                    name="StackAlpha"
                    component={StackAlpha}
                    options={{
                        title: 'Alpha',
                        tabBarLabel: ({ focused }) => <AnimatedLabel focused={focused} title="Alpha" />,
                        tabBarIcon: ({ focused }) => <IconAlpha color={focused ? '#EB5757' : '#fff'} />,
                    }}
                />
                {/* <Tab.Screen
                    name="StackStore"
                    component={StackStore}
                    options={{
                        title: 'Store',
                        tabBarLabel: ({ focused }) => <AnimatedLabel focused={focused} title="Store" />,
                        tabBarIcon: ({ focused }) => <IconStore color={focused ? '#EB5757' : '#fff'} />,
                    }}
                /> */}
                <Tab.Screen
                    name="StackProfile"
                    component={StackProfile}
                    options={{
                        title: 'Profile',
                        tabBarLabel: ({ focused }) => <AnimatedLabel focused={focused} title="Profile" />,
                        tabBarIcon: ({ focused }) => <IconProfile color={focused ? '#EB5757' : '#fff'} />,
                    }}
                />
            </Tab.Navigator>
        </>
    );
}
