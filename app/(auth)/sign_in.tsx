import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Image, Text, Pressable } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { ViewContainer } from '@/components/ViewContainer/ViewContainer';
import { InputDynamic } from '@/components/Inputs/InputDynamic';
import { ButtonDynamic } from '@/components/Buttons/ButtonDynamic';
import { useNavigation } from 'expo-router';

export default function SignIn() {
    const { login } = useContext(AuthContext);
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        if (userName === 'jeanfes' && password === '123456') {
            alert('Login success');
            const userData = { userName: userName, password: password };
            login(userData);
        } else {
            alert('Login failed');
        }
    };

    const handleGoSignUp = () => {
        navigation.navigate('SignUp' as never);
    };

    useEffect(() => {
        login({ name: 'Jean', userName: 'jeanfes', password: '123456' });
    }, [userName, password]);

    return (
        <ViewContainer>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <Image source={require('../../assets/images/AlphaLogoDark.png')} style={styles.image} />
                <View style={styles.inputsContainer}>
                    <InputDynamic placeholder="Username or Email" value={userName} onChange={setUsername} check={null} />
                    <InputDynamic placeholder="Password" value={password} onChange={setPassword} secureTextEntry />
                </View>
                <ButtonDynamic title="Access" onPress={handleLogin} design={3} />
                <View style={styles.haveAccount}>
                    <Text style={{ color: '#828282', marginLeft: 4, fontFamily: 'OpenSansRegular', fontWeight: 500 }}>Don't have an account yet?</Text>
                    <Pressable onPress={handleGoSignUp}>
                        <Text style={{ color: '#828282', marginLeft: 4, fontFamily: 'OpenSansSemiBold', fontWeight: 700 }}>Sign up here</Text>
                    </Pressable>
                </View>
            </View>
        </ViewContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        padding: 30,
    },
    inputsContainer: {
        flexDirection: 'column',
        marginBottom: 40,
        gap: 20,
    },
    haveAccount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        textAlign: 'center',
    },
    image: {
        objectFit: 'cover',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 40,
    },
});
