import React from 'react';

export const GreetingPage = React.lazy(
    () => import('@root/pages/GreetingPage/GreetingPage')
);
