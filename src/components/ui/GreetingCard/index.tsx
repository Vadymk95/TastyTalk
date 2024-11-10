import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type GreetingCardProps = {
    to: string;
    title: string;
};

export const GreetingCard: FC<GreetingCardProps> = ({ to, title }) => {
    const { t } = useTranslation();

    return (
        <Link
            to={to}
            className="bg-neutral-100 p-6 rounded-lg shadow-custom-light hover:shadow-lg hover:bg-neutral transition duration-300 text-center flex flex-col items-center"
        >
            <div className="text-xl font-semibold text-primary mb-2">
                {title}
            </div>
            <div className="text-sm text-neutral-dark">{`${t('GreetingPage.goTo')} ${title.toLowerCase()}`}</div>
        </Link>
    );
};