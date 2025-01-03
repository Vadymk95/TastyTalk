import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PhoneNumberVerificationPage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { resendVerificationEmail } = useAuthStore();

    const [resendStatus, setResendStatus] = useState<'idle' | 'sent' | 'error'>(
        'idle'
    );
    const [isCooldown, setIsCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(60);

    const handleRedirect = (path: 'home' | 'email-verification') =>
        navigate(path === 'home' ? routes.home : routes.emailVerification);

    const handleResendCode = async () => {
        if (isCooldown) return;

        try {
            await resendVerificationEmail();
            setResendStatus('sent');
            setIsCooldown(true);
            const timer = setInterval(() => {
                setCooldownTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsCooldown(false);
                        setCooldownTime(60);
                        setResendStatus('idle');
                        return 60;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } catch (error: any) {
            setResendStatus('error');
            console.error('Error when resending the code:', error);
        }
    };

    return (
        <div className="flex-all-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-custom-light text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-main rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faPhone}
                        className="text-white text-3xl animate-spin-slow"
                    />
                </div>

                <h2 className="text-2xl font-semibold text-neutral-dark mb-2">
                    {t('PhoneNumberVerificationPage.title')}
                </h2>

                <p className="text-neutral-400 text-base mb-2">
                    {t('PhoneNumberVerificationPage.text')}
                </p>

                <p className="mb-2 label text-xl font-semibold">
                    {t('PhoneNumberVerificationPage.goTo')}
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                    <Button
                        variant="secondary"
                        onClick={() => handleRedirect('home')}
                    >
                        {t('PhoneNumberVerificationPage.goToHome')}
                    </Button>
                    <Button
                        onClick={() => handleRedirect('email-verification')}
                    >
                        {t('PhoneNumberVerificationPage.goToEmailVerify')}
                    </Button>
                </div>

                <p className="text-sm text-neutral-400 mt-4">
                    {resendStatus === 'sent' ? (
                        <span>
                            {t('PhoneNumberVerificationPage.codeSent')}{' '}
                            {`(${cooldownTime}s)`}
                        </span>
                    ) : resendStatus === 'error' ? (
                        <span>
                            {t('PhoneNumberVerificationPage.codeSendError')}
                        </span>
                    ) : (
                        <>
                            {t('PhoneNumberVerificationPage.resendCodeText')}{' '}
                            <Button onClick={handleResendCode} variant="link">
                                {t('PhoneNumberVerificationPage.resendCode')}
                            </Button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default PhoneNumberVerificationPage;
