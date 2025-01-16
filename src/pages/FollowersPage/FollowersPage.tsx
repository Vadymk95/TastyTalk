import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UserList } from '@root/components/common/UserList';
import { useFollowers } from '@root/hooks/useFollowers';
import { useUsersStore } from '@root/store/usersStore';

const FollowersPage: FC = () => {
    const { t } = useTranslation();
    const { viewedUser } = useUsersStore();
    const {
        followers,
        followersSearchQuery,
        setFollowersSearchQuery,
        loadMore,
        loading,
        error
    } = useFollowers(viewedUser?.id || '');

    return (
        <UserList
            title={t('FollowersPage.title')}
            description={t('FollowersPage.description')}
            users={followers}
            searchQuery={followersSearchQuery}
            setSearchQuery={setFollowersSearchQuery}
            loadMore={loadMore}
            loading={loading}
            error={error}
        />
    );
};

export default FollowersPage;
