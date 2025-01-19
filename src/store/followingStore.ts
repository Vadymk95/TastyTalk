import {
    collection,
    doc,
    getDoc,
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

                if (
                    (!reset &&
                        normalizedQuery === '' &&
                        !hasMore &&
                        following.length > 0) ||
                    !currentUserId
                ) {
                    return;
                }

                set({ loading: true, error: null });

                try {
                    const userRef = doc(db, 'users', currentUserId);
                    const userDoc = await getDoc(userRef);

                    if (!userDoc.exists()) {
                        set({
                            error: 'User not found',
                            loading: false,
                            searchLastBatchIndex: 0
                        });
                        return;
                    }

                    const ids: string[] = userDoc.data()?.following || [];

                    if (ids.length === 0) {
                        set({
                            following: [],
                            hasMore: false,
                            isInitialized: true,
                            searchLastBatchIndex: 0
                        });
                        return;
                    }

                    const usersRefCollection = collection(db, 'users');

                    if (normalizedQuery) {
                        let matchingUsers: UserProfile[] = [];
                        const batchSize = 10;
                        const maxBatches = Math.ceil(ids.length / batchSize);
                        let currentBatchIndex = searchLastBatchIndex;

                        for (let i = currentBatchIndex; i < maxBatches; i++) {
                            const batchIds = ids.slice(
                                i * batchSize,
                                (i + 1) * batchSize
                            );
                            if (batchIds.length === 0) continue;

                            // Firestore 'in' запросы ограничены 10 ID
                            const q = query(
                                usersRefCollection,
                                where('id', 'in', batchIds),
                                where('verified', '==', true),
                                where('usernameLower', '>=', normalizedQuery),
                                where(
                                    'usernameLower',
                                    '<=',
                                    normalizedQuery + '\uf8ff'
                                ),
                                orderBy('usernameLower'),
                                limit(10 - matchingUsers.length) // Ограничиваем количество результатов
                            );

                            const snapshot = await getDocs(q);

                            const fetchedFollowing = snapshot.docs.map(
                                (doc) => ({
                                    id: doc.id,
                                    ...doc.data()
                                })
                            ) as UserProfile[];

                            // Фильтруем пользователей по `usernameLower`
                            const filteredUsers = fetchedFollowing.filter(
                                (user) =>
                                    user.usernameLower.includes(normalizedQuery)
                            );

                            matchingUsers.push(...filteredUsers);

                            // Обновляем индекс батча
                            currentBatchIndex = i + 1;

                            // Если достигли 10 совпадений, прекращаем поиск
                            if (matchingUsers.length >= 10) {
                                break;
                            }
                        }

                        // Обновляем состояние
                        set({
                            following: reset
                                ? matchingUsers.slice(0, 10)
                                : [...following, ...matchingUsers.slice(0, 10)],
                            hasMore:
                                matchingUsers.length >= 10 &&
                                currentBatchIndex < maxBatches,
                            searchLastBatchIndex: currentBatchIndex,
                            isInitialized: true
                        });
                    } else {
                        // **Режим пагинации: загрузка подписок порциями**

                        const startIndex = reset ? 0 : following.length;
                        const batchIds = ids.slice(startIndex, startIndex + 10);

                        if (batchIds.length === 0) {
                            set({
                                hasMore: false,
                                isInitialized: true
                            });
                            return;
                        }

                        const q = query(
                            usersRefCollection,
                            where('id', 'in', batchIds),
                            where('verified', '==', true),
                            orderBy('username'),
                            limit(10),
                            ...(reset || !lastVisible
                                ? []
                                : [startAfter(lastVisible)])
                        );

                        const snapshot = await getDocs(q);

                        const fetchedFollowing = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        })) as UserProfile[];

                        set({
                            following: reset
                                ? fetchedFollowing
                                : [...following, ...fetchedFollowing],
                            lastVisible:
                                snapshot.docs[snapshot.docs.length - 1] || null,
                            hasMore: fetchedFollowing.length === 10,
                            isInitialized: true
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
                    currentUserId,
                    searchQuery,
                    searchLastBatchIndex
                } = get();
                const normalizedQuery = searchQuery.trim().toLowerCase();

                if (!hasMore || !currentUserId) return;

                set({ loading: true, error: null });

                try {
                    const userRef = doc(db, 'users', currentUserId);
                    const userDoc = await getDoc(userRef);

                    if (!userDoc.exists()) {
                        set({ error: 'User not found', loading: false });
                        return;
                    }

                    const ids: string[] = userDoc.data()?.following || [];
                    const usersRefCollection = collection(db, 'users');

                    if (normalizedQuery) {
                        // **Кейс 1: Активный поисковый запрос**
                        let matchingUsers: UserProfile[] = [];
                        const batchSize = 10;
                        const maxBatches = Math.ceil(ids.length / batchSize);
                        let currentBatchIndex = searchLastBatchIndex;

                        for (let i = currentBatchIndex; i < maxBatches; i++) {
                            const batchIds = ids.slice(
                                i * batchSize,
                                (i + 1) * batchSize
                            );
                            if (batchIds.length === 0) continue;

                            // Firestore 'in' запросы ограничены 10 ID
                            const q = query(
                                usersRefCollection,
                                where('id', 'in', batchIds),
                                where('verified', '==', true),
                                where('usernameLower', '>=', normalizedQuery),
                                where(
                                    'usernameLower',
                                    '<=',
                                    normalizedQuery + '\uf8ff'
                                ),
                                orderBy('usernameLower'),
                                limit(10 - matchingUsers.length) // Ограничиваем количество результатов
                            );

                            const snapshot = await getDocs(q);

                            const fetchedFollowing = snapshot.docs.map(
                                (doc) => ({
                                    id: doc.id,
                                    ...doc.data()
                                })
                            ) as UserProfile[];

                            // Дополнительная фильтрация на клиенте
                            const filteredUsers = fetchedFollowing.filter(
                                (user) =>
                                    user.usernameLower.includes(normalizedQuery)
                            );

                            matchingUsers.push(...filteredUsers);

                            // Обновляем индекс батча
                            currentBatchIndex = i + 1;

                            // Если достигли 10 совпадений, прекращаем поиск
                            if (matchingUsers.length >= 10) {
                                break;
                            }
                        }

                        // Обновляем состояние
                        set({
                            following: [
                                ...following,
                                ...matchingUsers.slice(0, 10)
                            ],
                            hasMore:
                                matchingUsers.length >= 10 &&
                                currentBatchIndex < maxBatches,
                            searchLastBatchIndex: currentBatchIndex,
                            isInitialized: true
                        });
                    } else {
                        // **Кейс 2: Пустой поисковый запрос (исходная логика)**
                        const startIndex = following.length;
                        const nextBatchIds = ids.slice(
                            startIndex,
                            startIndex + 10
                        ); // Следующая порция ID

                        if (nextBatchIds.length === 0) {
                            set({ hasMore: false, loading: false });
                            return;
                        }

                        const usersRef = collection(db, 'users');
                        const filterQuery = query(
                            usersRef,
                            where('id', 'in', nextBatchIds),
                            where('verified', '==', true),
                            orderBy('usernameLower'), // Опционально, если необходимо
                            limit(10)
                        );

                        const snapshot = await getDocs(filterQuery);

                        const fetchedFollowing = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        })) as UserProfile[];

                        set({
                            following: [...following, ...fetchedFollowing],
                            hasMore: fetchedFollowing.length === 10
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
