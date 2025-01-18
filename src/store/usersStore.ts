import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDocs,
    increment,
    limit,
    orderBy,
    query,
    startAfter,
    updateDoc,
    where
} from 'firebase/firestore';
import debounce from 'lodash/debounce';
import { create } from 'zustand';

import { db } from '@root/firebase/firebaseConfig';
import { useAuthStore } from '@root/store/authStore';
import { UserProfile } from '@root/types';
import { persist } from 'zustand/middleware';

interface UsersState {
    users: UserProfile[];
    viewedUser: UserProfile | null;
    searchQuery: string;
    lastVisible: any;
    hasMore: boolean;
    isInitialized: boolean;

    loadingFollowId: string | null;
    loadingUnfollowId: string | null;

    loadingFollow: boolean;
    loadingUnfollow: boolean;
    loading: boolean;
    error: string | null;

    debouncedFetch: () => void;
    setSearchQuery: (query: string) => void;

    fetchUsers: (reset?: boolean) => Promise<void>;
    fetchMoreUsers: () => Promise<void>;

    followUser: (targetUserId: string) => Promise<void>;
    unfollowUser: (targetUserId: string) => Promise<void>;

    fetchUserByUsername: (username: string) => Promise<UserProfile | null>;
    setViewedUser: (user: UserProfile) => void;

    incrementFollowersCount: (
        userId: string,
        followingId: string
    ) => Promise<void>;
    decrementFollowersCount: (
        userId: string,
        followingId: string
    ) => Promise<void>;
    incrementFollowingCount: (
        userId: string,
        followingId: string
    ) => Promise<void>;
    decrementFollowingCount: (
        userId: string,
        followingId: string
    ) => Promise<void>;
}

export const useUsersStore = create<UsersState>()(
    persist(
        (set, get) => ({
            users: [],
            viewedUser: null,
            searchQuery: '',
            lastVisible: null,
            hasMore: true,
            isInitialized: false,

            loadingFollowId: null,
            loadingUnfollowId: null,

            loadingFollow: false,
            loadingUnfollow: false,
            loading: false,
            error: null,

            debouncedFetch: debounce(() => {
                const { fetchUsers } = get();
                fetchUsers(true);
            }, 300),

            setSearchQuery: (query: string) => {
                set({ searchQuery: query });

                if (get().isInitialized) {
                    get().debouncedFetch();
                }
            },

            fetchUsers: async (reset = false) => {
                const { searchQuery, users, lastVisible, hasMore } = get();

                if (
                    !reset &&
                    users.length > 0 &&
                    searchQuery.trim() === '' &&
                    !hasMore
                ) {
                    return;
                }

                set({ loading: true, error: null });

                try {
                    const usersRef = collection(db, 'users');
                    let q;

                    if (reset) {
                        set({
                            users: [],
                            lastVisible: null,
                            hasMore: true,
                            isInitialized: false
                        });
                    }

                    if (searchQuery.trim()) {
                        const normalizedQuery = searchQuery
                            .trim()
                            .toLowerCase();

                        q = query(
                            usersRef,
                            where('verified', '==', true),
                            where('usernameLower', '>=', normalizedQuery),
                            where(
                                'usernameLower',
                                '<=',
                                normalizedQuery + '\uf8ff'
                            ),
                            orderBy('usernameLower'),
                            orderBy('username'),
                            limit(15)
                        );
                    } else {
                        q = query(
                            usersRef,
                            where('verified', '==', true),
                            orderBy('username'),
                            limit(15),
                            ...(reset || !lastVisible
                                ? []
                                : [startAfter(lastVisible)])
                        );
                    }

                    const snapshot = await getDocs(q);

                    const fetchedUsers: UserProfile[] = snapshot.docs.map(
                        (doc) => ({
                            id: doc.id,
                            ...doc.data()
                        })
                    ) as UserProfile[];

                    set({
                        users: reset
                            ? fetchedUsers
                            : [...users, ...fetchedUsers],
                        lastVisible:
                            snapshot.docs[snapshot.docs.length - 1] || null,
                        hasMore: fetchedUsers.length === 15,
                        isInitialized: true
                    });
                } catch (error: any) {
                    console.error('Error fetching users:', error.message);
                    set({ error: error.message });
                } finally {
                    set({ loading: false });
                }
            },

            fetchMoreUsers: async () => {
                const { lastVisible, users, hasMore } = get();

                if (!hasMore) return;

                set({ loading: true, error: null });

                try {
                    const usersRef = collection(db, 'users');
                    const q = query(
                        usersRef,
                        where('verified', '==', true),
                        orderBy('username'),
                        startAfter(lastVisible),
                        limit(15)
                    );

                    const snapshot = await getDocs(q);

                    const fetchedUsers: UserProfile[] = snapshot.docs.map(
                        (doc) => ({
                            id: doc.id,
                            ...doc.data()
                        })
                    ) as UserProfile[];

                    set({
                        users: [...users, ...fetchedUsers],
                        lastVisible:
                            snapshot.docs[snapshot.docs.length - 1] || null,
                        hasMore: fetchedUsers.length === 15
                    });
                } catch (error: any) {
                    console.error('Error fetching more users:', error.message);
                    set({ error: error.message });
                } finally {
                    set({ loading: false });
                }
            },

            fetchUserByUsername: async (username: string) => {
                set({ loading: true, error: null });

                try {
                    const usersRef = collection(db, 'users');
                    const normalizedUsername = username.trim().toLowerCase();

                    const q = query(
                        usersRef,
                        where('verified', '==', true),
                        where('usernameLower', '==', normalizedUsername),
                        limit(1)
                    );

                    const snapshot = await getDocs(q);

                    if (!snapshot.empty) {
                        const user = snapshot.docs[0].data() as UserProfile;
                        set({ viewedUser: user, error: null });
                        return user;
                    } else {
                        set({ error: 'User not found', viewedUser: null });
                        return null;
                    }
                } catch (error: any) {
                    console.error(
                        'Error fetching user by username:',
                        error.message
                    );
                    set({ error: error.message, viewedUser: null });
                    return null;
                } finally {
                    set({ loading: false });
                }
            },

            followUser: async (targetUserId: string) => {
                const { userProfile } = useAuthStore.getState();
                const { viewedUser } = get();
                if (!userProfile || !viewedUser) return;

                set({ loadingFollowId: targetUserId });

                try {
                    const currentUserRef = doc(db, 'users', userProfile.id);
                    const targetUserRef = doc(db, 'users', targetUserId);

                    await Promise.all([
                        updateDoc(currentUserRef, {
                            following: arrayUnion(targetUserId)
                        }),
                        updateDoc(targetUserRef, {
                            followers: arrayUnion(userProfile.id)
                        })
                    ]);

                    await Promise.all([
                        get().incrementFollowingCount(
                            userProfile.id,
                            targetUserId
                        ),
                        get().incrementFollowersCount(
                            targetUserId,
                            userProfile.id
                        )
                    ]);
                } catch (error: any) {
                    console.error('Follow Error:', error.message);
                    set({ error: error.message });
                } finally {
                    set({ loadingFollowId: null });
                }
            },

            unfollowUser: async (targetUserId: string) => {
                const { userProfile } = useAuthStore.getState();
                const { viewedUser } = get();
                if (!userProfile || !viewedUser) return;

                set({ loadingUnfollowId: targetUserId });

                try {
                    const currentUserRef = doc(db, 'users', userProfile.id);
                    const targetUserRef = doc(db, 'users', targetUserId);

                    await Promise.all([
                        updateDoc(currentUserRef, {
                            following: arrayRemove(targetUserId)
                        }),
                        updateDoc(targetUserRef, {
                            followers: arrayRemove(userProfile.id)
                        })
                    ]);

                    await Promise.all([
                        get().decrementFollowingCount(
                            userProfile.id,
                            targetUserId
                        ),
                        get().decrementFollowersCount(
                            targetUserId,
                            userProfile.id
                        )
                    ]);
                } catch (error: any) {
                    console.error('Unfollow Error:', error.message);
                    set({ error: error.message });
                } finally {
                    set({ loadingUnfollowId: null });
                }
            },

            setViewedUser: (user: UserProfile) => {
                if (get().viewedUser?.id === user.id) return;

                set({ viewedUser: user });
            },

            incrementFollowersCount: async (
                userId: string,
                followerId: string
            ) => {
                try {
                    const userRef = doc(db, 'users', userId);
                    await updateDoc(userRef, {
                        followersCount: increment(1),
                        followers: arrayUnion(followerId)
                    });
                    set((state) => ({
                        users: state.users.map((user) =>
                            user.id === userId
                                ? {
                                      ...user,
                                      followersCount: user.followersCount + 1,
                                      followers: [
                                          ...(user.followers || []),
                                          followerId
                                      ]
                                  }
                                : user
                        )
                    }));

                    const { userProfile } = useAuthStore.getState();
                    if (userProfile && userProfile.id === userId) {
                        useAuthStore.setState({
                            userProfile: {
                                ...userProfile,
                                followersCount: userProfile.followersCount + 1,
                                followers: [
                                    ...(userProfile.followers || []),
                                    followerId
                                ]
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error incrementing followers count:', error);
                }
            },

            decrementFollowersCount: async (
                userId: string,
                followerId: string
            ) => {
                try {
                    const userRef = doc(db, 'users', userId);
                    await updateDoc(userRef, {
                        followersCount: increment(-1),
                        followers: arrayRemove(followerId)
                    });
                    set((state) => ({
                        users: state.users.map((user) =>
                            user.id === userId
                                ? {
                                      ...user,
                                      followersCount: Math.max(
                                          user.followersCount - 1,
                                          0
                                      ),
                                      followers: user.followers?.filter(
                                          (id) => id !== followerId
                                      )
                                  }
                                : user
                        )
                    }));

                    const { userProfile } = useAuthStore.getState();
                    if (userProfile && userProfile.id === userId) {
                        useAuthStore.setState({
                            userProfile: {
                                ...userProfile,
                                followersCount: Math.max(
                                    userProfile.followersCount - 1,
                                    0
                                ),
                                followers: userProfile.followers?.filter(
                                    (id) => id !== followerId
                                )
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error decrementing followers count:', error);
                }
            },

            incrementFollowingCount: async (
                userId: string,
                followingId: string
            ) => {
                try {
                    const userRef = doc(db, 'users', userId);
                    await updateDoc(userRef, {
                        followingCount: increment(1),
                        following: arrayUnion(followingId)
                    });
                    set((state) => ({
                        users: state.users.map((user) =>
                            user.id === userId
                                ? {
                                      ...user,
                                      followingCount: user.followingCount + 1,
                                      following: [
                                          ...(user.following || []),
                                          followingId
                                      ]
                                  }
                                : user
                        )
                    }));

                    const { userProfile } = useAuthStore.getState();
                    if (userProfile && userProfile.id === userId) {
                        useAuthStore.setState({
                            userProfile: {
                                ...userProfile,
                                followingCount: userProfile.followingCount + 1,
                                following: [
                                    ...(userProfile.following || []),
                                    followingId
                                ]
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error incrementing following count:', error);
                }
            },

            decrementFollowingCount: async (
                userId: string,
                followingId: string
            ) => {
                try {
                    const userRef = doc(db, 'users', userId);
                    await updateDoc(userRef, {
                        followingCount: increment(-1),
                        following: arrayRemove(followingId)
                    });
                    set((state) => ({
                        users: state.users.map((user) =>
                            user.id === userId
                                ? {
                                      ...user,
                                      followingCount: Math.max(
                                          user.followingCount - 1,
                                          0
                                      ),
                                      following: user.following?.filter(
                                          (id) => id !== followingId
                                      )
                                  }
                                : user
                        )
                    }));

                    const { userProfile } = useAuthStore.getState();
                    if (userProfile && userProfile.id === userId) {
                        useAuthStore.setState({
                            userProfile: {
                                ...userProfile,
                                followingCount: Math.max(
                                    userProfile.followingCount - 1,
                                    0
                                ),
                                following: userProfile.following?.filter(
                                    (id) => id !== followingId
                                )
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error decrementing following count:', error);
                }
            }
        }),
        {
            name: 'viewed-user-storage',
            partialize: (state) => ({ viewedUser: state.viewedUser })
        }
    )
);
