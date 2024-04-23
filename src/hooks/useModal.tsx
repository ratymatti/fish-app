import { RefObject, useRef } from "react";

type ModalType = { open: () => void, close: () => void } | null;

interface ModalHook {
    modalRef: RefObject<ModalType>;
    openModal: () => void;
    closeModal: () => void;
}

export function useModal(): ModalHook {
    const modalRef = useRef<ModalType>(null);

    function openModal(): void {
        if (modalRef.current) modalRef.current.open();
    }

    function closeModal(): void {
        if (modalRef.current) modalRef.current.close();
    }

    return { modalRef, openModal, closeModal }
}