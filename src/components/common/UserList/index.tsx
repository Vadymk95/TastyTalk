import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@root/components/common';
import { Back, SearchInput } from '@root/components/ui';

type UserListProps = {
    title: string;
    fetchUsers: () => Promise<any[]>;
};

export const UserList: FC<UserListProps> = ({ title, fetchUsers }) => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [fetchUsers]);

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubscribe = (id: string) => {
        console.log('Subscribing to user with id:', id);
    };

    return (
        <div className="plate">
            <Back />
            <h1 className="main-heading">{title}</h1>
            <SearchInput
                name="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('General.search')}
            />

            {loading ? (
                <p className="text-center label p-4">{t('General.loading')}</p>
            ) : filteredUsers.length > 0 ? (
                <ul className="space-y-4">
                    {filteredUsers.map((user) => (
                        <User
                            key={user.id}
                            username={user.username}
                            id={user.id}
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
    );
};
