import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EmailVerificationPage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        resendVerificationEmail,
        userProfile,
        checkEmailVerificationStatus
    } = useAuthStore();
    const [checking, setChecking] = useState(false);

    const [resendStatus, setResendStatus] = useState<'idle' | 'sent' | 'error'>(
        'idle'
    );
    const [isCooldown, setIsCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(60);

    const handleResendEmail = async () => {
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
            console.error('Error when resending the email:', error);
        }
    };

    useEffect(() => {
        if (!userProfile?.verified) {
            const intervalId = setInterval(async () => {
                try {
                    setChecking(true);
                    await checkEmailVerificationStatus();
                } finally {
                    setChecking(false);
                }
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [userProfile?.verified, checkEmailVerificationStatus]);

    useEffect(() => {
        if (userProfile?.verified && !checking) {
            navigate(routes.greeting);
        }
    }, [checking, userProfile?.verified, navigate]);

    return (
        <div className="flex-all-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-custom-light text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-main rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-white text-3xl animate-spin-slow"
                    />
                </div>

                <h2 className="text-2xl font-semibold text-neutral-dark">
                    {t('EmailVerificationPage.title')}
                </h2>

                {(userProfile?.verificationMethod === 'phone' ||
                    userProfile?.phoneNumber) && (
                    <p className="text-sm text-neutral-400 mb-6">
                        {t('EmailVerificationPage.preferPhoneNumber')}
                        <Link
                            to={routes.phoneNumberVerification}
                            className="ml-1 link-secondary"
                        >
                            {t('EmailVerificationPage.preferPhoneNumberLink')}
                        </Link>
                    </p>
                )}

                <p className="text-neutral-400 text-base mb-4">
                    {t('EmailVerificationPage.text')}
                </p>

                <p className="text-sm text-neutral-400 mt-4">
                    {resendStatus === 'sent' ? (
                        <span>
                            {t('EmailVerificationPage.emailSent')}{' '}
                            {`(${cooldownTime}s)`}
                        </span>
                    ) : resendStatus === 'error' ? (
                        <span>{t('EmailVerificationPage.emailSendError')}</span>
                    ) : (
                        <>
                            {t('EmailVerificationPage.resendEmailText')}{' '}
                            <Button variant="link" onClick={handleResendEmail}>
                                {t('EmailVerificationPage.resendEmail')}
                            </Button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
