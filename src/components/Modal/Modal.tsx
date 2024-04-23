import React, { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';
import './Modal.css';

type ModalRef = { open: () => void; close: () => void; } | null;

interface ModalProps {
    children: ReactNode;
}

const Modal = forwardRef<ModalRef, ModalProps>(function Modal({ children }, ref) {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) throw new Error('Modal root not found');

    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => {
        if (dialog.current) {
            return {
                open() {
                    dialog.current?.showModal();
                },
                close() {
                    dialog.current?.close();
                }
            }
        }
        throw new Error('Dialog ref is null');
    });

    return createPortal(
        <dialog ref={dialog}>
            {children}
        </dialog>,
        modalRoot
    )
})

export default Modal;