import { ActivityIndicator, StyleSheet, View } from "react-native";

interface ActityIndicatorProps {
    size?: 'small' | 'large';
    color?: string;
}

export const ActityIndicator = ({ size = "small", color = "#000000" }: ActityIndicatorProps) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    }
});