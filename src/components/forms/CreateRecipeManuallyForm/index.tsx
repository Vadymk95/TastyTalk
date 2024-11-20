import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const CreateRecipeManuallyForm: FC = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col h-full max-w-4xl gap-6 mx-auto">
            {t('Forms.CreateRecipeManuallyForm.create')}
        </div>
    );
};
