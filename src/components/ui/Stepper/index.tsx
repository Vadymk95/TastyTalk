import { FC, JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ProgressBar } from '@root/components/ui';

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
    onReset?: () => void;
}

interface Step {
    id: number;
    title: string;
    content: JSX.Element;
    isOptional?: boolean;
}

export const Stepper: FC<StepperProps> = ({ steps, onReset }) => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);

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

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <div className="plate relative">
            <ProgressBar
                progress={progress}
                currentStep={currentStep + 1}
                steps={steps.length}
                className="mb-6"
            />

            <h2 className="text-2xl font-heading text-primary mb-4">
                {steps[currentStep].title}
            </h2>

            {currentStep > 0 && (
                <Button
                    className="flex items-center gap-3 absolute top-16 right-4"
                    onClick={handleReset}
                >
                    <FontAwesomeIcon icon={faArrowRotateBack} />
                </Button>
            )}

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
                    >
                        <span className="sm:hidden">{t('Stepper.next')}</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                )}
            </div>
        </div>
    );
};
