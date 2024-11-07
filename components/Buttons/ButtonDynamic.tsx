import { useFonts } from 'expo-font';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActityIndicator } from '../Loaders/Loaders';

interface ButtonDynamicProps {
    title: string;
    onPress: () => void;
    design?: number;
    disabled?: boolean;
    loading?: boolean;
    styles?: any;
}

export const ButtonDynamic = ({ title, onPress, design = 1, loading, disabled = false, styles }: ButtonDynamicProps) => {
    const [loaded] = useFonts({
        OpenSansRegular: require('../../assets/fonts/OpenSans-Regular.ttf'),
        OpenSansBold: require('../../assets/fonts/OpenSans-Bold.ttf'),
        OpenSansExtraBold: require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
    });

    if (!loaded) {
        return null;
    }

    const getButtonStyle = (pressed: boolean) => {
        if (design === 1) {
            return pressed ? styles1.buttonPressed : styles1.button;
        } else if (design === 2) {
            return pressed ? styles2.buttonPressed : styles2.button;
        } else if (design === 3) {
            return pressed ? styles3.buttonPressed : styles3.button;
        } else if (design === 4) {
            return pressed ? styles4.buttonPressed : styles4.button;
        }
    };

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    ...styles,
                },
                getButtonStyle(pressed),
                disabled && { opacity: 0.8 },
            ]}
            disabled={disabled || loading}
        >
            {loading ?
                <View style={allStyles.loadingContainer}>
                    <ActityIndicator size="small" color='#FFFFFF' />
                </View> :
                <Text style={design === 1 ? styles1.text : design === 2 ? styles2.text : design === 3 ? styles3.text : styles4.text}>{title}</Text>
            }
        </Pressable>
    );
};

const allStyles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const styles1 = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonPressed: {
        backgroundColor: '#E0E0E0',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    text: {
        height: 28,
        color: '#EB5757',
        fontFamily: 'OpenSansRegular',
        fontSize: 18,
    },
});

const styles2 = StyleSheet.create({
    button: {
        backgroundColor: '#EB5757',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonPressed: {
        backgroundColor: '#D32F2F',
        borderWidth: 1,
        borderColor: '#EB5757',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    text: {
        height: 28,
        color: '#FFFFFF',
        fontFamily: 'OpenSansRegular',
        fontSize: 18,
    },
});

const styles3 = StyleSheet.create({
    button: {
        backgroundColor: '#EB5757',
        borderWidth: 1,
        borderColor: '#EB5757',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonPressed: {
        backgroundColor: '#D32F2F',
        borderWidth: 1,
        borderColor: '#D32F2F',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    text: {
        height: 28,
        color: '#FFFFFF',
        fontFamily: 'OpenSansRegular',
        fontSize: 18,
    },
});

const styles4 = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#EB5757',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonPressed: {
        backgroundColor: '#E0E0E0',
        borderWidth: 1.5,
        borderColor: '#EB5757',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    text: {
        height: 28,
        color: '#EB5757',
        fontFamily: 'OpenSansRegular',
        fontSize: 18,
    },
});
