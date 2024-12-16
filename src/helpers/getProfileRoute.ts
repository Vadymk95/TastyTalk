import { routes } from '@root/router/routes';

export const getProfileRoute = (username?: string): string => {
    return username
        ? routes.profile.replace(':username', username)
        : routes.home;
};
