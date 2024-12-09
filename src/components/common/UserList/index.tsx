import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type User = {
    id: string;
    name: string;
    profileImage: string;
};

type UserListProps = {
    title: string; // Название страницы ("Подписчики" или "Подписки")
    fetchUsers: () => Promise<User[]>; // Функция для загрузки данных
};

export const UserList: FC<UserListProps> = ({ title, fetchUsers }) => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<User[]>([]);
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

    // Фильтрация по запросу
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="plate">
            <h1 className="main-heading">{title}</h1>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('Search users')}
                className="w-full p-2 mb-4 border rounded"
            />

            {loading ? (
                <p>{t('Loading...')}</p>
            ) : filteredUsers.length > 0 ? (
                <ul className="space-y-4">
                    {filteredUsers.map((user) => (
                        <li key={user.id} className="flex items-center gap-4">
                            <img
                                src={user.profileImage}
                                alt={user.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <span>{user.name}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{t('No users found')}</p>
            )}
        </div>
    );
};
