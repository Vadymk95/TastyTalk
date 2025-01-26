import { components } from '@root/locales/en/components';
import { forms } from '@root/locales/en/forms';
import { modals } from '@root/locales/en/modals';
import { other } from '@root/locales/en/other';
import { pages } from '@root/locales/en/pages';

export const en = {
    en: {
        translation: {
            ...pages,
            ...forms,
            ...modals,
            ...components,
            ...other
        }
    }
};
