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
            fetchFollowers(true);
        }
    }, [setCurrentUserId, userId, fetchFollowers]);

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
