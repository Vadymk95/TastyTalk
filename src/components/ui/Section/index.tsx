import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@root/components/ui/Button';
import { SectionList } from '@root/components/ui/SectionList';
import { useLocalStorageStore } from '@root/store/localStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
    title: string;
    list: any[];
    onShowMore: () => void;
    sectionKey: string;
    icon: any;
}

export const Section: FC<IProps> = ({
    title,
    list,
    icon,
    sectionKey,
    onShowMore
}) => {
    const { t } = useTranslation();
    const { setItem, getItem } = useLocalStorageStore();
    const isHidden = getItem(sectionKey, false);

    const handleHide = () => setItem(sectionKey, !isHidden);

    return (
        <section className="section">
            <div className="flex justify-between items-center">
                <h2 className="badge bg-primary-light text-neutral-light flex items-center gap-2">
                    <span>{title}</span>
                    <FontAwesomeIcon icon={icon} />
                </h2>

                {isHidden ? (
                    <Button variant="link" onClick={handleHide}>
                        {t('General.show')}
                    </Button>
                ) : (
                    <Button variant="link" onClick={onShowMore}>
                        {t('General.showMore')}
                    </Button>
                )}
            </div>

            {isHidden ? null : (
                <>
                    <div className="mt-2">
                        <SectionList list={list} />
                    </div>

                    <div className="flex justify-end">
                        <Button variant="link" onClick={handleHide}>
                            {t('General.hide')}
                        </Button>
                    </div>
                </>
            )}
        </section>
    );
};
