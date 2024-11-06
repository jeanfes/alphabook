import { StyleSheet, Text, View } from "react-native";

export const History = () => {
    return (
        <View style={stylesIndex.container}>
            <Text style={stylesIndex.greetingsText}>History</Text>
        </View>
    );
}

const stylesIndex = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    greetingsText: {
        fontSize: 20,
        fontFamily: 'OpenSansSemiBold',
    },
});