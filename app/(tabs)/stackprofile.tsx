import { IconProfile } from '@/assets/icons/IconsMenu';
import { ViewContainer } from '@/components/ViewContainer/ViewContainer';
import { useGlobalContext } from '@/context/GlobalContext';
import { IconCamera, IconLock, IconMultiUsers, IconPencil, IconSignOut } from '@/assets/icons/IconsProfile';
import { ActivityIndicator, Image, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { pascalCase, shortText } from '@/utilities/formatters';
import { ButtonProfile } from '@/components/Buttons/ButtonProfile';
import { useId, useState } from 'react';
import { ModalConfirmation } from '@/components/Modals/ModalConfirmation';
import { ModalParams, ModalParamsConfirm, ModalTexts } from '@/interfaces/modals';
import { InputDynamic } from '@/components/Inputs/InputDynamic';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { customFetch } from '@/services/customFetch';
import { User } from '@/interfaces/auth';
import { useConnection } from '@/hooks/connection/useConnection';
import { ModalSuccess } from '@/components/Modals/ModalSuccess';
import { ModalError } from '@/components/Modals/ModalError';

const getValidationSchema = (field: string, user: User | null, userMemory: User | undefined | null) => {
    switch (field) {
        case modalTypes.name:
            return Yup.object().shape({
                name: Yup.string().required('Name is required').max(20, 'Name is too long'),
            });
        case modalTypes.username:
            return Yup.object().shape({
                username: Yup.string().required('Username is required').max(30, 'Username is too long'),
            });
        case modalTypes.email:
            return Yup.object().shape({
                email: Yup.string().email('Invalid email').required('Email is required'),
            });
        case modalTypes.password:
            return Yup.object().shape({
                password: Yup.string()
                    .required('Old Password is required')
                    .test('passwords-match', 'Old Password does not match', function (value) {
                        return value === user?.password || value === userMemory?.password;
                    }),
                newPassword: Yup.string().required('New Password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
                    .required('Confirm Password is required'),
            });
        default:
            return Yup.object();
    }
};

const modalTypes = {
    name: 'name',
    username: 'username',
    email: 'email',
    account: 'account',
    password: 'password',
    signOut: 'signOut',
};

interface FormValues {
    name: string;
    username: string;
    email: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
}

export default function StackProfile() {
    const { token, tokenMemory, user, userMemory, handleSignOut, handleUpdateUser } = useGlobalContext();
    const { isConnected } = useConnection();
    const [modalParamsConfirmation, setModalParamsConfirmation] = useState<ModalParamsConfirm>({ visible: false, position: 'center' });
    const [modalParamsSuccess, setModalParamsSuccess] = useState<ModalParams>({ visible: false, position: 'center', text: '' });
    const [modalParamsError, setModalParamsError] = useState<ModalParams>({ visible: false, position: 'center', text: '' });
    const [modalTexts, setModalTexts] = useState<ModalTexts>({ title: '', message: '', textConfirm: '', textCancel: '' });
    const [modalType, setModalType] = useState('');
    const [loading, setLoading] = useState(false);
    const idModal = useId();

    const { resetForm, values, errors, setFieldValue, handleChange, handleBlur, handleSubmit, validateField } = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: getValidationSchema(modalType, user, userMemory),
        onSubmit: async (values) => {
            if (!isConnected) {
                setModalParamsError({ visible: true, position: 'center', text: 'No internet connection' });
                return;
            }
            setLoading(true);
            //////
            // const body = modalType === modalTypes.password ? { password: values.confirmPassword } : { [modalType]: values[modalType as keyof FormValues] };
            // try {
            //     const res = await customFetch({
            //         method: 'GET',
            //         endpoint: `users?username=${values.username}`,
            //         token: token || tokenMemory,
            //         body: body
            //     });
            //     if (res.success) {
            //         if (user || userMemory) {
            //             if (modalType === modalTypes.password) {
            //                 handleUpdateUser({
            //                     ...user,
            //                     password: values.newPassword,
            //                     id: user?.id || '',
            //                 });
            //             } else {
            //                 handleUpdateUser({
            //                     ...user,
            //                     [modalType]: values[modalType as keyof FormValues],
            //                 });
            //             }
            //         }
            //     } else {
            //         console.log(res.error);
            //     }
            // } catch (error) {
            //     console.log(error);
            // } finally {
            //     setLoading(false);
            // }
            /////
            setTimeout(async () => {
                if (user || userMemory) {
                    if (modalType === modalTypes.password) {
                        handleUpdateUser({
                            ...(user || userMemory),
                            password: values.newPassword,
                            id: user?.id || userMemory?.id || '',
                        });
                    } else {
                        handleUpdateUser({
                            ...(user || userMemory),
                            [modalType]: values[modalType as keyof typeof values],
                        });
                    }
                }
                setModalParamsSuccess({ visible: true, position: 'center', text: `${pascalCase(modalType)} updated.` });
                setLoading(false);
                handleCloseModal();
            }, 2000);
        },
        validateOnChange: true,
        validateOnMount: false,
    });

    const handleCloseModal = async () => {
        resetForm();
        setModalParamsConfirmation({
            ...modalParamsConfirmation,
            visible: false,
        });
    };
    const handleConfirmModal = async () => {
        if (modalType === modalTypes.signOut) {
            handleSignOut();
        } else {
            const error = await validateField(modalType);
            if (!error) {
                handleSubmit();
            }
        }
    };

    const handleOpenModal = async (type: string) => {
        switch (type) {
            case modalTypes.name:
                setModalType(modalTypes.name);
                setModalTexts({ title: 'Name', textConfirm: 'Save' });
                setModalParamsConfirmation({ visible: true, position: 'bottom' });
                await setFieldValue('name', user?.name || userMemory?.name || '');
                break;
            case modalTypes.username:
                setModalType(modalTypes.username);
                setModalTexts({ title: 'Username', textConfirm: 'Save' });
                setModalParamsConfirmation({ visible: true, position: 'bottom' });
                await setFieldValue('username', user?.username || userMemory?.username || '');
                break;
            case modalTypes.email:
                setModalType(modalTypes.email);
                setModalTexts({ title: 'Email', textConfirm: 'Save' });
                setModalParamsConfirmation({ visible: true, position: 'bottom' });
                await setFieldValue('email', user?.email || userMemory?.email || '');
                break;
            case modalTypes.account:
                setModalType(modalTypes.account);
                setModalTexts({ title: 'Change account', textConfirm: 'Save' });
                setModalParamsConfirmation({ visible: true, position: 'center' });
                break;
            case modalTypes.password:
                setModalType(modalTypes.password);
                setModalTexts({ title: 'Change password', textConfirm: 'Save' });
                setModalParamsConfirmation({ visible: true, position: 'bottom' });
                setFieldValue('password', '');
                setFieldValue('newPassword', '');
                setFieldValue('confirmPassword', '');
                break;
            case modalTypes.signOut:
                setModalType(modalTypes.signOut);
                setModalTexts({ title: 'Sign out', message: 'Are you sure you want to sign out?', textConfirm: 'Sign Out', textCancel: 'Cancel' });
                setModalParamsConfirmation({ visible: true, position: 'center' });
                break;
            default:
                break;
        }
    };

    return (
        <ViewContainer>
            <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />
            <View style={styles.mainContainer}>
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
                        onPress={() => handleOpenModal(modalTypes.name)}
                        icon={<IconPencil />}
                        text="Name"
                        value={shortText(user?.name, 15) || shortText(userMemory?.name, 15) || 'user'}
                    />
                    <ButtonProfile
                        onPress={() => handleOpenModal(modalTypes.username)}
                        icon={<IconPencil />}
                        text="Username"
                        value={user?.username || userMemory?.username || 'username'}
                    />
                    <ButtonProfile onPress={() => handleOpenModal(modalTypes.email)} icon={<IconPencil />} text="Email" value={user?.email || userMemory?.email || 'email'} />
                    <ButtonProfile onPress={() => handleOpenModal(modalTypes.account)} icon={<IconMultiUsers />} text="Change account" />
                    <ButtonProfile onPress={() => handleOpenModal(modalTypes.password)} icon={<IconLock />} text="Change password" />
                    <ButtonProfile onPress={() => handleOpenModal(modalTypes.signOut)} icon={<IconSignOut />} text="Sign out" />
                </View>
            </View>
            <ModalConfirmation
                disabledSave={
                    loading ||
                    (modalType === modalTypes.password
                        ? !values.password || !values.newPassword || !values.confirmPassword || !!errors.password || !!errors.newPassword || !!errors.confirmPassword
                        : modalType === modalTypes.signOut
                          ? false
                          : !values[modalType as keyof FormValues] || !!errors[modalType as keyof FormValues])
                }
                key={idModal}
                modalParams={modalParamsConfirmation}
                modalTexts={modalTexts}
                onCancel={handleCloseModal}
                onConfirm={handleConfirmModal}
                content={
                    <>
                        {modalType !== modalTypes.signOut && modalType != modalTypes.account ? (
                            <View style={{ width: '100%', height: modalType === modalTypes.password ? 240 : 80 }}>
                                <InputDynamic
                                    check={errors[modalType as keyof FormValues] ? false : true}
                                    value={values[modalType as keyof FormValues]}
                                    onChange={handleChange(modalType)}
                                    onBlur={handleBlur(modalType)}
                                    placeholder={modalType === modalTypes.password ? 'Old password' : modalType}
                                    secureTextEntry={modalType === modalTypes.password}
                                    autoFocus={true}
                                    loading={loading}
                                />
                                {modalType === modalTypes.password && (
                                    <>
                                        <InputDynamic
                                            check={errors.newPassword ? false : true}
                                            value={values.newPassword}
                                            onChange={handleChange('newPassword')}
                                            onBlur={handleBlur('newPassword')}
                                            placeholder={modalType === modalTypes.password ? 'New password' : modalType}
                                            secureTextEntry={modalType === modalTypes.password}
                                            autoFocus={true}
                                        />
                                        <InputDynamic
                                            check={errors.confirmPassword ? false : true}
                                            value={values.confirmPassword}
                                            onChange={handleChange('confirmPassword')}
                                            onBlur={handleBlur('confirmPassword')}
                                            placeholder={'Confirm password'}
                                            autoFocus={true}
                                            secureTextEntry
                                        />
                                    </>
                                )}
                            </View>
                        ) : modalType === modalTypes.account ? (
                            <View>
                                <Text>Change profile</Text>
                            </View>
                        ) : null}
                    </>
                }
            />
            <ModalSuccess modalParams={modalParamsSuccess} setModalParams={setModalParamsSuccess} />
            <ModalError modalParams={modalParamsError} setModalParams={setModalParamsError} />
        </ViewContainer>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingBottom: 40,
    },
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
