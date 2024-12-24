import { useEffect } from 'react';

export const useFooterPosition = () => {
    useEffect(() => {
        const footer = document.querySelector('.footer') as HTMLElement | null;
        const adjustFooter = () => {
            if (!footer) return;

            const viewportHeight = window.innerHeight;
            const bodyHeight = document.body.offsetHeight;

            if (bodyHeight <= viewportHeight) {
                footer.style.position = 'fixed';
                footer.style.bottom = '0';
            } else {
                footer.style.position = 'fixed';
                footer.style.bottom = 'env(safe-area-inset-bottom)';
            }
        };

        adjustFooter();

        window.addEventListener('resize', adjustFooter);

        return () => {
            window.removeEventListener('resize', adjustFooter);
        };
    }, []);
};
