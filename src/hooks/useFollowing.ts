import { useEffect } from 'react';

import { useFollowingStore } from '@root/store/followingStore';

export const useFollowing = (userId: string) => {
    const {
        following,
        searchQuery,
        setSearchQuery,
        fetchFollowing,
        hasMore,
        loading,
        error,
        setCurrentUserId,
        currentUserId,
        fetchMoreFollowing
    } = useFollowingStore();

    useEffect(() => {
        if (userId) {
            setCurrentUserId(userId);
            fetchFollowing(true);
        }
    }, [setCurrentUserId, userId, fetchFollowing]);

    const loadMore = () => {
        if (hasMore && !loading && currentUserId) {
            fetchMoreFollowing();
        }
    };

    return {
        following,
        searchQuery,
        setSearchQuery,
        loadMore,
        loading,
        error
    };
};
