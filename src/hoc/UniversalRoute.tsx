import { FC, ReactNode } from 'react';

interface UniversalRouteProps {
    element: ReactNode;
}

export const UniversalRoute: FC<UniversalRouteProps> = ({ element }) => {
    return <>{element}</>;
};
