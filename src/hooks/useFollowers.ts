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
        error
    } = useUsersStore();

    useEffect(() => {
        if (followers.length === 0) {
            fetchFollowers(userId, true);
        }
    }, [fetchFollowers, userId, followers.length]);

    const loadMore = () => {
        if (followersHasMore && !loading) {
            fetchMoreFollowers(userId);
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
