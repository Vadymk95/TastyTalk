import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UserList } from '@root/components/common';

const FollowersPage: FC = () => {
    const { t } = useTranslation();

    const fetchUsers = async () => {
        console.log('Fetching users...');

        return [
            {
                id: '1',
                username: 'john_doe'
            },
            {
                id: '2',
                username: 'jane_doe'
            }
        ];
    };

    return (
        <UserList
            title={t('FollowersPage.title')}
            fetchUsers={fetchUsers}
            description={t('FollowersPage.description')}
        />
    );
};

export default FollowersPage;
