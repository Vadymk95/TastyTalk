import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UserList } from '@root/components/common/UserList';
import { useUsersStore } from '@root/store/usersStore';
import { useFollowing } from '@root/hooks/useFollowing';

const FollowingPage: FC = () => {
    const { t } = useTranslation();
    const { viewedUser } = useUsersStore();
    const {
        following,
        followingSearchQuery,
        setFollowingSearchQuery,
        loadMore,
        loading,
        error
    } = useFollowing(viewedUser?.id || '');

    console.log('viewedUser?.id', viewedUser);

    return (
        <UserList
            title={t('FollowingPage.title')}
            description={t('FollowingPage.description')}
            users={following}
            searchQuery={followingSearchQuery}
            setSearchQuery={setFollowingSearchQuery}
            loadMore={loadMore}
            loading={loading}
            error={error}
        />
    );
};

export default FollowingPage;
