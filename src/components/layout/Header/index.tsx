import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { HeaderNavigation } from '@root/components/common/HeaderNavigation';
import { Image } from '@root/components/ui/Image';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

import logo from '@root/assets/images/logo.svg';

export const Header: FC = () => {
    const { initialized } = useAuthStore();
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
                        className="h-[50px] w-auto"
                        src={logo}
                        alt="TastyTalks"
                    />
                </Link>

                {initialized && <HeaderNavigation />}
            </div>
        </header>
    );
};
