import { useTranslation } from 'react-i18next';

export const useErrorsMessage = (errorMessage: string): string => {
    const { t } = useTranslation();

    const match = errorMessage.match(/\(([^)]+)\)/);
    const errorCode = match ? match[1] : errorMessage;

    const errorMessages: Record<string, string> = {
        'auth/popup-closed-by-user': t('AuthErrors.popupClosedByUser'),
        'auth/invalid-email': t('AuthErrors.invalidEmail'),
        'auth/user-disabled': t('AuthErrors.userDisabled'),
        'auth/user-not-found': t('AuthErrors.userNotFound'),
        'auth/wrong-password': t('AuthErrors.wrongPassword'),
        'auth/invalid-credential': t('AuthErrors.usernameOrPasswordNotFound'),
        'username not found': t('AuthErrors.usernameOrPasswordNotFound'),
        'This email is already in use. Please try another email.': t(
            'AuthErrors.emailInUse'
        ),
        'auth/email-already-in-use': t('AuthErrors.emailInUse'),
        'This email is already registered. Please log in or verify your email.':
            t('AuthErrors.emailRegistered'),
        'This phone number is already in use.': t(
            'AuthErrors.phoneNumberInUse'
        ),
        'auth/invalid-verification-code': t(
            'AuthErrors.invalidVerificationCode'
        )
    };

    return errorMessages[errorCode] || t('General.somethingWentWrong');
};
