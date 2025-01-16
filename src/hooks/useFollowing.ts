import { useUsersStore } from '@root/store/usersStore';
import { useEffect } from 'react';

export const useFollowing = (userId: string) => {
    const {
        following,
        followingSearchQuery,
        setFollowingSearchQuery,
        fetchFollowing,
        followingHasMore,
        loading,
        error,
        setCurrentUserId,
        currentUserId,
        fetchMoreFollowing
    } = useUsersStore();

    useEffect(() => {
        if (userId) {
            setCurrentUserId(userId);
            fetchFollowing(true);
        }
    }, [setCurrentUserId, userId, fetchFollowing]);

    const loadMore = () => {
        if (followingHasMore && !loading && currentUserId) {
            fetchMoreFollowing();
        }
    };

    return {
        following,
        followingSearchQuery,
        setFollowingSearchQuery,
        loadMore,
        loading,
        error
    };
};
