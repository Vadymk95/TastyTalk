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
                            following: arrayUnion(targetUserId),
                            followingCount: increment(1)
                        }),
                        updateDoc(targetUserRef, {
                            followers: arrayUnion(userProfile.id),
                            followersCount: increment(1)
                        })
                    ]);

                    useAuthStore.setState({
                        userProfile: {
                            ...userProfile,
                            following: [
                                ...(userProfile.following || []),
                                targetUserId
                            ],
                            followingCount: userProfile.followingCount + 1
                        }
                    });

                    set((state) => ({
                        users: state.users.map((user) =>
                            user.id === targetUserId
                                ? {
                                      ...user,
                                      followers: [
                                          ...(user.followers || []),
                                          userProfile.id
                                      ],
                                      followersCount:
                                          (user.followersCount || 0) + 1
                                  }
                                : user
                        ),
                        viewedUser:
                            viewedUser && viewedUser.id === targetUserId
                                ? {
                                      ...viewedUser,
                                      followers: [
                                          ...(viewedUser.followers || []),
                                          userProfile.id
                                      ],
                                      followersCount:
                                          (viewedUser.followersCount || 0) + 1
                                  }
                                : viewedUser
                    }));
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
                            following: arrayRemove(targetUserId),
                            followingCount: increment(-1)
                        }),
                        updateDoc(targetUserRef, {
                            followers: arrayRemove(userProfile.id),
                            followersCount: increment(-1)
                        })
                    ]);

                    useAuthStore.setState({
                        userProfile: {
                            ...userProfile,
                            following: userProfile.following?.filter(
                                (id) => id !== targetUserId
                            ),
                            followingCount: Math.max(
                                0,
                                userProfile.followingCount - 1
                            )
                        }
                    });

                    set((state) => ({
                        users: state.users.map((user) =>
                            user.id === targetUserId
                                ? {
                                      ...user,
                                      followers: user.followers?.filter(
                                          (id) => id !== userProfile.id
                                      ),
                                      followersCount: Math.max(
                                          0,
                                          (user.followersCount || 1) - 1
                                      )
                                  }
                                : user
                        ),
                        viewedUser:
                            viewedUser && viewedUser.id === targetUserId
                                ? {
                                      ...viewedUser,
                                      followers: viewedUser.followers?.filter(
                                          (id) => id !== userProfile.id
                                      ),
                                      followersCount: Math.max(
                                          0,
                                          (viewedUser.followersCount || 1) - 1
                                      )
                                  }
                                : viewedUser
                    }));
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
            }
        }),
        {
            name: 'viewed-user-storage',
            partialize: (state) => ({ viewedUser: state.viewedUser })
        }
    )
);
