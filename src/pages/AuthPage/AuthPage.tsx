import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LoginForm, RegisterForm } from '@root/components';
import { useAuthStore } from '@root/store/authStore';

const AuthPage: FC = () => {
    const { t } = useTranslation();
    const { user, isRegistered } = useAuthStore();
    const [isSignIn, setIsSignIn] = useState(true);
    const signInCondition = isSignIn && !user && !isRegistered;

    const handleSignInAction = () => setIsSignIn(true);

    return (
        <div
            className={`auth-form ${signInCondition ? 'auth-form--login' : 'auth-form--register'}`}
        >
            <h2 className="text-center text-2xl mb-8">
                {t(
                    signInCondition
                        ? 'AuthPage.signInToAccount'
                        : 'AuthPage.signUp'
                )}
            </h2>
            {signInCondition ? (
                <LoginForm setIsSignIn={setIsSignIn} />
            ) : (
                <RegisterForm signInAction={handleSignInAction} />
            )}
        </div>
    );
};

export default AuthPage;
