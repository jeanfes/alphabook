import { ModalProps } from '@/interfaces/modals';
import { Modal } from 'react-native';

export const ModalSuccess = ({ modalParams, modalTexts, onConfirm, content }: ModalProps) => {
    return (
        <Modal transparent={true} animationType="fade" visible={modalParams?.visible} onRequestClose={onConfirm}>
            {content}
        </Modal>
    );
};
