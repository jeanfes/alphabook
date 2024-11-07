import { ViewContainer } from '@/components/ViewContainer/ViewContainer';
import * as DocumentPicker from 'expo-document-picker';
import { StyleSheet, Text, View } from 'react-native';

export default function StackAlpha() {

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
        <ViewContainer style={stylesAlpha.mainContainer}>
            <View style={stylesAlpha.titlePage}>
                <Text style={stylesAlpha.titlePageText}>Upload AlphaBook</Text>
            </View>
        </ViewContainer>
    );
}

const stylesAlpha = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#FFFFFF',
        gap: 15,
        padding: 18,
        paddingTop: 0,
        paddingBottom: 0,
    },
    titlePage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 18,
        paddingBottom: 4,
    },
    titlePageText: {
        fontFamily: 'OpenSansSemiBold',
        fontSize: 24,
        color: '#000000',
    },
});