import { FC, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@root/components/common/User';
import { SearchInput } from '@root/components/ui/SearchInput';
import { useUsersStore } from '@root/store/usersStore';

const SearchProfilePage: FC = () => {
    const { t } = useTranslation();
    const {
        users,
        searchQuery,
        setSearchQuery,
        loading,
        fetchUsers,
        fetchMoreUsers
    } = useUsersStore();

    const observerRef = useRef<HTMLDivElement>(null);

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.usernameLower.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users]);

    useEffect(() => {
        if (users.length === 0) {
            fetchUsers(true);
        }
    }, [fetchUsers, users.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loading) {
                    fetchMoreUsers();
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
    }, [fetchMoreUsers, loading]);

    useEffect(() => {
        return () => setSearchQuery('');
    }, [setSearchQuery]);

    return (
        <section className="h-100">
            <h1 className="main-heading mb-0 sm:mb-6">
                {t('SearchProfilePage.title')}
            </h1>
            <p className="text-center text-neutral-light mb-10 sm:mb-6">
                {t('SearchProfilePage.description')}
            </p>

            <div className="plate h-100">
                <SearchInput
                    name="search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('General.search')}
                />

                <ul className="space-y-4 mt-4">
                    {filteredUsers.map((user) => (
                        <User key={user.id} user={user} />
                    ))}
                </ul>

                {loading && (
                    <p className="text-center label p-4">
                        {t('General.loading')}
                    </p>
                )}

                <div ref={observerRef} style={{ height: '1px' }} />
            </div>
        </section>
    );
};

export default SearchProfilePage;
