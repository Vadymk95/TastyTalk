import { FC } from 'react';
import { Link } from 'react-router-dom';

type GreetingCardProps = {
    to: string;
    title: string;
};

export const GreetingCard: FC<GreetingCardProps> = ({ to, title }) => {
    return (
        <Link
            to={to}
            className="bg-neutral-100 p-10 sm:p-6 rounded-lg shadow-custom-light hover:shadow-lg hover:bg-neutral transition duration-300 text-center justify-center flex flex-col items-center"
        >
            <p className="text-xl font-semibold text-primary mb-2">{title}</p>
            <span className="text-neutral-dark">{title.toLowerCase()}</span>
        </Link>
    );
};
