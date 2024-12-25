import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@root/components/common/User';
import { Back, SearchInput } from '@root/components/ui';
import { UserProfile } from '@root/types';

type UserListProps = {
    title: string;
    description: string;
    fetchUsers: () => any;
};

export const UserList: FC<UserListProps> = ({
    title,
    description,
    fetchUsers
}) => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<UserProfile[]>([]);
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

    return (
        <div className="plate relative">
            <Back className="absolute" />
            <h1 className="main-heading text-primary">{title}</h1>
            <p className="label text-center mb-4">{description}</p>
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
                <ul className="space-y-4 mt-4">
                    {filteredUsers.map((user) => (
                        <User key={user.id} user={user} />
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
