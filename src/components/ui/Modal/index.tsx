import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode, useEffect, useRef } from 'react';

import { Button } from '@root/components/ui';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    titleCenter?: boolean;
    children?: ReactNode;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: 'primary' | 'secondary';
    classNameContainer?: string;
    classNameMotion?: string;
};

export const Modal: FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    titleCenter = false,
    children,
    onConfirm,
    confirmText,
    cancelText,
    variant = 'primary',
    classNameContainer = '',
    classNameMotion = ''
}) => {
    const scrollYRef = useRef(0);

    useEffect(() => {
        if (isOpen) {
            scrollYRef.current = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollYRef.current}px`;
            document.body.style.width = '100%';
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollYRef.current);
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${classNameContainer}`}
                >
                    <motion.div
                        //@ts-expect-error classNameMotion is not a valid prop
                        className={`plate sm:max-w-[95%] max-h-[85%] overflow-y-auto relative modal-${variant} ${classNameMotion}`}
                        initial={{ y: '-100vh', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-100vh', opacity: 0 }}
                        transition={{ ease: 'easeInOut', duration: 0.4 }}
                    >
                        <Button
                            variant="close"
                            className="absolute top-2 right-2 h-[32px] w-[32px] flex-all-center"
                            onClick={onClose}
                        >
                            <FontAwesomeIcon icon={faXmark} size="xl" />
                        </Button>

                        {title && (
                            <h2
                                className={`text-2xl sm:text-xl font-semibold my-5 px-4 ${titleCenter ? 'text-center' : ''}`}
                            >
                                {title}
                            </h2>
                        )}

                        <div>{children}</div>

                        {(cancelText || confirmText) && (
                            <div className="flex justify-end space-x-4 mt-4">
                                {cancelText && (
                                    <Button onClick={onClose}>
                                        {cancelText}
                                    </Button>
                                )}
                                {confirmText && (
                                    <Button
                                        variant="secondary"
                                        onClick={onConfirm}
                                    >
                                        {confirmText}
                                    </Button>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
