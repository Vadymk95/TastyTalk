import { useTranslation } from 'react-i18next';

export const useGetAuthErrorMessage = (errorMessage: string): string => {
    const { t } = useTranslation();

    const match = errorMessage.match(/\(([^)]+)\)/);
    const errorCode = match ? match[1] : errorMessage;

    const errorMessages: Record<string, string> = {
        'auth/popup-closed-by-user': t('AuthErrors.popupClosedByUser'),
        'auth/invalid-email': t('AuthErrors.invalidEmail'),
        'auth/user-disabled': t('AuthErrors.userDisabled'),
        'auth/user-not-found': t('AuthErrors.userNotFound'),
        'auth/wrong-password': t('AuthErrors.wrongPassword'),
        'auth/invalid-credential': t('AuthErrors.usernameNotFound'),
        'username not found': t('AuthErrors.usernameNotFound')
    };

    return errorMessages[errorCode] || t('General.somethingWentWrong');
};
