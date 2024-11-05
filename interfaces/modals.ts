export interface ModalTexts {
    title: string;
    message?: string;
    textConfirm: string;
    textCancel?: string;
}

export interface ModalParams {
    visible: boolean;
    position?: 'top' | 'bottom' | 'center';
}

export interface ModalProps {
    modalParams: ModalParams;
    modalTexts: ModalTexts;
    onConfirm: () => void;
    onCancel: () => void;
    showButtonCancel?: boolean;
    disabledSave?: boolean;
    content?: React.ReactNode;
}
