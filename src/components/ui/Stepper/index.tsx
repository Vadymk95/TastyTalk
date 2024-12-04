import { FC, JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { ResetStepperModal } from '@root/components/modals';
import { Button, ProgressBar } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

import {
    faArrowRotateBack,
    faChevronLeft,
    faChevronRight,
    faCircleCheck,
    faForward
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StepperProps {
    steps: Step[];
    isStepValid: (stepIndex: number) => boolean;
    canSkipStep: (stepIndex: number) => boolean;
    onReset?: () => void;
    currentStep: number;
    setCurrentStep: (step: number) => void;
}

interface Step {
    id: number;
    title: string;
    content: JSX.Element;
    isOptional?: boolean;
}

export const Stepper: FC<StepperProps> = ({
    steps,
    isStepValid,
    canSkipStep,
    onReset,
    currentStep,
    setCurrentStep
}) => {
    const { t } = useTranslation();
    const { openModal } = useModalStore();

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkip = () => {
        if (steps[currentStep].isOptional) {
            handleNext();
        }
    };

    const handleReset = () => {
        setCurrentStep(0);

        if (onReset) {
            onReset();
        }
    };

    const handleOpenModal = () => openModal(ModalsEnum.ResetStepper);

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <div className="plate relative">
            <ProgressBar
                progress={progress}
                currentStep={currentStep + 1}
                steps={steps.length}
                className="mb-6"
            />

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-heading text-primary">
                    {steps[currentStep].title}
                </h2>

                {currentStep > 0 && (
                    <Button
                        className="flex items-center gap-3"
                        onClick={handleOpenModal}
                    >
                        <FontAwesomeIcon icon={faArrowRotateBack} />
                    </Button>
                )}
            </div>

            <div className="mb-14">{steps[currentStep].content}</div>

            <div className="flex justify-between items-center">
                <Button
                    size="large"
                    className="flex items-center gap-3"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span className="sm:hidden">{t('Stepper.back')}</span>
                </Button>

                {steps[currentStep].isOptional && (
                    <Button
                        className="flex items-center gap-3"
                        size="large"
                        onClick={handleSkip}
                        disabled={!canSkipStep(currentStep)}
                    >
                        <span className="sm:hidden">{t('Stepper.skip')}</span>
                        <FontAwesomeIcon icon={faForward} />
                    </Button>
                )}

                {currentStep === steps.length - 1 ? (
                    <Button
                        className="flex items-center gap-3"
                        variant="secondary"
                        size="large"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faCircleCheck} />
                        <span className="sm:hidden">{t('Stepper.submit')}</span>
                    </Button>
                ) : (
                    <Button
                        className="flex items-center gap-3"
                        variant="secondary"
                        size="large"
                        onClick={handleNext}
                        disabled={!isStepValid(currentStep)}
                    >
                        <span className="sm:hidden">{t('Stepper.next')}</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                )}
            </div>

            <ResetStepperModal handleReset={handleReset} />
        </div>
    );
};
