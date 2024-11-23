import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Stepper } from '@root/components/ui';

import {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8
} from './Steps';

export const CreateRecipeManuallyForm: FC = () => {
    const { t } = useTranslation();

    const steps = [
        { id: 1, title: 'Название', content: <Step1 /> },
        { id: 2, title: 'Описание', content: <Step2 />, isOptional: true },
        { id: 3, title: 'Фото', content: <Step3 />, isOptional: true },
        { id: 4, title: 'Ингридиенты', content: <Step4 /> },
        { id: 5, title: 'Шаги', content: <Step5 /> },
        { id: 6, title: 'Советы', content: <Step6 />, isOptional: true },
        {
            id: 7,
            title: 'Предостережения',
            content: <Step7 />,
            isOptional: true
        },
        { id: 8, title: 'Предостережения', content: <Step8 /> }
    ];

    return (
        <div className="flex flex-col h-full max-w-4xl gap-6 mx-auto">
            {t('Forms.CreateRecipeManuallyForm.create')}
            <Stepper steps={steps} />
        </div>
    );
};
