import { StyleSheet, Text, View } from "react-native";

export const Configuration = () => {
    return (
        <View style={stylesIndex.container}>
            <Text style={stylesIndex.greetingsText}>Configuration</Text>
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