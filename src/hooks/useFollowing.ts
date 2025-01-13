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
        fetchMoreFollowing,
        isFollowingInitialized
    } = useUsersStore();

    useEffect(() => {
        if (userId) {
            setCurrentUserId(userId);

            if (!isFollowingInitialized) {
                fetchFollowing(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCurrentUserId, userId, isFollowingInitialized]);

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
