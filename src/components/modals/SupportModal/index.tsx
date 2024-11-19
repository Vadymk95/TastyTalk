import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Link, Modal } from '@root/components/ui';
import { emails } from '@root/constants/emails';
import { useModalStore } from '@root/store';
import { ModalsEnum } from '@root/constants/modals';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SupportModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isSupportModalOpen = isModalOpen.support;

    const handleCloseSupportModal = () => closeModal(ModalsEnum.Support);

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
                        className="underline flex items-center"
                        href={`mailto:${emails.support}`}
                    >
                        <FontAwesomeIcon
                            className="mr-3"
                            size="xl"
                            icon={faEnvelope}
                        />
                        <span>{emails.support}</span>
                    </Link>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-primary mb-1">
                        {t('Modals.SupportModal.advertisingTitle')}
                    </h3>

                    <p>{t('Modals.SupportModal.advertisingDescription')}</p>

                    <Link
                        variant="thirtiary"
                        className="underline flex items-center"
                        href={`mailto:${emails.advertising}`}
                    >
                        <FontAwesomeIcon
                            className="mr-3"
                            size="xl"
                            icon={faEnvelope}
                        />
                        <span>{emails.advertising}</span>
                    </Link>
                </section>
            </div>
        </Modal>
    );
};
