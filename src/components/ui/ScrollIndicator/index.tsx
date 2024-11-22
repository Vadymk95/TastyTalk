import { FC, useEffect, useRef, useState } from 'react';

import { Button } from '@root/components/ui';

import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ScrollIndicator: FC = () => {
    const [, setIsAtBottom] = useState(false);
    const [isAboveMidpoint, setIsAboveMidpoint] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;

        const isTop = scrollTop <= 125;
        const isBottom = scrollTop + windowHeight >= documentHeight - 125;

        setShowButton(!isTop && !isBottom);
        setIsAtBottom(isBottom);
        setIsAboveMidpoint(scrollTop + windowHeight / 2 < documentHeight / 2);
    };

    const handleScrollClick = () => {
        if (!isAboveMidpoint) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div ref={scrollRef} className="mt-4"></div>

            {showButton && (
                <Button
                    variant="primary"
                    size="large"
                    onClick={handleScrollClick}
                    className="fixed bottom-20 z-20 right-10 transform"
                >
                    <FontAwesomeIcon
                        icon={isAboveMidpoint ? faArrowDown : faArrowUp}
                    />
                </Button>
            )}
        </>
    );
};
