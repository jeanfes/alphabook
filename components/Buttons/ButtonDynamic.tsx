import { useFonts } from 'expo-font';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonDynamicProps {
    title: string;
    onPress: () => void;
    design?: number;
    disabled?: boolean;
}

export const ButtonDynamic = ({ title, onPress, design = 1, disabled }: ButtonDynamicProps) => {
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
        } else {
            return pressed ? styles3.buttonPressed : styles3.button;
        }
    };

    return (
        <Pressable onPress={onPress} style={({ pressed }) => [getButtonStyle(pressed), disabled && { opacity: 0.8 }]} disabled={disabled}>
            <Text style={design === 1 ? styles1.text : design === 2 ? styles2.text : styles3.text}>{title}</Text>
        </Pressable>
    );
};

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
        color: '#FFFFFF',
        fontFamily: 'OpenSansRegular',
        fontSize: 18,
    },
});
