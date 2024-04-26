import React, { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';
import '../../input.css';

type ModalRef = { open: () => void; close: () => void; } | null;

interface ModalProps {
    children: ReactNode;
    fishCard?: boolean;
}

const Modal = forwardRef<ModalRef, ModalProps>(function Modal({ children, fishCard }, ref) {
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

    let styles: string = 'bg-neutral-700 p-4';
    
    if (fishCard) {
        styles += " w-1/2"
    }

    return createPortal(
        <dialog ref={dialog} className={styles}>
            {children}
        </dialog>,
        modalRoot
    )
})

export default Modal;