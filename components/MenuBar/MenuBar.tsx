import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, Pressable, Animated, Easing, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

interface MenuBarProps {
    menuVisible: boolean;
    setMenuVisible: (visible: boolean) => void;
}

const { width } = Dimensions.get('window');

export const MenuBar = ({ menuVisible = false, setMenuVisible }: MenuBarProps) => {
    const [visible, setVisible] = useState(menuVisible);
    const slideAnim = useRef(new Animated.Value(-width)).current;

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

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleFileUpload = async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true,
                multiple: false,
            });
            if (res) {
                if (res.canceled === false) {
                    alert(`File uploaded: ${res.assets[0].name}`);
                } else {
                    alert('File upload cancelled');
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal transparent={true} visible={visible} animationType="none" onRequestClose={toggleMenu}>
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.overlayTouchable} onPress={toggleMenu} />
                <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
                    <ScrollView>
                        <Pressable onPress={handleFileUpload} style={styles.menuItem}>
                            <Text>Upload File</Text>
                        </Pressable>
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
        backgroundColor: 'white',
        padding: 16,
        position: 'absolute',
        left: 0,
    },
    menuItem: {
        padding: 8,
    },
});
