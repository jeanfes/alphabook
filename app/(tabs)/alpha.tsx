import { ViewContainer } from '@/components/ViewContainer/ViewContainer';
import * as DocumentPicker from 'expo-document-picker';
import { Text } from 'react-native';

export default function Alpha() {
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
        <ViewContainer>
            <Text>Alpha</Text>
        </ViewContainer>
    );
}
