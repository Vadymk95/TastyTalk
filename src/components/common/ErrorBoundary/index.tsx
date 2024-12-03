import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@root/components/ui';
import { routes } from '@root/router/routes';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<
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
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-screen gap-6">
                    <h1 className="main-heading text-primary">
                        Что-то пошло не так
                    </h1>
                    <p>
                        Мы столкнулись с неожиданной ошибкой. Попробуйте
                        обновить страницу.
                    </p>
                    <div className="gap-x-4 flex">
                        <Button onClick={this.handleReload}>
                            Обновить страницу
                        </Button>
                        <Link
                            to={routes.home}
                            className="block btn btn-secondary btn-medium"
                        >
                            На главную
                        </Link>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
