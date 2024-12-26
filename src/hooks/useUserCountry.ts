import { useQuery } from '@tanstack/react-query';

import { ipapi } from '@root/api/api';

export const useUserCountry = () => {
    return useQuery({
        queryKey: ['userCountry'],
        queryFn: async () => {
            const response = await fetch(ipapi);
            if (!response.ok) {
                console.error('Failed to fetch user country');
                throw new Error('Failed to fetch user country');
            }
            const data = await response.json();
            return data.country_code.toLowerCase();
        },
        staleTime: Infinity,
        retry: 1
    });
};
