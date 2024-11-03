import { LoginForm, SignUpForm } from '@root/components';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AuthPage: FC = () => {
    const { t } = useTranslation();
    const [isSignIn] = useState(true);

    return (
        <div className="auth-form">
            <h2 className="text-center text-2xl mb-8">
                {t('signInToAccount')}
            </h2>
            {isSignIn ? <LoginForm /> : <SignUpForm />}
        </div>
    );
};

export default AuthPage;
