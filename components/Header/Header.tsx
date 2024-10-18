import { IconMenu, IconNotification } from "@/assets/icons/IconsHeader";
import { Image, StyleSheet, View } from "react-native";

export const Header = () => {
    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <IconMenu />
            </View>
            <View style={styles.containerImage}>
                <IconNotification />
                <Image
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN6h7AAVpPXDIgzVngWkxS9mcE0tOesmIStA&s" }}
                    style={styles.headerImage}
                />
            </View>
        </View>
    );
}

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
    titleContainer: {
        flexDirection: 'column',
    },
});