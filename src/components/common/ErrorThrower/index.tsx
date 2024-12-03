import { FC } from 'react';

export const ErrorThrower: FC = () => {
    throw new Error('Test ErrorThrower Component');
};
