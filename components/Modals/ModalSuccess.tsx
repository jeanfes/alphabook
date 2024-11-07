import { ModalSuccessProps } from '@/interfaces/modals';
import { useEffect, useRef } from 'react';
import { Modal, Text, View, StyleSheet, Animated, Easing } from 'react-native';

export const ModalSuccess = ({ modalParams = { visible: false, text: "Success", position: "bottom" }, setModalParams }: ModalSuccessProps) => {
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
                    duration: 300,
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
        paddingBottom: 75,
    },
    toast: {
        width: '96%',
        height: 46,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        backgroundColor: "#EB5757",
    },
    toastText: {
        fontFamily: 'OpenSansBold',
        color: '#ffffff',
        fontSize: 15,
    },
});