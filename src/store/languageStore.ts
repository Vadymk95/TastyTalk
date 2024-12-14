import { doc, getDoc, setDoc } from 'firebase/firestore';
import i18n from 'i18next';
import { create } from 'zustand';

import { languages } from '@root/constants/languages';
import { db } from '@root/firebase/firebaseConfig';
import { useAuthStore } from '@root/store/authStore';

const supportedLanguageCodes = languages.map((lang) => lang.code);

interface LanguageState {
    language: string;
    setLanguage: (lang: string) => Promise<void>;
    loadLanguage: () => Promise<void>;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: 'en',

    setLanguage: async (lang: string) => {
        const { user } = useAuthStore.getState();

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { language: lang }, { merge: true });
        } else {
            localStorage.setItem('language', lang);
        }

        i18n.changeLanguage(lang);
        set({ language: lang });
    },

    loadLanguage: async () => {
        const { user } = useAuthStore.getState();
        let lang = 'en';

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            lang = (userSnap.exists() && userSnap.data()?.language) || 'en';
        } else {
            lang = localStorage.getItem('language') || detectSystemLanguage();
        }

        i18n.changeLanguage(lang);
        set({ language: lang });
    }
}));

const detectSystemLanguage = (): string => {
    const systemLanguage = navigator.language.split('-')[0];

    return supportedLanguageCodes.includes(systemLanguage)
        ? systemLanguage
        : 'en';
};
