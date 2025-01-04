import { auth } from '@root/firebase/firebaseConfig';
import { RecaptchaVerifier } from 'firebase/auth';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PhoneVerificationForm } from '@root/components/forms/PhoneVerificationForm';
import { Button } from '@root/components/ui/Button';
import { testPhone } from '@root/data';
import { useAuthStore } from '@root/store/authStore';

import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const isDev = import.meta.env.VITE_ENV === 'development';

const PhoneNumberVerificationPage: FC = () => {
    const { t } = useTranslation();
    const [isCodeSent, setIsCodeSent] = useState(false);
    const { verifyPhoneNumber, userProfile } = useAuthStore();
    const [recaptchaInitialized, setRecaptchaInitialized] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState<any | null>(
        null
    );

    const [resendStatus, setResendStatus] = useState<'idle' | 'sent' | 'error'>(
        'idle'
    );
    const [isCooldown, setIsCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(60);

    const handleResendCode = async () => {
        if (isCooldown) return;

        try {
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

    const renderRecaptcha = async () => {
        try {
            if (window.recaptchaVerifier) {
                await window.recaptchaVerifier.render();
                setRecaptchaInitialized(true);
            } else {
                const setup = setupRecaptcha();

                if (setup) {
                    window.recaptchaVerifier = setup;
                    await window.recaptchaVerifier.render();
                    setRecaptchaInitialized(true);
                }
            }
        } catch (error) {
            console.error('Failed to render reCAPTCHA:', error);
        }
    };

    const setupRecaptcha = (): RecaptchaVerifier | void => {
        if (!auth || recaptchaInitialized) return;

        const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            'recaptcha-container', // ID элемента для контейнера reCAPTCHA
            {
                size: 'normal',
                callback: () => {
                    console.log('reCAPTCHA verified:');
                    // Здесь можно активировать кнопку отправки или другие действия
                },
                'expired-callback': () => {
                    console.error('reCAPTCHA expired. Re-rendering...');
                    // Перерисовываем reCAPTCHA при истечении срока действия
                    renderRecaptcha();
                },
                'error-callback': (error: any) => {
                    console.error('reCAPTCHA error:', error);
                    alert(
                        'There was an error with reCAPTCHA. Please try again.'
                    );
                    renderRecaptcha();
                }
            }
        );

        return recaptchaVerifier;
    };

    const handleSendCode = async () => {
        try {
            const appVerifier = window.recaptchaVerifier;
            const phoneNumber = '+' + (userProfile?.phoneNumber || '');
            const result = await verifyPhoneNumber(
                isDev ? testPhone.phoneNumber : phoneNumber,
                appVerifier
            );

            window.confirmationResult = result;

            setConfirmationResult(result);
            setIsCodeSent(true);
        } catch (err: any) {
            console.error('Error sending code:', err);

            if (err.message.includes('reCAPTCHA')) {
                renderRecaptcha();
            }
        }
    };

    useEffect(() => {
        if (!window.recaptchaVerifier) {
            renderRecaptcha();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

                {!isCodeSent && (
                    <div className="flex w-full justify-center my-4">
                        <div id="recaptcha-container" />
                    </div>
                )}

                {isCodeSent ? (
                    <>
                        <p className="text-neutral-400 text-base mb-2">
                            {t('PhoneNumberVerificationPage.text')}
                        </p>

                        <PhoneVerificationForm
                            confirmationResult={confirmationResult}
                        />

                        <p className="text-sm text-neutral-400 mt-4">
                            {resendStatus === 'sent' ? (
                                <span>
                                    {t('PhoneNumberVerificationPage.codeSent')}{' '}
                                    {`(${cooldownTime}s)`}
                                </span>
                            ) : resendStatus === 'error' ? (
                                <span>
                                    {t(
                                        'PhoneNumberVerificationPage.codeSendError'
                                    )}
                                </span>
                            ) : (
                                <>
                                    {t(
                                        'PhoneNumberVerificationPage.resendCodeText'
                                    )}{' '}
                                    <Button
                                        onClick={handleResendCode}
                                        variant="link"
                                    >
                                        {t(
                                            'PhoneNumberVerificationPage.resendCode'
                                        )}
                                    </Button>
                                </>
                            )}
                        </p>
                    </>
                ) : (
                    recaptchaInitialized && (
                        <Button onClick={handleSendCode}>
                            {t('PhoneNumberVerificationPage.sendCode')}
                        </Button>
                    )
                )}
            </div>
        </div>
    );
};

export default PhoneNumberVerificationPage;
