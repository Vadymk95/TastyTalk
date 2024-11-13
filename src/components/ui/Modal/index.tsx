import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode, useEffect } from 'react';

import { Button } from '@root/components/ui';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
};

export const Modal: FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    onConfirm,
    confirmText,
    cancelText
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div
                        className="bg-white rounded-lg shadow-custom-light p-6 w-full max-w-lg relative"
                        initial={{ y: '-100vh', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-100vh', opacity: 0 }}
                        transition={{ ease: 'easeInOut', duration: 0.4 }}
                    >
                        <Button
                            variant="close"
                            className="absolute top-4 right-4 text-2xl"
                            onClick={onClose}
                        >
                            &times;
                        </Button>

                        {title && (
                            <h2 className="text-2xl font-semibold text-primary mb-4">
                                {title}
                            </h2>
                        )}

                        <div className="mb-6">{children}</div>

                        <div className="flex justify-end space-x-4">
                            {cancelText && (
                                <Button onClick={onClose}>{cancelText}</Button>
                            )}
                            {confirmText && (
                                <Button variant="secondary" onClick={onConfirm}>
                                    {confirmText}
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
