import { countries } from '@root/constants/countries';

export const localization = countries.reduce(
    (acc, country) => {
        acc[country.code.toLowerCase()] = country.name;
        return acc;
    },
    {} as Record<string, string>
);
