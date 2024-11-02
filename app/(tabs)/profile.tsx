import { IconProfile } from '@/assets/icons/IconsMenu';
import { ViewContainer } from '@/components/ViewContainer/ViewContainer';
import { useGlobalContext } from '@/context/GlobalContext';
import { IconCamera, IconPencil, IconSignOut } from '@/assets/icons/IconsProfile';
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { shortText } from '@/utilities/formatters';
import { ButtonProfile } from '@/components/Buttons/ButtonProfile';
import { landingNavigationRef } from '../(auth)/navigation';
import { AlertConfirmation } from '@/components/Modals/Modals';

export default function Profile() {
    const { user, userMemory, handleSignOut } = useGlobalContext();

    const handleLogOut = async () => {
        handleSignOut();
        const result = await AlertConfirmation({ title: "Cerrar sesion", message: "" });
        alert(result);
        // if (landingNavigationRef.isReady()) {
        //     alert('Sign out successfully');
        //     landingNavigationRef.navigate('Index');
        // }
    }

    return (
        <ViewContainer>
            <StatusBar backgroundColor="#FFFFFF" barStyle='light-content' />
            <View>
                <View style={styles.containerProfile}>
                    <View style={styles.containerImageProfile}>
                        {user?.image || userMemory?.image ?
                            <Image
                                source={{
                                    uri: user?.image || userMemory?.image
                                }}
                                style={styles.profileImage}
                            />
                            :
                            <View style={{
                                width: 100,
                                height: 100,
                                borderRadius: 180,
                                backgroundColor: '#EB5757',
                                justifyContent: 'center',
                                borderWidth: 2,
                                borderColor: '#EB5757',
                                alignItems: 'center'
                            }}>
                                <IconProfile width={70} height={70} color='#FFFFFF' />
                            </View>
                        }
                        <Pressable style={styles.buttonChangeImageProfile}>
                            <IconCamera width={30} height={30} color='#000000' />
                        </Pressable>
                    </View>
                    <View>
                        <Text style={{ color: '#4f4f4f', fontSize: 30, fontFamily: "OpenSansBold", textAlign: "center" }}>{shortText(user?.name, 15) || shortText(userMemory?.name, 15) || 'User'}</Text>
                        <Text style={{ color: '#4f4f4f', fontSize: 16, fontFamily: "OpenSansRegular", textAlign: "center" }}>@{user?.username || userMemory?.username}</Text>
                    </View>
                </View>
                <View style={styles.containerInputsProfile}>
                    <ButtonProfile onPress={() => { }} icon={<IconPencil />} text='Name' value={shortText(user?.name, 15) || shortText(userMemory?.name, 15) || 'user'} />
                    <ButtonProfile onPress={() => { }} icon={<IconPencil />} text='Username' value={user?.username || userMemory?.username || "username"} />
                    <ButtonProfile onPress={() => { }} icon={<IconPencil />} text='Email' value={user?.email || userMemory?.email || "email"} />
                    <ButtonProfile onPress={() => { }} icon={<IconPencil />} text='Change password' />
                    <ButtonProfile onPress={handleLogOut} icon={<IconSignOut />} text='Sign Out' />
                </View>
            </View>
        </ViewContainer>
    );
}

const styles = StyleSheet.create({
    containerProfile: {
        width: '100%',
        height: "auto",
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
        backgroundColor: "red",
        width: '100%',
        height: "auto",
        marginTop: 15,
        flexDirection: 'column',
    }
});