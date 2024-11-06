import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Navigation } from '@root/components';
import { routes } from '@root/router/routes';

export const Header: FC = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }

        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <header
            className={`header duration-500 ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}`}
        >
            <div className="container flex justify-between">
                <Link to={routes.home} className="link-primary nav-link p-4">
                    {t('Header.brand')}
                </Link>

                <Navigation />
            </div>
        </header>
    );
};
