import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@root/components/common/User';
import { Back, SearchInput } from '@root/components/ui';
import { useUsersStore } from '@root/store/usersStore';
import { RelationshipType } from '@root/types';

type UserListProps = {
    title: string;
    description: string;
    type: RelationshipType;
    userId: string;
};

export const UserList: FC<UserListProps> = ({
    title,
    description,
    type,
    userId
}) => {
    const { t } = useTranslation();
    const {
        fetchRelationships,
        fetchMoreRelationships,
        searchQuery,
        setSearchQuery,
        loading,
        followers,
        following,
        hasMore
    } = useUsersStore();
    const users = type === 'followers' ? followers : following;
    const observerRef = useRef<HTMLDivElement>(null);

    const fetchMore = useCallback(() => {
        if (!loading && hasMore) {
            fetchMoreRelationships(userId, type);
        }
    }, [fetchMoreRelationships, loading, hasMore, type, userId]);

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.usernameLower.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users]);

    useEffect(() => {
        if (users.length === 0) {
            fetchRelationships(userId, type, true);
        }
    }, [fetchRelationships, type, userId, users.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loading && hasMore) {
                    fetchMore();
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
    }, [fetchMore, hasMore, loading]);

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

                {loading ? (
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

                <div ref={observerRef} style={{ height: '1px' }} />
            </div>
        </div>
    );
};
