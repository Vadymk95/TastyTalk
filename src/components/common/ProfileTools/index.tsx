import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@root/router/routes';

import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ProfileTools: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex">
            <Link
                to={routes.settings}
                className="flex items-center gap-2 link-thirtiary"
            >
                <FontAwesomeIcon className="sm:text-2xl" icon={faGear} />
                <span className=" sm:hidden">{t('General.settings')}</span>
            </Link>
        </div>
    );
};
