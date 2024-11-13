import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Link, Modal } from '@root/components/ui';
import { emails } from '@root/constants/emails';
import { useModalStore } from '@root/store';

export const SupportModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isSupportModalOpen = isModalOpen.support;

    const handleCloseSupportModal = () => closeModal('support');

    return (
        <Modal
            isOpen={isSupportModalOpen}
            onClose={handleCloseSupportModal}
            title={t('Modals.SupportModal.title')}
        >
            <div className="space-y-4 text-neutral-dark">
                <p>{t('Modals.SupportModal.description')}</p>

                <section>
                    <h3 className="text-lg font-semibold text-primary mb-1">
                        {t('Modals.SupportModal.contactTitle')}
                    </h3>

                    <p>{t('Modals.SupportModal.contactDescription')}</p>

                    <Link
                        variant="thirtiary"
                        className="underline"
                        href={`mailto:${emails.support}`}
                    >
                        {emails.support}
                    </Link>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-primary mb-1">
                        {t('Modals.SupportModal.advertisingTitle')}
                    </h3>

                    <p>{t('Modals.SupportModal.advertisingDescription')}</p>

                    <Link
                        variant="thirtiary"
                        className="underline"
                        href={`mailto:${emails.advertising}`}
                    >
                        {emails.advertising}
                    </Link>
                </section>
            </div>
        </Modal>
    );
};
