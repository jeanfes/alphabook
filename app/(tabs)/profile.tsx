import { IconProfile } from '@/assets/icons/IconsMenu';
import { ViewContainer } from '@/components/ViewContainer/ViewContainer';
import { useGlobalContext } from '@/context/GlobalContext';
import { IconCamera, IconLock, IconPencil, IconSignOut } from '@/assets/icons/IconsProfile';
import { ActivityIndicator, Image, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { shortText } from '@/utilities/formatters';
import { ButtonProfile } from '@/components/Buttons/ButtonProfile';
import { useEffect, useId, useState } from 'react';
import { ModalConfirmation } from '@/components/Modals/ModalConfirmation';
import { ModalParams, ModalTexts } from '@/interfaces/modals';
import { InputDynamic } from '@/components/Inputs/InputDynamic';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').max(20, 'Name is too long'),
    username: Yup.string().required('Username is required').max(30, 'Username is too long'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

interface FormValues {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Profile() {
    const { user, userMemory, handleSignOut } = useGlobalContext();
    const [modalParams, setModalParams] = useState<ModalParams>({ visible: false, position: 'center' });
    const [modalTexts, setModalTexts] = useState<ModalTexts>({ title: '', message: '', textConfirm: '', textCancel: '' });
    const [modalType, setModalType] = useState('');
    const navigation = useNavigation<any>();
    const idModal = useId();

    const { resetForm, values, errors, setFieldValue, touched, handleChange, handleBlur, handleSubmit, isValid, dirty } = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
            alert('Register success');
            resetForm();
        },
        validateOnChange: true,
        validateOnMount: true,
    });

    const handleCloseModal = () => {
        setModalParams({
            ...modalParams,
            visible: false,
        });
        resetForm();
    };

    const handleSignOutAndNavigate = async () => {
        await handleSignOut();
        navigation.navigate('Landing');
    };

    const handleConfirmModal = () => {
        switch (modalType) {
            case 'name':
                handleSubmit();
                break;
            case 'username':
                handleSubmit();
                break;
            case 'email':
                handleSubmit();
                break;
            case 'password':
                handleSubmit();
                break;
            case 'sign_out':
                handleSignOutAndNavigate();
                break;
            default:
                break;
        }
    };

    const handleModal = async (type: string) => {
        switch (type) {
            case 'name':
                setModalType('name');
                setModalTexts({ title: 'Name', textConfirm: 'Save' });
                setModalParams({ visible: true, position: 'bottom' });
                await setFieldValue('name', user?.name || userMemory?.name || '');
                break;
            case 'username':
                setModalType('username');
                setModalTexts({ title: 'Username', textConfirm: 'Save' });
                setModalParams({ visible: true, position: 'bottom' });
                await setFieldValue('username', user?.username || userMemory?.username || '');
                break;
            case 'email':
                setModalType('email');
                setModalTexts({ title: 'Email', textConfirm: 'Save' });
                setModalParams({ visible: true, position: 'bottom' });
                await setFieldValue('email', user?.email || userMemory?.email || '');
                break;
            case 'password':
                setModalType('password');
                setModalTexts({ title: 'Password', textConfirm: 'Save' });
                setModalParams({ visible: true, position: 'bottom' });
                setFieldValue('password', '');
                break;
            case 'sign_out':
                setModalType('sign_out');
                setModalTexts({ title: 'Sign Out', message: 'Are you sure you want to sign out?', textConfirm: 'Sign Out', textCancel: 'Cancel' });
                setModalParams({ visible: true, position: 'center' });
                break;
            default:
                break;
        }
    };

    return (
        <ViewContainer>
            <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />
            <View>
                <View style={styles.containerProfile}>
                    <View style={styles.containerImageProfile}>
                        {user?.image || userMemory?.image ? (
                            <Image
                                source={{
                                    uri: user?.image || userMemory?.image,
                                }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <View
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 180,
                                    backgroundColor: '#EB5757',
                                    justifyContent: 'center',
                                    borderWidth: 2,
                                    borderColor: '#EB5757',
                                    alignItems: 'center',
                                }}
                            >
                                <IconProfile width={70} height={70} color="#FFFFFF" />
                            </View>
                        )}
                        <Pressable style={styles.buttonChangeImageProfile}>
                            <IconCamera width={30} height={30} color="#000000" />
                        </Pressable>
                    </View>
                    <View>
                        <Text style={{ color: '#4f4f4f', fontSize: 30, fontFamily: 'OpenSansBold', textAlign: 'center' }}>
                            {shortText(user?.name, 15) || shortText(userMemory?.name, 15) || 'User'}
                        </Text>
                        <Text style={{ color: '#4f4f4f', fontSize: 16, fontFamily: 'OpenSansRegular', textAlign: 'center' }}>@{user?.username || userMemory?.username}</Text>
                    </View>
                </View>
                <View style={styles.containerInputsProfile}>
                    <ButtonProfile
                        onPress={() => handleModal('name')}
                        icon={<IconPencil />}
                        text="Name"
                        value={shortText(user?.name, 15) || shortText(userMemory?.name, 15) || 'user'}
                    />
                    <ButtonProfile onPress={() => handleModal('username')} icon={<IconPencil />} text="Username" value={user?.username || userMemory?.username || 'username'} />
                    <ButtonProfile onPress={() => handleModal('email')} icon={<IconPencil />} text="Email" value={user?.email || userMemory?.email || 'email'} />
                    <ButtonProfile onPress={() => handleModal('password')} icon={<IconLock />} text="Change password" />
                    <ButtonProfile onPress={() => handleModal('sign_out')} icon={<IconSignOut />} text="Sign Out" />
                </View>
            </View>
            <ModalConfirmation
                key={idModal}
                modalParams={modalParams}
                modalTexts={modalTexts}
                onCancel={handleCloseModal}
                onConfirm={handleConfirmModal}
                content={
                    <>
                        {modalType !== 'sign_out' && (
                            <View style={{ width: '100%', height: 80 }}>
                                <InputDynamic
                                    value={values[modalType as keyof FormValues]}
                                    placeholder={modalTexts.title}
                                    onChange={handleChange(modalType)}
                                    check={errors[modalType as keyof FormValues] ? false : true}
                                    autoFocus={true}
                                />
                            </View>
                        )}
                    </>
                }
            />
        </ViewContainer>
    );
}

const styles = StyleSheet.create({
    containerProfile: {
        width: '100%',
        height: 'auto',
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    containerImageProfile: {
        position: 'relative',
        backgroundColor: 'transparent',
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 180,
        padding: 2,
        borderWidth: 2,
        borderColor: '#EB5757',
    },
    buttonChangeImageProfile: {
        width: 100,
        height: 100,
        backgroundColor: '#000000',
        opacity: 0.45,
        borderRadius: 180,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 180,
    },
    containerInputsProfile: {
        backgroundColor: 'red',
        width: '100%',
        height: 'auto',
        marginTop: 15,
        flexDirection: 'column',
    },
});
