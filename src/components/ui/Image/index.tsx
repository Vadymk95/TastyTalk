import { FC } from 'react';

type ImageProps = {
    src: string;
    alt: string;
    className?: string;
};

export const Image: FC<ImageProps> = ({ className, src, alt }) => {
    return <img className={`${className}`} src={src} alt={alt} />;
};
