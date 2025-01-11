// components/common/UserList.tsx
import { FC, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@root/components/common/User';
import { Back, SearchInput } from '@root/components/ui';
import { UserProfile } from '@root/types';

type UserListProps = {
    title: string;
    description: string;
    users: UserProfile[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    loadMore: () => void;
    loading: boolean;
    error: string | null;
};

export const UserList: FC<UserListProps> = ({
    title,
    description,
    users,
    searchQuery,
    setSearchQuery,
    loadMore,
    loading,
    error
}) => {
    const { t } = useTranslation();
    const observerRef = useRef<HTMLDivElement>(null);

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.usernameLower.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loading) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );

        const currentRef = observerRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [loadMore, loading]);

    useEffect(() => {
        return () => setSearchQuery('');
    }, [setSearchQuery]);

    return (
        <div className="plate relative">
            <Back className="absolute" />
            <h1 className="main-heading text-primary">{title}</h1>
            <p className="label text-center mb-4">{description}</p>

            <div className="h-100">
                <SearchInput
                    name="search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('General.search')}
                />

                {loading && users.length === 0 ? (
                    <p className="text-center label p-4">
                        {t('General.loading')}
                    </p>
                ) : (
                    <ul className="space-y-4 mt-4">
                        {filteredUsers.map((user) => (
                            <User key={user.id} user={user} />
                        ))}
                    </ul>
                )}

                {searchQuery && filteredUsers.length === 0 && !loading && (
                    <p className="text-center label p-4">
                        {t('General.noResultsFound')}
                    </p>
                )}

                {loading && users.length > 0 && (
                    <p className="text-center label p-4">
                        {t('General.loading')}
                    </p>
                )}

                <div ref={observerRef} style={{ height: '1px' }} />
            </div>

            {error && (
                <p className="text-center text-red-500 p-4">
                    {t('General.errorOccurred')}: {error}
                </p>
            )}
        </div>
    );
};
