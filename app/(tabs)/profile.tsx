import { IconProfile } from '@/assets/icons/IconsMenu';
import { ViewContainer } from '@/components/ViewContainer/ViewContainer';
import { useGlobalContext } from '@/context/GlobalContext';
import { IconCamera, IconLock, IconMultiUsers, IconPencil, IconSignOut } from '@/assets/icons/IconsProfile';
import { Image, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { shortText } from '@/utilities/formatters';
import { ButtonProfile } from '@/components/Buttons/ButtonProfile';
import { useId, useState } from 'react';
import { ModalConfirmation } from '@/components/Modals/ModalConfirmation';
import { ModalParams, ModalTexts } from '@/interfaces/modals';
import { InputDynamic } from '@/components/Inputs/InputDynamic';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { customFetch } from '@/services/customFetch';

const getValidationSchema = (field: string) => {
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
        case modalTypes.oldPassword:
            return Yup.object().shape({
                oldPassword: Yup.string().required('Old Password is required'),
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
    profile: 'profile',
    oldPassword: 'oldPassword',
    signOut: 'signOut',
}

interface FormValues {
    name: string;
    username: string;
    email: string;
    oldPassword: string
    newPassword: string;
    confirmPassword: string;
}

export default function Profile() {
    const { token, tokenMemory, user, userMemory, handleSignOut, handleUpdateUser } = useGlobalContext();
    const [modalParams, setModalParams] = useState<ModalParams>({ visible: false, position: 'center' });
    const [modalTexts, setModalTexts] = useState<ModalTexts>({ title: '', message: '', textConfirm: '', textCancel: '' });
    const [modalType, setModalType] = useState('');
    const navigation = useNavigation<any>();
    const idModal = useId();

    const { resetForm, values, errors, setFieldValue, handleChange, handleBlur, handleSubmit, validateField } = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: getValidationSchema(modalType),
        onSubmit: async (values) => {
            const body = modalType === modalTypes.oldPassword ? { password: values.confirmPassword } : { [modalType]: values[modalType as keyof FormValues] };
            try {
                const res = await customFetch({
                    method: 'GET',
                    endpoint: `users?username=${values.username}`,
                    token: token || tokenMemory,
                    body: body
                });
                if (res.success) {
                    if (user?.username || userMemory?.username) {
                        if (modalType === modalTypes.oldPassword) {
                            handleUpdateUser({
                                ...user,
                                password: values.newPassword,
                            });
                        } else {
                            handleUpdateUser({
                                ...user,
                                [modalType]: values[modalType as keyof FormValues],
                            });
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
            handleCloseModal();
            resetForm();
        },
        validateOnChange: true,
        validateOnMount: true,
    });

    const handleCloseModal = () => {
        resetForm();
        setModalParams({
            ...modalParams,
            visible: false,
        });
    };

    const handleSignOutAndNavigate = async () => {
        await handleSignOut();
        navigation.navigate('Landing');
    };

    const handleConfirmModal = async () => {
        if (modalType === modalTypes.signOut) {
            handleSignOutAndNavigate();
        } else {
            const error = await validateField(modalType);
            if (!error) {
                handleSubmit();
            }
        }

    };

    const handleModal = async (type: string) => {
        switch (type) {
            case modalTypes.name:
                setModalType(modalTypes.name);
                setModalTexts({ title: 'Name', textConfirm: 'Save' });
                setModalParams({ visible: true, position: 'bottom' });
                await setFieldValue('name', user?.name || userMemory?.name || '');
                break;
            case modalTypes.username:
                setModalType(modalTypes.username);
                setModalTexts({ title: 'Username', textConfirm: 'Save' });
                setModalParams({ visible: true, position: 'bottom' });
                await setFieldValue('username', user?.username || userMemory?.username || '');
                break;
            case modalTypes.email:
                setModalType(modalTypes.email);
                setModalTexts({ title: 'Email', textConfirm: 'Save' });
                setModalParams({ visible: true, position: 'bottom' });
                await setFieldValue('email', user?.email || userMemory?.email || '');
                break;
            case modalTypes.profile:
                setModalType(modalTypes.profile);
                setModalTexts({ title: 'Change profile', textConfirm: 'Save' });
                setModalParams({ visible: true, position: 'center' });
                break;
            case modalTypes.oldPassword:
                setModalType(modalTypes.oldPassword);
                setModalTexts({ title: 'Change password', textConfirm: 'Save' });
                setModalParams({ visible: true, position: 'bottom' });
                setFieldValue('oldPassword', '');
                setFieldValue('newPassword', '');
                setFieldValue('confirmPassword', '');
                break;
            case modalTypes.signOut:
                setModalType(modalTypes.signOut);
                setModalTexts({ title: 'Sign out', message: 'Are you sure you want to sign out?', textConfirm: 'Sign Out', textCancel: 'Cancel' });
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
                    <ButtonProfile onPress={() => handleModal('profile')} icon={<IconMultiUsers />} text="Change profile" />
                    <ButtonProfile onPress={() => handleModal('oldPassword')} icon={<IconLock />} text="Change password" />
                    <ButtonProfile onPress={() => handleModal('signOut')} icon={<IconSignOut />} text="Sign out" />
                </View>
            </View>
            <ModalConfirmation
                disabledSave={
                    modalType === modalTypes.oldPassword
                        ? !values.oldPassword || !values.newPassword || !values.confirmPassword || !!errors.oldPassword || !!errors.newPassword || !!errors.confirmPassword
                        : modalType === modalTypes.signOut
                            ? false
                            : !values[modalType as keyof FormValues] || !!errors[modalType as keyof FormValues]
                }
                key={idModal}
                modalParams={modalParams}
                modalTexts={modalTexts}
                onCancel={handleCloseModal}
                onConfirm={handleConfirmModal}
                content={
                    <>
                        {modalType !== modalTypes.signOut && modalType != modalTypes.profile ?
                            <View style={{ width: '100%', height: modalType === modalTypes.oldPassword ? 240 : 80 }}>
                                <InputDynamic
                                    check={errors[modalType as keyof FormValues] ? false : true}
                                    value={values[modalType as keyof FormValues]}
                                    onChange={handleChange(modalType)}
                                    onBlur={handleBlur(modalType)}
                                    placeholder={modalType === modalTypes.oldPassword ? "Old password" : modalType}
                                    secureTextEntry={modalType === modalTypes.oldPassword}
                                    autoFocus={true}
                                />
                                {modalType === modalTypes.oldPassword &&
                                    <>
                                        <InputDynamic
                                            check={errors.newPassword ? false : true}
                                            value={values.newPassword}
                                            onChange={handleChange('newPassword')}
                                            onBlur={handleBlur('newPassword')}
                                            placeholder={modalType === modalTypes.oldPassword ? "New password" : modalType}
                                            secureTextEntry={modalType === modalTypes.oldPassword}
                                            autoFocus={true}
                                        />
                                        <InputDynamic
                                            check={errors.confirmPassword ? false : true}
                                            value={values.confirmPassword}
                                            onChange={handleChange('confirmPassword')}
                                            onBlur={handleBlur('confirmPassword')}
                                            placeholder={"Confirm password"}
                                            autoFocus={true}
                                            secureTextEntry
                                        />
                                    </>
                                }
                            </View>
                            : modalType === modalTypes.profile ?
                                <View>
                                    <Text>Change profile</Text>
                                </View>
                                : null
                        }
                    </>
                }
            />
        </ViewContainer >
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
