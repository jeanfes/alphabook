import { IconMenu, IconNotification } from '@/assets/icons/IconsHeader';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { MenuBar } from '../MenuBar/MenuBar';
import { useState } from 'react';
import { useNavigation } from 'expo-router';

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
            <View style={styles.containerImage}>
                <Pressable
                    onPress={() => navigation.navigate('notifications')}
                    style={({ pressed }) => [
                        styles.menuContainer,
                        {
                            backgroundColor: pressed ? '#E0E0E0' : 'transparent',
                        },
                    ]}
                >
                    <IconNotification />
                </Pressable>
                <Image
                    source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN6h7AAVpPXDIgzVngWkxS9mcE0tOesmIStA&s',
                    }}
                    style={styles.headerImage}
                />
            </View>
            <MenuBar menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
        padding: 18,
        paddingLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        gap: 18,
    },
    headerImage: {
        width: 45,
        height: 45,
        borderRadius: 50,
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
