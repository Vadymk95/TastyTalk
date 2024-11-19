import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type GreetingCardProps = {
    to: string;
    title: string;
    icon: any;
};

export const GreetingCard: FC<GreetingCardProps> = ({ to, title, icon }) => {
    const { t } = useTranslation();
    const hasSubscriptions = true;

    console.log(icon);

    return (
        <Link to={to} className="card-greeting">
            <FontAwesomeIcon
                className="mr-3 text-neutral-dark/30"
                size="4x"
                icon={hasSubscriptions ? icon : faBan}
            />
            <p className="text-xl font-semibold text-primary mb-2">{title}</p>
            <span className="text-neutral-dark">
                {hasSubscriptions
                    ? title.toLowerCase()
                    : t('General.notAvailable')}
            </span>
        </Link>
    );
};
