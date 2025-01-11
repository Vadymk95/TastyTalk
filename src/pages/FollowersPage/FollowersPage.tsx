import { FC } from 'react';

import { UserList } from '@root/components/common/UserList';
import { useFollowers } from '@root/hooks/useFollowers';
import { useAuthStore } from '@root/store/authStore';
import { useTranslation } from 'react-i18next';

const FollowersPage: FC = () => {
    const { t } = useTranslation();
    const { userProfile } = useAuthStore();
    const {
        followers,
        followersSearchQuery,
        setFollowersSearchQuery,
        loadMore,
        loading,
        error
    } = useFollowers(userProfile?.id || '');

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
