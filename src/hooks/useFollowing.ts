import { useUsersStore } from '@root/store/usersStore';
import { useEffect } from 'react';

export const useFollowing = (userId: string) => {
    const {
        following,
        followingSearchQuery,
        setFollowingSearchQuery,
        fetchFollowing,
        fetchMoreFollowing,
        followingHasMore,
        loading,
        error
    } = useUsersStore();

    useEffect(() => {
        if (following.length === 0) {
            fetchFollowing(userId, true);
        }
    }, [fetchFollowing, userId, following.length]);

    const loadMore = () => {
        if (followingHasMore && !loading) {
            fetchMoreFollowing(userId);
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
