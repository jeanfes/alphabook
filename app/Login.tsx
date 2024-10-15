import React, { useState, useContext } from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleLogin = () => {
        if (userName === "jeanfes" && password === "123456") {
            alert("Login success");
            const userData = { userName: userName, password: password };
            login(userData);
        } else {
            alert("Login failed");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={userName}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
});

export default Login;
