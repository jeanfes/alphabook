import { IconMenu, IconNotification } from '@/assets/icons/IconsHeader';
import {  Pressable, StyleSheet, View } from 'react-native';
import { MenuBar } from '../MenuBar/MenuBar';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation<any>();

    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => setMenuVisible(!menuVisible)}
                style={({ pressed }) => [
                    styles.menuContainer,
                    {
                        backgroundColor: pressed ? '#E0E0E0' : 'transparent',
                    },
                ]}
            >
                <IconMenu />
            </Pressable>
            <View style={styles.notificationContainer}>
                <Pressable
                    onPress={() => navigation.navigate('Notifications')}
                    style={({ pressed }) => [
                        styles.menuContainer,
                        {
                            backgroundColor: pressed ? '#E0E0E0' : 'transparent',
                        },
                    ]}
                >
                    <IconNotification />
                </Pressable>
            </View>
            <MenuBar menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
        padding: 18,
        paddingLeft: 9,
        paddingRight: 9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        gap: 18,
    },
    menuContainer: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 50,
        padding: 0,
    },
});
