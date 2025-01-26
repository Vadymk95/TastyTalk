import { useEffect } from 'react';

import { useFollowersStore } from '@root/store/followersStore';

export const useFollowers = (userId: string) => {
    const {
        followers,
        searchQuery,
        setSearchQuery,
        fetchFollowers,
        fetchMoreFollowers,
        hasMore,
        loading,
        error,
        setCurrentUserId,
        currentUserId
    } = useFollowersStore();

    useEffect(() => {
        if (userId) {
            setCurrentUserId(userId);
            fetchFollowers(true);
        }
    }, [setCurrentUserId, userId, fetchFollowers]);

    const loadMore = () => {
        if (hasMore && !loading && currentUserId) {
            fetchMoreFollowers();
        }
    };

    return {
        followers,
        searchQuery,
        setSearchQuery,
        loadMore,
        loading,
        error
    };
};
