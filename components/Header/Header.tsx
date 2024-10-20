import { IconMenu, IconNotification } from '@/assets/icons/IconsHeader';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { MenuBar } from '../MenuBar/MenuBar';
import { useState } from 'react';

export const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <View style={styles.header}>
            <Pressable onPress={() => setMenuVisible(true)} style={styles.menuContainer}>
                <IconMenu />
            </Pressable>
            <View style={styles.containerImage}>
                <IconNotification />
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
        backgroundColor: '#fff',
        padding: 18,
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
        flexDirection: 'column',
        padding: 10,
        paddingLeft: 0,
    },
});
