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
import { chunkArray } from '@root/helpers/chunkArray';
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
                    // Формируем запрос к коллекции 'follows'
                    let followsQuery = query(
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
                    let fetchedUsers: UserProfile[] = [];

                    if (normalizedQuery) {
                        // Фильтрация по поисковому запросу
                        const batches = chunkArray(followerIds, 10);
                        let currentBatchIndex = searchLastBatchIndex;

                        for (
                            let i = currentBatchIndex;
                            i < batches.length;
                            i++
                        ) {
                            const batch = batches[i];
                            const usersQuery = query(
                                collection(db, 'users'),
                                where('id', 'in', batch),
                                where('verified', '==', true),
                                where('usernameLower', '>=', normalizedQuery),
                                where(
                                    'usernameLower',
                                    '<=',
                                    normalizedQuery + '\uf8ff'
                                ),
                                orderBy('usernameLower'),
                                limit(10 - fetchedUsers.length)
                            );

                            const usersSnapshot = await getDocs(usersQuery);
                            const users = usersSnapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data()
                            })) as UserProfile[];

                            // Фильтрация на клиенте, если необходимо
                            const filteredUsers = users.filter((user) =>
                                user.usernameLower.includes(normalizedQuery)
                            );

                            fetchedUsers.push(...filteredUsers);

                            currentBatchIndex = i + 1;

                            if (fetchedUsers.length >= 10) break;
                        }

                        set({
                            followers: reset
                                ? fetchedUsers.slice(0, 10)
                                : [...followers, ...fetchedUsers.slice(0, 10)],
                            lastVisible: newLastVisible || null,
                            hasMore:
                                followsSnapshot.docs.length === 10 &&
                                currentBatchIndex < batches.length,
                            isInitialized: true,
                            searchLastBatchIndex: currentBatchIndex
                        });
                    } else {
                        // Без поиска, просто получаем профили пользователей
                        const batches = chunkArray(followerIds, 10);

                        for (const batch of batches) {
                            const usersQuery = query(
                                collection(db, 'users'),
                                where('id', 'in', batch),
                                where('verified', '==', true),
                                orderBy('usernameLower'), // Если нужно
                                limit(10)
                            );

                            const usersSnapshot = await getDocs(usersQuery);
                            const users = usersSnapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data()
                            })) as UserProfile[];

                            fetchedUsers.push(...users);
                        }

                        set({
                            followers: reset
                                ? fetchedUsers.slice(0, 10)
                                : [...followers, ...fetchedUsers.slice(0, 10)],
                            lastVisible: newLastVisible || null,
                            hasMore: followsSnapshot.docs.length === 10,
                            isInitialized: true,
                            searchLastBatchIndex: 0 // Не используется при отсутствии поиска
                        });
                    }
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
                    // Формируем запрос к коллекции 'follows' для следующих документов
                    let followsQuery = query(
                        collection(db, 'follows'),
                        where('followingId', '==', currentUserId),
                        orderBy('timestamp', 'desc'),
                        startAfter(lastVisible),
                        limit(10)
                    );

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

                    let fetchedUsers: UserProfile[] = [];

                    if (normalizedQuery) {
                        // Фильтрация по поисковому запросу
                        const batches = chunkArray(followerIds, 10);
                        let currentBatchIndex = searchLastBatchIndex;

                        for (
                            let i = currentBatchIndex;
                            i < batches.length;
                            i++
                        ) {
                            const batch = batches[i];
                            const usersQuery = query(
                                collection(db, 'users'),
                                where('id', 'in', batch),
                                where('verified', '==', true),
                                where('usernameLower', '>=', normalizedQuery),
                                where(
                                    'usernameLower',
                                    '<=',
                                    normalizedQuery + '\uf8ff'
                                ),
                                orderBy('usernameLower'),
                                limit(10 - fetchedUsers.length)
                            );

                            const usersSnapshot = await getDocs(usersQuery);
                            const users = usersSnapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data()
                            })) as UserProfile[];

                            // Фильтрация на клиенте, если необходимо
                            const filteredUsers = users.filter((user) =>
                                user.usernameLower.includes(normalizedQuery)
                            );

                            fetchedUsers.push(...filteredUsers);

                            currentBatchIndex = i + 1;

                            if (fetchedUsers.length >= 10) break;
                        }

                        set({
                            followers: [...followers, ...fetchedUsers],
                            lastVisible: newLastVisible || null,
                            hasMore:
                                followsSnapshot.docs.length === 10 &&
                                currentBatchIndex < batches.length,
                            isInitialized: true,
                            searchLastBatchIndex: currentBatchIndex
                        });
                    } else {
                        // Без поиска, просто получаем профили пользователей
                        const batches = chunkArray(followerIds, 10);

                        for (const batch of batches) {
                            const usersQuery = query(
                                collection(db, 'users'),
                                where('id', 'in', batch),
                                where('verified', '==', true),
                                orderBy('usernameLower'), // Если нужно
                                limit(10)
                            );

                            const usersSnapshot = await getDocs(usersQuery);
                            const users = usersSnapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data()
                            })) as UserProfile[];

                            fetchedUsers.push(...users);
                        }

                        set({
                            followers: [...followers, ...fetchedUsers],
                            lastVisible: newLastVisible || null,
                            hasMore: followsSnapshot.docs.length === 10,
                            isInitialized: true,
                            searchLastBatchIndex: 0 // Не используется при отсутствии поиска
                        });
                    }
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
