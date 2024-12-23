import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { HeaderNavigation } from '@root/components/common';
import { Image } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store';

import logo from '@root/assets/images/logo.svg';

export const Header: FC = () => {
    const { initialized } = useAuthStore();
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const threshold = 10;

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        if (Math.abs(currentScrollY - lastScrollY.current) < threshold) {
            return;
        }

        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
    }, []);

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
                    <Image
                        className="w-[54px] h-[54px] mr-2"
                        src={logo}
                        alt="TastyTalks"
                    />
                    <span className="sm:hidden">{t('Header.brand')}</span>
                </Link>

                {initialized && <HeaderNavigation />}
            </div>
        </header>
    );
};
