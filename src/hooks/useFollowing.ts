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

            if (following.length === 0) {
                fetchFollowing(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCurrentUserId, userId]);

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
