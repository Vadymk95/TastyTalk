import { useUsersStore } from '@root/store/usersStore';
import { useEffect } from 'react';

export const useFollowers = (userId: string) => {
    const {
        followers,
        followersSearchQuery,
        setFollowersSearchQuery,
        fetchFollowers,
        fetchMoreFollowers,
        followersHasMore,
        loading,
        error,
        setCurrentUserId,
        currentUserId
    } = useUsersStore();

    useEffect(() => {
        if (userId) {
            setCurrentUserId(userId);

            if (followers.length === 0) {
                fetchFollowers(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCurrentUserId, userId]);

    const loadMore = () => {
        if (followersHasMore && !loading && currentUserId) {
            fetchMoreFollowers();
        }
    };

    return {
        followers,
        followersSearchQuery,
        setFollowersSearchQuery,
        loadMore,
        loading,
        error
    };
};
