import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@root/components/common';
import { SearchInput } from '@root/components/ui';

const SearchProfilePage: FC = () => {
    const { t } = useTranslation();
    const [users] = useState<any[]>([
        {
            id: '1',
            username: 'john_doe',
            name: 'John Doe'
        },
        {
            id: '2',
            username: 'jane_doe',
            name: 'Jane Doe'
        }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading] = useState(false);

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubscribe = (id: string) => {
        console.log('Subscribing to user with id:', id);
    };

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

                {loading ? (
                    <p className="text-center label p-4">
                        {t('General.loading')}
                    </p>
                ) : filteredUsers.length > 0 ? (
                    <ul className="space-y-4 mt-4">
                        {filteredUsers.map((user) => (
                            <User
                                key={user.id}
                                username={user.username}
                                id={user.id}
                                name={user.name}
                                handleSubscribe={handleSubscribe}
                            />
                        ))}
                    </ul>
                ) : (
                    <p className="text-center label p-4">
                        {t('General.noResultsFound')}
                    </p>
                )}
            </div>
        </section>
    );
};

export default SearchProfilePage;
