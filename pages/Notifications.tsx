import { StyleSheet, Text, View } from "react-native";


export const Notifications = ({ route }: any) => {
    const { book } = route?.params;

    return (
        <View style={stylesIndex.container}>
            <Text style={stylesIndex.greetingsText}>Read Book ID: {book.id}</Text>
        </View>
    );
};

const stylesIndex = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    greetingsText: {
        fontSize: 20,
        fontFamily: 'OpenSansRegular',
        fontWeight: '500',
    },
});