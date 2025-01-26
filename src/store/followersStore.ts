import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where
} from 'firebase/firestore';
import debounce from 'lodash/debounce';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { db } from '@root/firebase/firebaseConfig';
import { useUsersStore } from '@root/store/usersStore';
import { UserProfile } from '@root/types';

interface FollowersState {
    loading: boolean;
    error: string | null;
    currentUserId: string | null;
    followers: UserProfile[];
    searchQuery: string;
    lastVisible: any;
    hasMore: boolean;
    isInitialized: boolean;
    bufferedIds: string[];
    currentQueryId: number | null;
    searchLastBatchIndex: number;

    debouncedFetch: () => void;
    setSearchQuery: (query: string) => void;
    fetchFollowers: (reset?: boolean) => Promise<void>;
    fetchMoreFollowers: () => Promise<void>;
    setCurrentUserId: (userId: string) => void;
}

export const useFollowersStore = create<FollowersState>()(
    persist(
        (set, get) => ({
            loading: false,
            error: null,
            currentUserId: null,
            followers: [],
            searchQuery: '',
            lastVisible: null,
            hasMore: true,
            isInitialized: false,
            bufferedIds: [],
            currentQueryId: null,
            searchLastBatchIndex: 0,

            debouncedFetch: debounce(() => {
                const { fetchFollowers, currentUserId } = get();
                if (!currentUserId) return;
                fetchFollowers(true);
            }, 300),

            setSearchQuery: (query: string) => {
                const currentQuery = get().searchQuery;

                if (currentQuery === query) return;

                set({
                    searchQuery: query,
                    searchLastBatchIndex: 0
                });

                if (query.trim() !== '') {
                    get().debouncedFetch();
                } else {
                    get().fetchFollowers(true);
                }
            },

            fetchFollowers: async (reset = false) => {
                const {
                    searchQuery,
                    followers,
                    lastVisible,
                    hasMore,
                    currentUserId,
                    searchLastBatchIndex
                } = get();
                const normalizedQuery = searchQuery.trim().toLowerCase();

                if ((!reset && !hasMore) || !currentUserId) {
                    return;
                }

                set({ loading: true, error: null });

                try {
                    let followsQuery;

                    if (normalizedQuery) {
                        // Серверный поиск по followerUsernameLower
                        followsQuery = query(
                            collection(db, 'follows'),
                            where('followingId', '==', currentUserId),
                            where(
                                'followerUsernameLower',
                                '>=',
                                normalizedQuery
                            ),
                            where(
                                'followerUsernameLower',
                                '<=',
                                normalizedQuery + '\uf8ff'
                            ),
                            orderBy('followerUsernameLower'),
                            limit(10)
                        );

                        if (!reset && lastVisible) {
                            followsQuery = query(
                                collection(db, 'follows'),
                                where('followingId', '==', currentUserId),
                                where(
                                    'followerUsernameLower',
                                    '>=',
                                    normalizedQuery
                                ),
                                where(
                                    'followerUsernameLower',
                                    '<=',
                                    normalizedQuery + '\uf8ff'
                                ),
                                orderBy('followerUsernameLower'),
                                startAfter(lastVisible),
                                limit(10)
                            );
                        }
                    } else {
                        // Без поиска, обычная пагинация
                        followsQuery = query(
                            collection(db, 'follows'),
                            where('followingId', '==', currentUserId),
                            orderBy('timestamp', 'desc'),
                            limit(10)
                        );

                        if (!reset && lastVisible) {
                            followsQuery = query(
                                collection(db, 'follows'),
                                where('followingId', '==', currentUserId),
                                orderBy('timestamp', 'desc'),
                                startAfter(lastVisible),
                                limit(10)
                            );
                        }
                    }

                    const followsSnapshot = await getDocs(followsQuery);
                    const newLastVisible =
                        followsSnapshot.docs[followsSnapshot.docs.length - 1];

                    const followerIds = followsSnapshot.docs.map(
                        (doc) => doc.data().followerId
                    );

                    if (followerIds.length === 0) {
                        set({
                            followers: reset ? [] : followers,
                            hasMore: false,
                            isInitialized: true,
                            searchLastBatchIndex: 0
                        });
                        return;
                    }

                    // Получаем профили пользователей на основе followerIds
                    const usersStore = useUsersStore.getState();
                    const usersPromises = followerIds.map((id) =>
                        usersStore.fetchUserById(id)
                    );
                    const fetchedUsers = await Promise.all(usersPromises);

                    set({
                        followers: reset
                            ? (fetchedUsers.filter(
                                  (user) => user !== null
                              ) as UserProfile[])
                            : [
                                  ...followers,
                                  ...(fetchedUsers.filter(
                                      (user) => user !== null
                                  ) as UserProfile[])
                              ],
                        lastVisible: newLastVisible || null,
                        hasMore: followsSnapshot.docs.length === 10,
                        isInitialized: true,
                        searchLastBatchIndex: reset
                            ? 0
                            : searchLastBatchIndex + 1
                    });
                } catch (error: any) {
                    console.error('Error fetching followers:', error.message);
                    set({ error: error.message });
                } finally {
                    set({ loading: false });
                }
            },

            fetchMoreFollowers: async () => {
                const {
                    hasMore,
                    followers,
                    lastVisible,
                    currentUserId,
                    searchQuery,
                    searchLastBatchIndex
                } = get();
                const normalizedQuery = searchQuery.trim().toLowerCase();

                if (!hasMore || !currentUserId) return;

                set({ loading: true, error: null });

                try {
                    let followsQuery;

                    if (normalizedQuery) {
                        // Продолжение серверного поиска по followerUsernameLower
                        followsQuery = query(
                            collection(db, 'follows'),
                            where('followingId', '==', currentUserId),
                            where(
                                'followerUsernameLower',
                                '>=',
                                normalizedQuery
                            ),
                            where(
                                'followerUsernameLower',
                                '<=',
                                normalizedQuery + '\uf8ff'
                            ),
                            orderBy('followerUsernameLower'),
                            startAfter(lastVisible),
                            limit(10)
                        );
                    } else {
                        // Продолжение обычной пагинации
                        followsQuery = query(
                            collection(db, 'follows'),
                            where('followingId', '==', currentUserId),
                            orderBy('timestamp', 'desc'),
                            startAfter(lastVisible),
                            limit(10)
                        );
                    }

                    const followsSnapshot = await getDocs(followsQuery);
                    const newLastVisible =
                        followsSnapshot.docs[followsSnapshot.docs.length - 1];

                    const followerIds = followsSnapshot.docs.map(
                        (doc) => doc.data().followerId
                    );

                    if (followerIds.length === 0) {
                        set({
                            hasMore: false,
                            isInitialized: true
                        });
                        return;
                    }

                    // Получаем профили пользователей на основе followerIds
                    const usersStore = useUsersStore.getState();
                    const usersPromises = followerIds.map((id) =>
                        usersStore.fetchUserById(id)
                    );
                    const fetchedUsers = await Promise.all(usersPromises);

                    set({
                        followers: [
                            ...followers,
                            ...(fetchedUsers.filter(
                                (user) => user !== null
                            ) as UserProfile[])
                        ],
                        lastVisible: newLastVisible || null,
                        hasMore: followsSnapshot.docs.length === 10,
                        isInitialized: true,
                        searchLastBatchIndex: searchLastBatchIndex + 1
                    });
                } catch (error: any) {
                    console.error(
                        'Error fetching more followers:',
                        error.message
                    );
                    set({ error: error.message });
                } finally {
                    set({ loading: false });
                }
            },

            setCurrentUserId: (userId: string) => {
                if (get().currentUserId !== userId) {
                    set({
                        currentUserId: userId,
                        bufferedIds: [],
                        currentQueryId: null,
                        followers: [],
                        lastVisible: null,
                        hasMore: true,
                        isInitialized: false,
                        searchLastBatchIndex: 0,
                        error: null
                    });
                }
            }
        }),
        {
            name: 'followers-storage',
            partialize: (state) => ({ followers: state.followers })
        }
    )
);
