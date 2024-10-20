import React from 'react';
import { View, StyleSheet, Image, Text, Pressable, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';
import { ButtonDynamic } from '@/components/Buttons/ButtonDynamic';

export default function Index() {
    const navigation = useNavigation();
    const [loaded] = useFonts({
        OpenSansLight: require('../../assets/fonts/OpenSans-Light.ttf'),
        OpenSansRegular: require('../../assets/fonts/OpenSans-Regular.ttf'),
        OpenSansSemiBold: require('../../assets/fonts/OpenSans-SemiBold.ttf'),
        OpenSansBold: require('../../assets/fonts/OpenSans-Bold.ttf'),
        OpenSansExtraBold: require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
    });

    if (!loaded) {
        return null;
    }

    const handleGoSignIn = () => {
        navigation.navigate('SignIn' as never);
    };

    const handleGoSignUp = () => {
        navigation.navigate('SignUp' as never);
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#EB5757" />
            <Image source={require('../../assets/images/AlphaLogoLight.png')} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={{ color: 'white', fontFamily: 'OpenSansExtraBold', fontSize: 48 }}>Welcome</Text>
                <Text style={{ color: 'white', fontFamily: 'OpenSansRegular', fontSize: 20 }}>Read without limits</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <ButtonDynamic title="Create Account" onPress={handleGoSignUp} />
                <ButtonDynamic title="Access" onPress={handleGoSignIn} design={2} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#EB5757',
        flex: 1,
        justifyContent: 'center',
        padding: 30,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    buttonsContainer: {
        gap: 20,
    },
    image: {
        objectFit: 'cover',
        marginBottom: 60,
        alignSelf: 'center',
    },
});
