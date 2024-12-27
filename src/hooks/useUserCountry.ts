import { useQuery } from '@tanstack/react-query';

import { ipapi } from '@root/api/api';
import { getCountryFromLanguage } from '@root/helpers';

const DEFAULT_COUNTRY = 'us';

export const useUserCountry = () => {
    return useQuery({
        queryKey: ['userCountry'],
        queryFn: async () => {
            try {
                const response = await fetch(ipapi);
                if (!response.ok) {
                    throw new Error('Failed to fetch user country');
                }
                const data = await response.json();

                if (data?.country_code) {
                    return data.country_code.toLowerCase();
                } else {
                    throw new Error('Invalid country code');
                }
            } catch (error) {
                console.error('Error fetching user country:', error);

                const languageBasedCountry = getCountryFromLanguage();
                if (languageBasedCountry) {
                    return languageBasedCountry;
                }

                return DEFAULT_COUNTRY;
            }
        },
        staleTime: Infinity,
        retry: 1
    });
};