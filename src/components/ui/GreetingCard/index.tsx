import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { faBan, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type GreetingCardProps = {
    to: string;
    title: string;
    icon: IconDefinition;
    disabled?: boolean;
};

export const GreetingCard: FC<GreetingCardProps> = ({
    to,
    title,
    icon,
    disabled = false
}) => {
    const { t } = useTranslation();

    const handlePrevent = (e: MouseEvent<HTMLAnchorElement>) => {
        return disabled && e.preventDefault();
    };

    return (
        <Link
            to={to}
            onClick={handlePrevent}
            className={`card-greeting ${disabled ? 'card-greeting--disabled' : 'hover:scale-105'}`}
        >
            <FontAwesomeIcon
                className="mr-3 text-neutral-dark/30"
                size="4x"
                icon={disabled ? faBan : icon}
            />
            <p className="text-xl font-semibold text-primary">{title}</p>
            <span className="text-neutral-dark">
                {disabled ? t('General.notAvailable') : title.toLowerCase()}
            </span>
        </Link>
    );
};
