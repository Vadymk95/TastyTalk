import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@root/components/common/User';
import { Back, SearchInput } from '@root/components/ui';
import { useUsersStore } from '@root/store/usersStore';
import { UserProfile } from '@root/types';

type UsersType = 'followers' | 'following';

type UserListProps = {
    title: string;
    description: string;
    type: UsersType;
    userId: string;
};

export const UserList: FC<UserListProps> = ({
    title,
    description,
    type,
    userId
}) => {
    const { t } = useTranslation();
    const { getFollowing, getFollowers, searchQuery, setSearchQuery, loading } =
        useUsersStore();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data =
                    type === 'following'
                        ? await getFollowing(userId)
                        : await getFollowers(userId);
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, userId]);

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.usernameLower.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users]);

    useEffect(() => {
        return () => setSearchQuery('');
    }, [setSearchQuery]);

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
                <p className="text-center label p-4">{t('General.loading')}</p>
            )}

            <div ref={observerRef} style={{ height: '1px' }} />
        </div>
    );
};
