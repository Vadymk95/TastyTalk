import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UserList } from '@root/components/common/UserList';
import { useFollowing } from '@root/hooks/useFollowing';
import { useUsersStore } from '@root/store/usersStore';

const FollowingPage: FC = () => {
    const { t } = useTranslation();
    const { viewedUser } = useUsersStore();
    const { following, searchQuery, setSearchQuery, loadMore, loading, error } =
        useFollowing(viewedUser?.id || '');

    return (
        <UserList
            title={t('FollowingPage.title')}
            description={t('FollowingPage.description')}
            users={following}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loadMore={loadMore}
            loading={loading}
            error={error}
        />
    );
};

export default FollowingPage;
