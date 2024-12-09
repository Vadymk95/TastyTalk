import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UserList } from '@root/components';

const FollowingPage: FC = () => {
    const { t } = useTranslation();

    const fetchUsers = async () => {
        console.log('Fetching users...');

        return [];
    };

    return <UserList title={t('')} fetchUsers={fetchUsers} />;
};

export default FollowingPage;
