import { LoginForm, RegisterForm } from '@root/components';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AuthPage: FC = () => {
    const { t } = useTranslation();
    const [isSignIn, setIsSignIn] = useState(true);
    const handleSignUpAction = () => setIsSignIn(false);
    const handleSignInAction = () => setIsSignIn(true);

    return (
        <div className="auth-form">
            <h2 className="text-center text-2xl mb-8">
                {t(isSignIn ? 'signInToAccount' : 'signUp')}
            </h2>
            {isSignIn ? (
                <LoginForm signUpAction={handleSignUpAction} />
            ) : (
                <RegisterForm signInAction={handleSignInAction} />
            )}
        </div>
    );
};

export default AuthPage;
