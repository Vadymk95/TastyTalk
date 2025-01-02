import { Form, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, PhoneNumberInput } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

import { faCancel, faCheck, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PhoneNumberVerificationPage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        resendVerificationEmail,
        userProfile,
        checkEmailVerificationStatus
    } = useAuthStore();
    const [showEditForm, setShowEditForm] = useState(false);
    const [checking, setChecking] = useState(false);
    const [countryCode, setCountryCode] = useState('');

    const [resendStatus, setResendStatus] = useState<'idle' | 'sent' | 'error'>(
        'idle'
    );
    const [isCooldown, setIsCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(60);

    const handleRedirect = (path: 'home' | 'email-verification') =>
        navigate(path === 'home' ? routes.home : routes.emailVerification);

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
            console.error('Error when resending the code:', error);
        }
    };

    const handleShowEditForm = () => setShowEditForm((prev) => !prev);

    const handleSubmit = async (values: { phoneNumber: string }) => {
        console.log(values);
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
            navigate(routes.home);
        }
    }, [checking, userProfile?.verified, navigate]);

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

                <p className="text-neutral-400 text-base mb-6">
                    {t('PhoneNumberVerificationPage.text')}
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                    <Button
                        onClick={() => handleRedirect('email-verification')}
                    >
                        {t('PhoneNumberVerificationPage.goToEmailVerify')}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => handleRedirect('home')}
                    >
                        {t('PhoneNumberVerificationPage.goToHome')}
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
                            <Button onClick={handleResendEmail} variant="link">
                                {t('PhoneNumberVerificationPage.resendCode')}
                            </Button>
                        </>
                    )}
                </p>

                {showEditForm ? (
                    <Formik
                        preventDefault
                        validateOnChange
                        validateOnBlur
                        initialValues={{ phoneNumber: '' }}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="w-full mt-6 text-start">
                                    <PhoneNumberInput
                                        name="phoneNumber"
                                        label={'edit phone asdasdas as'}
                                        setCode={setCountryCode}
                                        code={countryCode}
                                    />

                                    <div className="flex justify-center gap-2 mt-4">
                                        <Button
                                            className="flex gap-2 items-center"
                                            onClick={handleShowEditForm}
                                        >
                                            <FontAwesomeIcon icon={faCancel} />
                                            <span>{t('General.cancel')}</span>
                                        </Button>

                                        <Button
                                            className="flex gap-2 items-center"
                                            type="submit"
                                            variant="secondary"
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                            <span>{t('General.confirm')}</span>
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <p>
                        <span className="text-neutral-400">
                            {t('General.or')}
                        </span>
                        <Button
                            onClick={handleShowEditForm}
                            variant="link"
                            className="ml-1"
                        >
                            {t('PhoneNumberVerificationPage.editPhoneNumber')}
                        </Button>
                    </p>
                )}
            </div>
        </div>
    );
};

export default PhoneNumberVerificationPage;
