import {
    CountryCode,
    isPossiblePhoneNumber,
    isValidPhoneNumber,
    validatePhoneNumberLength
} from 'libphonenumber-js';

export const validatePhoneNumber = (value: string, countryCode: string) => {
    try {
        const isValidPhoneNumberValue = isValidPhoneNumber(
            value,
            countryCode.toUpperCase() as CountryCode
        );

        const isPossiblePhoneNumberValue = isPossiblePhoneNumber(
            value,
            countryCode.toUpperCase() as CountryCode
        );

        const isValidLength =
            validatePhoneNumberLength(
                value,
                countryCode.toUpperCase() as CountryCode
            ) === undefined;

        const isValid =
            isValidPhoneNumberValue &&
            isPossiblePhoneNumberValue &&
            isValidLength;

        return isValid;
    } catch (e) {
        console.error('Phone number validation failed:', e);
        return false;
    }
};
