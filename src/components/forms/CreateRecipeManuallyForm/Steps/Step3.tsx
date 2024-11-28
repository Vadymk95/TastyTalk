import { Field } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { DragAndDrop } from '@root/components/ui';

export const Step3: FC = () => {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.3.description')}</h3>

            <Field
                name="photo"
                component={DragAndDrop}
                placeholder="Drag and drop a photo here"
            />
        </section>
    );
};
