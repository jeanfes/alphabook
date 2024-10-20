import React from 'react';
import { View, StyleSheet, StatusBar, Image, Pressable, Text } from 'react-native';
import { ButtonDynamic } from '@/components/Buttons/ButtonDynamic';
import { InputDynamic } from '@/components/Inputs/InputDynamic';
import { useNavigation } from 'expo-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ViewContainer } from '@/components/ViewContainer/ViewContainer';

export default function SignUp() {
    const navigation = useNavigation();

    const initialValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').max(20, 'Name is too long'),
        username: Yup.string().required('Username is required').max(30, 'Username is too long'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleGoSignIn = () => {
        navigation.navigate('SignIn' as never);
    };

    const { resetForm, values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty } = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            alert('Register success');
            alert(JSON.stringify(values, null, 2));
            navigation.navigate('SignIn' as never);
            resetForm();
        },
        validateOnChange: true,
    });

    return (
        <ViewContainer>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <Image source={require('../../assets/images/AlphaLogoDark.png')} style={styles.image} />
                <View style={styles.inputsContainer}>
                    <InputDynamic placeholder="Name" value={values.name} onChange={handleChange('name')} onBlur={handleBlur('name')} check={touched.name && !errors.name} />
                    <InputDynamic
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange('username')}
                        onBlur={handleBlur('username')}
                        check={touched.username && !errors.username}
                    />
                    <InputDynamic placeholder="Email" value={values.email} onChange={handleChange('email')} onBlur={handleBlur('email')} check={touched.email && !errors.email} />
                    <InputDynamic
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry
                        check={touched.password && !errors.password}
                    />
                    <InputDynamic
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        secureTextEntry
                        check={touched.confirmPassword && !errors.confirmPassword}
                    />
                </View>
                <ButtonDynamic title="Create Account" onPress={handleSubmit} design={3} disabled={!(isValid && dirty)} />
                <View style={styles.haveAccount}>
                    <Text style={{ color: '#828282', marginLeft: 4, fontFamily: 'OpenSansRegular', fontWeight: '500' }}>Already have an account?</Text>
                    <Pressable onPress={handleGoSignIn}>
                        <Text style={{ color: '#828282', marginLeft: 4, fontFamily: 'OpenSansSemiBold', fontWeight: '700' }}>Sign in here</Text>
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
        backgroundColor: '#FFFFFF',
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
        marginBottom: 40,
    },
});
