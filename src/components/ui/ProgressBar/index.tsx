import { FC } from 'react';

interface ProgressBarProps {
    progress: number;
    className?: string;
    currentStep?: number;
    steps?: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({
    progress,
    className,
    currentStep,
    steps
}) => {
    const withSteps = currentStep && steps;

    return (
        <div className={`relative h-2 bg-gray-200 rounded ${className}`}>
            <div
                className="absolute top-0 left-0 h-full bg-gradient-main rounded transition-all"
                style={{ width: `${progress}%` }}
            />
            {withSteps && (
                <span className="absolute right-0 top-3 text-sm">
                    {currentStep}/{steps}
                </span>
            )}
        </div>
    );
};
