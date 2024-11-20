import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const CreateRecipeManuallyForm: FC = () => {
    const { t } = useTranslation();
    return <div>{t('Forms.CreateRecipeManuallyForm.create')}</div>;
};
