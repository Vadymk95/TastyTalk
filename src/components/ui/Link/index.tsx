import { AnchorHTMLAttributes, FC, ReactNode } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
    href?: string;
    className?: string;
    variant?: 'primary' | 'secondary' | 'thirtiary' | 'accent';
}

export const Link: FC<LinkProps> = ({
    variant = 'primary',
    href,
    className,
    children,
    ...props
}) => {
    return (
        <a href={href} className={`link-${variant} ${className}`} {...props}>
            {children}
        </a>
    );
};
