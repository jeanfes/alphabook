import { Pressable, StyleSheet, TextInput, View, PermissionsAndroid, Platform } from 'react-native';
import { IconMicro, IconSearch } from '@/assets/icons/IconsSearchBar';
import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';

interface SearchBarProps {
    search: string;
    setSearch: (text: string) => void;
    showMicro: boolean;
}


export const SearchBar = ({ search, setSearch, showMicro }: SearchBarProps) => {
    // const [recognized, setRecognized] = useState('');
    // const [started, setStarted] = useState('');
    // const [results, setResults] = useState<string[]>([]);

    // useEffect(() => {
    //     if (Voice) {
    //         Voice.onSpeechStart = onSpeechStart;
    //         Voice.onSpeechRecognized = onSpeechRecognized;
    //         Voice.onSpeechResults = onSpeechResults;
    //     } else {
    //         console.error('Voice is not initialized');
    //     }

    //     return () => {
    //         if (Voice) {
    //             Voice.destroy().then(Voice.removeAllListeners);
    //         }
    //     };
    // }, []);

    // const onSpeechStart = (e: any) => {
    //     setStarted('√');
    // };

    // const onSpeechRecognized = (e: any) => {
    //     setRecognized('√');
    // };

    // const onSpeechResults = (e: any) => {
    //     setResults(e.value);
    // };

    // const startRecognizing = async () => {
    //     try {
    //         if (Platform.OS === 'android') {
    //             const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
    //                 title: 'Microphone Permission',
    //                 message: 'App needs access to your microphone to recognize speech.',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             });
    //             if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    //                 console.log('Microphone permission denied');
    //                 return;
    //             }
    //         }
    //         await Voice.start('en-US');
    //         setRecognized('');
    //         setStarted('');
    //         setResults([]);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    // const stopRecognizing = async () => {
    //     try {
    //         await Voice.stop();
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    // const cancelRecognizing = async () => {
    //     try {
    //         await Voice.cancel();
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    // const destroyRecognizer = async () => {
    //     try {
    //         await Voice.destroy();
    //         setRecognized('');
    //         setStarted('');
    //         setResults([]);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    return (
        <View style={styles.container}>
            <IconSearch />
            <TextInput style={styles.input} placeholder="Search here" value={search} onChangeText={setSearch} />
            {showMicro && (
                <Pressable
                    onPress={() => { }}
                    style={({ pressed }) => [
                        styles.microphoneContainer,
                        {
                            backgroundColor: pressed ? '#E0E0E0' : 'transparent',
                        },
                    ]}
                >
                    <IconMicro />
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 65,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#8E8E93',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 18,
        paddingRight: 12,
        borderRadius: 8,
        gap: 18,
    },
    input: {
        flex: 1,
        fontFamily: 'OpenSansRegular',
        fontSize: 18,
        color: '#000',
    },
    microphoneContainer: {
        backgroundColor: 'transparent',
        borderRadius: 50,
        padding: 12,
    },
});
