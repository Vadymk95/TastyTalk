import {
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    runTransaction,
    startAfter,
    Timestamp,
    where
} from 'firebase/firestore';
import debounce from 'lodash/debounce';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { db } from '@root/firebase/firebaseConfig';
import { chunkArray } from '@root/helpers/chunkArray';
import { useAuthStore } from '@root/store/authStore';
import { useUsersStore } from '@root/store/usersStore';
import { UserProfile } from '@root/types';

interface FollowingState {
    loading: boolean;
    error: string | null;
    currentUserId: string | null;
    following: UserProfile[];
    searchQuery: string;
    lastVisible: any;
    hasMore: boolean;
    isInitialized: boolean;
    bufferedIds: string[];
    currentQueryId: number | null;
    searchLastBatchIndex: number;
    loadingFollow: boolean;
    loadingUnfollow: boolean;

    debouncedFetch: () => void;
    setSearchQuery: (query: string) => void;
    fetchFollowing: (reset?: boolean) => Promise<void>;
    fetchMoreFollowing: () => Promise<void>;
    setCurrentUserId: (userId: string) => void;
    followUser: (targetUserId: string) => Promise<void>;
    unfollowUser: (targetUserId: string) => Promise<void>;
}

export const useFollowingStore = create<FollowingState>()(
    persist(
        (set, get) => ({
            loading: false,
            error: null,
            currentUserId: null,
            following: [],
            searchQuery: '',
            lastVisible: null,
            hasMore: true,
            isInitialized: false,
            bufferedIds: [],
            currentQueryId: null,
            searchLastBatchIndex: 0,
            loadingFollow: false,
            loadingUnfollow: false,

            debouncedFetch: debounce(() => {
                const { fetchFollowing, currentUserId } = get();
                if (!currentUserId) return;
                fetchFollowing(true);
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
                    get().fetchFollowing(true);
                }
            },

            fetchFollowing: async (reset = false) => {
                const {
                    searchQuery,
                    following,
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
                        where('followerId', '==', currentUserId),
                        orderBy('timestamp', 'desc'),
                        limit(10)
                    );

                    if (!reset && lastVisible) {
                        followsQuery = query(
                            collection(db, 'follows'),
                            where('followerId', '==', currentUserId),
                            orderBy('timestamp', 'desc'),
                            startAfter(lastVisible),
                            limit(10)
                        );
                    }

                    const followsSnapshot = await getDocs(followsQuery);
                    const newLastVisible =
                        followsSnapshot.docs[followsSnapshot.docs.length - 1];

                    const followIds = followsSnapshot.docs.map(
                        (doc) => doc.data().followingId
                    );

                    if (followIds.length === 0) {
                        set({
                            following: reset ? [] : following,
                            hasMore: false,
                            isInitialized: true,
                            searchLastBatchIndex: 0
                        });
                        return;
                    }

                    // Получаем профили пользователей на основе followIds
                    let fetchedUsers: UserProfile[] = [];

                    if (normalizedQuery) {
                        // Фильтрация по поисковому запросу
                        const batches = chunkArray(followIds, 10);
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
                            following: reset
                                ? fetchedUsers.slice(0, 10)
                                : [...following, ...fetchedUsers.slice(0, 10)],
                            lastVisible: newLastVisible || null,
                            hasMore:
                                followsSnapshot.docs.length === 10 &&
                                currentBatchIndex < batches.length,
                            isInitialized: true,
                            searchLastBatchIndex: currentBatchIndex
                        });
                    } else {
                        // Без поиска, просто получаем профили пользователей
                        const batches = chunkArray(followIds, 10);

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
                            following: reset
                                ? fetchedUsers.slice(0, 10)
                                : [...following, ...fetchedUsers.slice(0, 10)],
                            lastVisible: newLastVisible || null,
                            hasMore: followsSnapshot.docs.length === 10,
                            isInitialized: true,
                            searchLastBatchIndex: 0 // Не используется при отсутствии поиска
                        });
                    }
                } catch (error: any) {
                    console.error('Error fetching following:', error.message);
                    set({ error: error.message });
                } finally {
                    set({ loading: false });
                }
            },

            fetchMoreFollowing: async () => {
                const {
                    hasMore,
                    following,
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
                        where('followerId', '==', currentUserId),
                        orderBy('timestamp', 'desc'),
                        startAfter(lastVisible),
                        limit(10)
                    );

                    const followsSnapshot = await getDocs(followsQuery);
                    const newLastVisible =
                        followsSnapshot.docs[followsSnapshot.docs.length - 1];

                    const followIds = followsSnapshot.docs.map(
                        (doc) => doc.data().followingId
                    );

                    if (followIds.length === 0) {
                        set({
                            hasMore: false,
                            isInitialized: true
                        });
                        return;
                    }

                    let fetchedUsers: UserProfile[] = [];

                    if (normalizedQuery) {
                        // Фильтрация по поисковому запросу
                        const batches = chunkArray(followIds, 10);
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
                            following: [...following, ...fetchedUsers],
                            lastVisible: newLastVisible || null,
                            hasMore:
                                followsSnapshot.docs.length === 10 &&
                                currentBatchIndex < batches.length,
                            isInitialized: true,
                            searchLastBatchIndex: currentBatchIndex
                        });
                    } else {
                        // Без поиска, просто получаем профили пользователей
                        const batches = chunkArray(followIds, 10);

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
                            following: [...following, ...fetchedUsers],
                            lastVisible: newLastVisible || null,
                            hasMore: followsSnapshot.docs.length === 10,
                            isInitialized: true,
                            searchLastBatchIndex: 0 // Не используется при отсутствии поиска
                        });
                    }
                } catch (error: any) {
                    console.error(
                        'Error fetching more following:',
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
                        following: [],
                        lastVisible: null,
                        hasMore: true,
                        isInitialized: false,
                        searchLastBatchIndex: 0,
                        error: null
                    });
                }
            },

            followUser: async (targetUserId: string) => {
                const { userProfile } = useAuthStore.getState();
                const { incrementFollowingCount, incrementFollowersCount } =
                    useUsersStore.getState();

                if (!userProfile) return;

                set({ loadingFollow: true });

                try {
                    const followsCollection = collection(db, 'follows');
                    const currentUserId = userProfile.id;
                    const followDocId = `${currentUserId}_${targetUserId}`;
                    const followDocRef = doc(followsCollection, followDocId);

                    await runTransaction(db, async (transaction) => {
                        const followDoc = await transaction.get(followDocRef);
                        if (followDoc.exists()) {
                            throw new Error(
                                'You are already following this user.'
                            );
                        }

                        transaction.set(followDocRef, {
                            followerId: currentUserId,
                            followingId: targetUserId,
                            timestamp: Timestamp.now()
                        });
                    });

                    await Promise.all([
                        incrementFollowingCount(userProfile.id, targetUserId),
                        incrementFollowersCount(targetUserId, userProfile.id)
                    ]);
                } catch (error: any) {
                    console.error('Follow Error:', error.message);
                    set({ error: error.message });
                } finally {
                    set({ loadingFollow: false });
                }
            },

            unfollowUser: async (targetUserId: string) => {
                const { userProfile } = useAuthStore.getState();
                const { decrementFollowingCount, decrementFollowersCount } =
                    useUsersStore.getState();

                if (!userProfile) return;

                set({ loadingUnfollow: true });

                try {
                    const followsCollection = collection(db, 'follows');
                    const currentUserId = userProfile.id;
                    const followDocId = `${currentUserId}_${targetUserId}`;
                    const followDocRef = doc(followsCollection, followDocId);

                    await runTransaction(db, async (transaction) => {
                        const followDoc = await transaction.get(followDocRef);
                        if (!followDoc.exists()) {
                            throw new Error('You are not following this user.');
                        }

                        transaction.delete(followDocRef);
                    });

                    await Promise.all([
                        decrementFollowingCount(currentUserId, targetUserId),
                        decrementFollowersCount(targetUserId, currentUserId)
                    ]);
                } catch (error: any) {
                    console.error('Unfollow Error:', error.message);
                    set({ error: error.message });
                } finally {
                    set({ loadingUnfollow: false });
                }
            }
        }),
        {
            name: 'following-storage',
            partialize: (state) => ({ following: state.following })
        }
    )
);
