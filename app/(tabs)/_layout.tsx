import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Animated, StyleSheet, StatusBar } from 'react-native';
import { IconAlpha, IconHome, IconProfile, IconSaved, IconStore } from '../../assets/icons/IconsTabLayout';
import { useFonts } from 'expo-font';
import Profile from './profile';
import StackIndex from './index';
import StackFavorites from './favorites';
import { tabNavigationRef } from './navigation';
import Alpha from './alpha';

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
        <NavigationContainer independent ref={tabNavigationRef}>
            <StatusBar backgroundColor={"#FFFFFF"} barStyle='light-content' />
            <Tab.Navigator
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
                    component={StackFavorites}
                    options={{
                        title: 'Favorites',
                        tabBarLabel: ({ focused }) => <AnimatedLabel focused={focused} title="Favorites" />,
                        tabBarIcon: ({ focused }) => <IconSaved color={focused ? '#EB5757' : '#fff'} />,
                    }}
                />
                <Tab.Screen
                    name="Alpha"
                    component={Alpha}
                    options={{
                        title: 'Alpha',
                        tabBarLabel: ({ focused }) => <AnimatedLabel focused={focused} title="Alpha" />,
                        tabBarIcon: ({ focused }) => <IconAlpha color={focused ? '#EB5757' : '#fff'} />,
                    }}
                />
                {/* <Tab.Screen
                    name="Store"
                    component={Store}
                    options={{
                        title: 'Store',
                        tabBarLabel: ({ focused }) => <AnimatedLabel focused={focused} title="Store" />,
                        tabBarIcon: ({ focused }) => <IconStore color={focused ? '#EB5757' : '#fff'} />,
                    }}
                /> */}
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
        </NavigationContainer>
    );
}
