import React, { Component, ReactNode } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button, Image } from '@root/components/ui';
import { routes } from '@root/router/routes';

import errorBoundaryImage from '@root/assets/images/errorBoundary.jpg';

import { faHome, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ErrorBoundaryProps extends WithTranslation {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundaryComponent extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    handleReload = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        const { hasError } = this.state;
        const { t, children } = this.props;

        if (hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gradient-to-br from-pink-100 to-red-200 text-center p-6">
                    <div className="rounded-lg max-w-[600px] overflow-hidden">
                        <Image
                            src={errorBoundaryImage}
                            alt={t('ErrorBoundary.imageAlt')}
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-primary">
                        {t('ErrorBoundary.title')}
                    </h1>
                    <p className="text-lg text-neutral-dark">
                        {t('ErrorBoundary.description')}
                    </p>
                    <div className="gap-8 flex flex-wrap justify-center">
                        <Button
                            onClick={this.handleReload}
                            variant="primary"
                            size="large"
                            className="flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faRotateRight} />
                            <span>{t('ErrorBoundary.reloadButton')}</span>
                        </Button>
                        <Link
                            to={routes.home}
                            className="flex btn btn-secondary btn-large items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faHome} />
                            <span>{t('ErrorBoundary.homeButton')}</span>
                        </Link>
                    </div>
                </div>
            );
        }

        return children;
    }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryComponent);
