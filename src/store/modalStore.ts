import { create } from 'zustand';

type ModalState = {
    isModalOpen: { [key: string]: boolean };
    openModal: (modalId: string) => void;
    closeModal: (modalId: string) => void;
};

export const useModalStore = create<ModalState>((set) => ({
    isModalOpen: {},
    openModal: (modalId) =>
        set((state) => ({
            isModalOpen: { ...state.isModalOpen, [modalId]: true }
        })),
    closeModal: (modalId) =>
        set((state) => ({
            isModalOpen: { ...state.isModalOpen, [modalId]: false }
        }))
}));
