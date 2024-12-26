import { languages } from '@root/constants/languages';

const languageToCountryMap = languages.reduce(
    (acc, lang) => {
        acc[lang.code] = lang.code === 'en' ? 'us' : lang.code;
        return acc;
    },
    {} as Record<string, string>
);

export const getCountryFromLanguage = (): string | null => {
    const language = navigator.language || navigator.languages[0];
    if (!language) return null;

    const languageCode = language.split('-')[0];

    return languageToCountryMap[languageCode] || null;
};
