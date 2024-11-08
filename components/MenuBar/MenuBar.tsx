import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, Pressable, Animated, Easing, ScrollView, Image, StatusBar, TouchableHighlight } from 'react-native';
import { IconClock, IconHelp, IconMiniArrowRight, IconProfile, IconSettings } from '@/assets/icons/IconsMenu';
import { useGlobalContext } from '@/context/GlobalContext';
import { shortText } from '@/utilities/formatters';
import { useNavigation } from '@react-navigation/native';

interface MenuBarProps {
    menuVisible: boolean;
    setMenuVisible: (visible: boolean) => void;
}

interface ButtonMenuProps {
    onPress: () => void;
    icon: JSX.Element;
    text: string;
}

const { width } = Dimensions.get('window');

const ButtonMenu = ({ onPress, icon, text }: ButtonMenuProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => {
                return [
                    {
                        backgroundColor: pressed ? '#faebeb' : 'white',
                    },
                    styles.menuItem,
                ];
            }}
        >
            {icon}
            <Text style={styles.menuItemText}>{text}</Text>
        </Pressable>
    );
};

export const MenuBar = ({ menuVisible = false, setMenuVisible }: MenuBarProps) => {
    const slideAnim = useRef(new Animated.Value(-width)).current;
    const [visible, setVisible] = useState(menuVisible);
    const { user, userMemory } = useGlobalContext();
    const navigation = useNavigation<any>();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    useEffect(() => {
        if (menuVisible) {
            setVisible(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 240,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -width,
                duration: 280,
                useNativeDriver: true,
                easing: Easing.in(Easing.ease),
            }).start(() => setVisible(false));
        }
    }, [menuVisible]);

    return (
        <Modal transparent={true} visible={visible} animationType="none" onRequestClose={toggleMenu}>
            <StatusBar backgroundColor="#EB5757" barStyle="light-content" />
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.overlayTouchable} onPress={toggleMenu} />
                <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
                    <ScrollView
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        <View style={styles.containerProfile}>
                            {user?.image || userMemory?.image ? (
                                <Image
                                    source={{
                                        uri: user?.image || userMemory?.image,
                                    }}
                                    style={styles.profileImage}
                                />
                            ) : (
                                <View
                                    style={{
                                        width: 55,
                                        height: 55,
                                        borderRadius: 180,
                                        backgroundColor: '#FFFFFF',
                                        justifyContent: 'center',
                                        borderWidth: 2,
                                        borderColor: '#FFFFFF',
                                        alignItems: 'center',
                                    }}
                                >
                                    <IconProfile width={40} height={40} color="#EB5757" />
                                </View>
                            )}
                            <View style={styles.containerProfileText}>
                                <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSansSemiBold', fontSize: 21 }}>
                                    {shortText(user?.name, 15) || shortText(userMemory?.name, 15) || 'User'}
                                </Text>
                                <Pressable
                                    style={styles.profileButton}
                                    onPress={() => {
                                        toggleMenu();
                                        navigation.navigate('StackProfile');
                                    }}
                                >
                                    <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSansRegular', fontSize: 15, marginBottom: 2 }}>Mi perfil</Text>
                                    <IconMiniArrowRight width={10} height={12} color="#FFFFFF" />
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.containerMenuItems}>
                            <ButtonMenu onPress={() => {}} icon={<IconClock />} text="History" />
                            <ButtonMenu onPress={() => {}} icon={<IconSettings />} text="Settings" />
                            <ButtonMenu onPress={() => {}} icon={<IconHelp />} text="Help" />
                        </View>
                        <View style={styles.aboutContainer}>
                            <Pressable
                                style={({ pressed }) => {
                                    return [
                                        {
                                            backgroundColor: pressed ? '#faebeb' : '#FFFFFF',
                                        },
                                        styles.menuItem,
                                    ];
                                }}
                            >
                                <Text style={styles.menuItemText}>Acerca de alphabook</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayTouchable: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    menu: {
        width: '70%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        paddingBottom: 15,
        position: 'absolute',
        left: 0,
    },
    containerProfile: {
        backgroundColor: '#EB5757',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingTop: 24,
        paddingLeft: 14,
        paddingBottom: 24,
    },
    profileImage: {
        width: 55,
        height: 55,
        borderRadius: 50,
    },
    containerProfileText: {
        flexDirection: 'column',
        gap: 1,
    },
    profileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    containerMenuItems: {
        flexDirection: 'column',
    },
    menuItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingLeft: 20,
        gap: 20,
    },
    menuItemText: {
        color: '#4f4f4f',
        fontSize: 14,
        fontFamily: 'OpenSansSemiBold',
    },
    aboutContainer: {
        marginTop: 8,
        borderTopWidth: 0.8,
        borderColor: '#E0E0E0',
        paddingTop: 8,
        paddingBottom: 8,
    },
});
