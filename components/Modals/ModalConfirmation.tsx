import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Pressable, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { ModalConfirmationProps } from '@/interfaces/modals';
import React, { useEffect, useRef } from 'react';

export const ModalConfirmation = ({ modalParams, modalTexts, onConfirm, onCancel, disabledSave = false, content }: ModalConfirmationProps) => {
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (modalParams.visible) {
            if (modalParams.position === 'top' || modalParams.position === 'bottom') {
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }).start();
            }
        } else {
            if (modalParams.position === 'top' || modalParams.position === 'bottom') {
                translateY.setValue(modalParams.position === 'top' ? -1000 : 1000);
            }
        }
    }, [modalParams.visible, modalParams.position]);

    return (
        <Modal transparent={true} animationType="fade" visible={modalParams?.visible} onRequestClose={onCancel}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="light-content" translucent={true} />
            <TouchableOpacity
                style={[
                    styles.modalOverlay,
                    {
                        justifyContent: modalParams.position === 'center' ? 'center' : modalParams.position === 'top' ? 'flex-start' : 'flex-end',
                        paddingBottom: modalParams.position === 'center' ? 0 : 20,
                    },
                ]}
                activeOpacity={1}
                onPress={onCancel}
            >
                <TouchableWithoutFeedback>
                    <Animated.View
                        style={[
                            {
                                width: modalParams.position === 'center' ? 350 : '96%',
                                transform: modalParams.position === 'center' ? [] : [{ translateY: translateY }],
                            },
                            styles.modalContainer,
                        ]}
                    >
                        <Text style={styles.modalTitle}>{modalTexts?.title}</Text>
                        {modalTexts?.message && <Text style={styles.modalMessage}>{modalTexts?.message}</Text>}
                        {content && <View style={styles.contentModal}>{content}</View>}
                        <View style={styles.buttonContainer}>
                            {modalTexts?.textCancel && (
                                <Pressable
                                    onPress={onCancel}
                                    style={({ pressed }) => [
                                        {
                                            width: '48%',
                                            backgroundColor: pressed ? '#E0E0E0' : '#FFFFFF',
                                            borderWidth: 1,
                                            borderColor: '#EB5757',
                                            padding: 15,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10,
                                        },
                                    ]}
                                >
                                    <Text style={styles.cancelButtonText}>{modalTexts?.textCancel}</Text>
                                </Pressable>
                            )}
                            <Pressable
                                disabled={disabledSave}
                                onPress={onConfirm}
                                style={({ pressed }) => [
                                    {
                                        width: modalTexts?.textCancel ? '48%' : '100%',
                                        backgroundColor: pressed ? '#D32F2F' : '#EB5757',
                                        borderWidth: 1,
                                        borderColor: '#EB5757',
                                        padding: 15,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        opacity: disabledSave ? 0.8 : 1,
                                    },
                                ]}
                            >
                                <Text style={styles.confirmButtonText}>{modalTexts?.textConfirm}</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'OpenSansBold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 0,
    },
    buttonContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButtonText: {
        color: '#EB5757',
        fontSize: 15,
        fontFamily: 'OpenSansBold',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'OpenSansBold',
    },
    contentModal: {
        marginTop: 10,
        marginBottom: 15,
    },
});
