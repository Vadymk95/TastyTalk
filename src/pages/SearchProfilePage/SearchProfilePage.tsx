import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@root/components/common/User';
import { SearchInput } from '@root/components/ui/SearchInput';
import { useUsers } from '@root/hooks/useUsers';

const SearchProfilePage: FC = () => {
    const { t } = useTranslation();
    const {
        filteredUsers,
        searchQuery,
        setSearchQuery,
        loading,
        error,
        observerRef
    } = useUsers();

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

                {searchQuery && filteredUsers.length === 0 && !loading && (
                    <p className="text-center label p-4">
                        {t('General.noResultsFound')}
                    </p>
                )}

                {loading && (
                    <p className="text-center label p-4">
                        {t('General.loading')}
                    </p>
                )}

                <div ref={observerRef} style={{ height: '1px' }} />
            </div>

            {error && (
                <p className="text-center text-primary p-4 truncate">
                    {t('General.errorOccurred')}: {error}
                </p>
            )}
        </section>
    );
};

export default SearchProfilePage;
