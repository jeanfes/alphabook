import { ModalErrorProps } from '@/interfaces/modals';
import { useEffect, useRef } from 'react';
import { Modal, Text, View, StyleSheet, Animated, Easing } from 'react-native';

export const ModalError = ({ modalParams = { visible: false, text: "Success", position: "bottom" }, setModalParams }: ModalErrorProps) => {
    const translateY = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        if (modalParams.visible) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                Animated.timing(translateY, {
                    toValue: 100,
                    duration: 200,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }).start(() => {
                    setModalParams({ visible: false, text: '', position: 'center' });
                });
            }, 2000);
        }
    }, [modalParams.visible]);

    return (
        <Modal transparent={true} visible={modalParams?.visible} animationType="none">
            <View style={styles.container}>
                <Animated.View style={[styles.toast, { transform: [{ translateY }] }]}>
                    <Text style={styles.toastText}>{modalParams?.text}</Text>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingBottom: 45,
        padding: 30,
    },
    toast: {
        width: '100%',
        height: 46,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EB5757',
        backgroundColor: "#ffffff",
    },
    toastText: {
        fontFamily: 'OpenSansBold',
        color: '#EB5757',
        fontSize: 15,
    },
});