import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LoginForm, RegisterForm } from '@root/components/forms';
import { Image } from '@root/components/ui/Image';
import { useAuthStore } from '@root/store/authStore';

import logo from '@root/assets/images/logo.svg';

const AuthPage: FC = () => {
    const { t } = useTranslation();
    const { user, isRegistered } = useAuthStore();
    const [isSignIn, setIsSignIn] = useState(true);
    const signInCondition = isSignIn && !user && !isRegistered;

    const handleSignInAction = () => setIsSignIn(true);

    return (
        <div
            className={`plate ${signInCondition ? 'auth-form--login' : 'auth-form--register'}`}
        >
            <div className="w-full flex justify-center mb-4">
                <Image className="h-[75px]" src={logo} alt="TastyTalks" />
            </div>

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
