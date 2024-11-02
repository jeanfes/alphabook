import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

interface ModalConfirmationProps {
    visible: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ModalConfirmation = ({ visible, title, message, onConfirm, onCancel }: ModalConfirmationProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalText}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.textStyle}>Confirmar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonCancel]}
                            onPress={onCancel}
                        >
                            <Text style={styles.textStyle}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonCancel: {
        backgroundColor: '#f44336',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export const AlertConfirmation = async ({ title, message }: { title: string, message: string }) => {
    return new Promise((resolve) => {
        const [visible, setVisible] = useState(true);

        const handleConfirm = () => {
            setVisible(false);
            resolve(true);
        };

        const handleCancel = () => {
            setVisible(false);
            resolve(false);
        };

        return (
            <ModalConfirmation
                visible={visible}
                title={title}
                message={message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        );
    });
};