import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UserList } from '@root/components/common';

const FollowingPage: FC = () => {
    const { t } = useTranslation();

    const fetchUsers = async () => {
        console.log('Fetching users...');

        return [
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
        ];
    };

    return (
        <UserList
            title={t('FollowingPage.title')}
            fetchUsers={fetchUsers}
            description={t('FollowingPage.description')}
        />
    );
};

export default FollowingPage;
