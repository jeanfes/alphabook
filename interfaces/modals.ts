export interface ModalTexts {
    title: string;
    message?: string;
    textConfirm: string;
    textCancel?: string;
}

export interface ModalParamsConfirm {
    visible: boolean;
    position?: 'top' | 'bottom' | 'center';
}

export interface ModalParams {
    visible: boolean;
    position?: 'top' | 'bottom' | 'center';
    text: string;
}

export interface ModalConfirmationProps {
    modalParams: ModalParamsConfirm;
    modalTexts: ModalTexts;
    onConfirm: () => void;
    onCancel: () => void;
    showButtonCancel?: boolean;
    disabledSave?: boolean;
    content?: React.ReactNode;
}

export interface ModalSuccessProps {
    modalParams: ModalParams;
    setModalParams: (params: ModalParams) => void;
}

export interface ModalErrorProps {
    modalParams: ModalParams;
    setModalParams: (params: ModalParams) => void;
}