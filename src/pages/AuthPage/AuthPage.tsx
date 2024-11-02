import { SignInForm, SignUpForm } from '@root/components';
import { FC, useState } from 'react';

const AuthPage: FC = () => {
    const [isSignIn] = useState(true);

    return (
        <div className="flex justify-center items-center">
            {isSignIn ? <SignInForm /> : <SignUpForm />}
        </div>
    );
};

export default AuthPage;
