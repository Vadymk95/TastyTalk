import React from 'react';

export const PhoneNumberVerificationPage = React.lazy(
    () =>
        import(
            '@root/pages/PhoneNumberVerificationPage/PhoneNumberlVerificationPage'
        )
);
