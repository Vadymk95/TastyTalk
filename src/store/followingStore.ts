import {
    collection,
    doc,
    getDocs,
    increment,
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
import { chunkArray } from '@root/helpers';
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
    followStatusCache: { [key: string]: boolean };

    debouncedFetch: () => void;
    setSearchQuery: (query: string) => void;
    fetchFollowing: (reset?: boolean) => Promise<void>;
    fetchMoreFollowing: () => Promise<void>;
    setCurrentUserId: (userId: string) => void;
    followUser: (targetUserId: string) => Promise<void>;
    unfollowUser: (targetUserId: string) => Promise<void>;
    getFollowStatuses: (
        userIds: string[]
    ) => Promise<{ [key: string]: boolean }>;
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
            followStatusCache: {},

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
                    let followsQuery;

                    if (normalizedQuery) {
                        // Серверный поиск по usernameLower
                        followsQuery = query(
                            collection(db, 'follows'),
                            where('followerId', '==', currentUserId),
                            where('usernameLower', '>=', normalizedQuery),
                            where(
                                'usernameLower',
                                '<=',
                                normalizedQuery + '\uf8ff'
                            ),
                            orderBy('usernameLower'),
                            limit(10)
                        );

                        if (!reset && lastVisible) {
                            followsQuery = query(
                                collection(db, 'follows'),
                                where('followerId', '==', currentUserId),
                                where('usernameLower', '>=', normalizedQuery),
                                where(
                                    'usernameLower',
                                    '<=',
                                    normalizedQuery + '\uf8ff'
                                ),
                                orderBy('usernameLower'),
                                startAfter(lastVisible),
                                limit(10)
                            );
                        }
                    } else {
                        // Без поиска, обычная пагинация
                        followsQuery = query(
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
                    const usersStore = useUsersStore.getState();
                    const usersPromises = followIds.map((id) =>
                        usersStore.fetchUserById(id)
                    );
                    const fetchedUsers = await Promise.all(usersPromises);

                    set({
                        following: reset
                            ? (fetchedUsers.filter(
                                  (user) => user !== null
                              ) as UserProfile[])
                            : [
                                  ...following,
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
                    let followsQuery;

                    if (normalizedQuery) {
                        // Продолжение серверного поиска по usernameLower
                        followsQuery = query(
                            collection(db, 'follows'),
                            where('followerId', '==', currentUserId),
                            where('usernameLower', '>=', normalizedQuery),
                            where(
                                'usernameLower',
                                '<=',
                                normalizedQuery + '\uf8ff'
                            ),
                            orderBy('usernameLower'),
                            startAfter(lastVisible),
                            limit(10)
                        );
                    } else {
                        // Продолжение обычной пагинации
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
                            hasMore: false,
                            isInitialized: true
                        });
                        return;
                    }

                    // Получаем профили пользователей на основе followIds
                    const usersStore = useUsersStore.getState();
                    const usersPromises = followIds.map((id) =>
                        usersStore.fetchUserById(id)
                    );
                    const fetchedUsers = await Promise.all(usersPromises);

                    set({
                        following: [
                            ...following,
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
                        followStatusCache: {},
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
                    const usersCollection = collection(db, 'users');
                    const currentUserId = userProfile.id;
                    const followDocId = `${currentUserId}_${targetUserId}`;
                    const followDocRef = doc(followsCollection, followDocId);
                    const targetUserRef = doc(usersCollection, targetUserId);

                    // Запуск транзакции Firestore
                    await runTransaction(db, async (transaction) => {
                        const followDoc = await transaction.get(followDocRef);
                        if (followDoc.exists()) {
                            throw new Error(
                                'You are already following this user.'
                            );
                        }

                        const targetUserDoc =
                            await transaction.get(targetUserRef);
                        if (!targetUserDoc.exists()) {
                            throw new Error('Target user does not exist.');
                        }

                        const targetUserData = targetUserDoc.data();
                        const usernameLower = targetUserData?.usernameLower;
                        const followerUsernameLower =
                            userProfile?.usernameLower;

                        if (!usernameLower) {
                            throw new Error(
                                'Target user does not have usernameLower.'
                            );
                        }

                        // Создаём документ follow с добавленным полем usernameLower
                        transaction.set(followDocRef, {
                            followerId: currentUserId,
                            followingId: targetUserId,
                            timestamp: Timestamp.now(),
                            usernameLower: usernameLower,
                            followerUsernameLower: followerUsernameLower
                        });

                        const currentUserRef = doc(db, 'users', currentUserId);
                        transaction.update(currentUserRef, {
                            followingCount: increment(1)
                        });

                        transaction.update(targetUserRef, {
                            followersCount: increment(1)
                        });
                    });

                    // Обновление счётчиков в состоянии пользователей
                    await Promise.all([
                        incrementFollowingCount(currentUserId),
                        incrementFollowersCount(targetUserId)
                    ]);

                    // Обновление кэша статусов подписки
                    set((state) => ({
                        followStatusCache: {
                            ...state.followStatusCache,
                            [targetUserId]: true
                        }
                    }));
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

                    // Запуск транзакции Firestore
                    await runTransaction(db, async (transaction) => {
                        const followDoc = await transaction.get(followDocRef);
                        if (!followDoc.exists()) {
                            throw new Error('You are not following this user.');
                        }

                        // Удаление документа followDoc
                        transaction.delete(followDocRef);

                        // Обновление счётчика и массива following для текущего пользователя
                        const currentUserRef = doc(db, 'users', currentUserId);
                        transaction.update(currentUserRef, {
                            followingCount: increment(-1)
                        });

                        // Обновление счётчика и массива followers для целевого пользователя
                        const targetUserRef = doc(db, 'users', targetUserId);
                        transaction.update(targetUserRef, {
                            followersCount: increment(-1)
                        });
                    });

                    // Обновление счётчиков в состоянии пользователей
                    await Promise.all([
                        decrementFollowingCount(currentUserId),
                        decrementFollowersCount(targetUserId)
                    ]);

                    // Обновление кэша статусов подписки
                    set((state) => ({
                        followStatusCache: {
                            ...state.followStatusCache,
                            [targetUserId]: false
                        }
                    }));
                } catch (error: any) {
                    console.error('Unfollow Error:', error.message);
                    set({ error: error.message });
                } finally {
                    set({ loadingUnfollow: false });
                }
            },

            getFollowStatuses: async (userIds: string[]) => {
                const { currentUserId, followStatusCache } = get();
                if (!currentUserId) return {};

                // Фильтруем userIds, которые уже есть в кэше
                const idsToCheck = userIds.filter(
                    (id) => !(id in followStatusCache)
                );
                if (idsToCheck.length === 0) {
                    // Все статусы уже есть в кэше
                    const statuses: { [key: string]: boolean } = {};
                    userIds.forEach((id) => {
                        statuses[id] = followStatusCache[id];
                    });
                    return statuses;
                }

                // Разбиваем на батчи по 10 элементов
                const batches = chunkArray(idsToCheck, 10);

                const statuses: { [key: string]: boolean } = {};

                for (const batch of batches) {
                    const followsQuery = query(
                        collection(db, 'follows'),
                        where('followerId', '==', currentUserId),
                        where('followingId', 'in', batch)
                    );

                    const followsSnapshot = await getDocs(followsQuery);

                    // Обновляем кэш и результат
                    followsSnapshot.forEach((doc) => {
                        const data = doc.data();
                        statuses[data.followingId] = true;
                        // Обновляем кэш
                        set((state) => ({
                            followStatusCache: {
                                ...state.followStatusCache,
                                [data.followingId]: true
                            }
                        }));
                    });

                    // Для тех, кто не найден в результате, устанавливаем false
                    batch.forEach((id) => {
                        if (!(id in statuses)) {
                            statuses[id] = false;
                            // Обновляем кэш
                            set((state) => ({
                                followStatusCache: {
                                    ...state.followStatusCache,
                                    [id]: false
                                }
                            }));
                        }
                    });
                }

                // Для всех userIds, включая те, что уже были в кэше
                const finalStatuses: { [key: string]: boolean } = {};
                userIds.forEach((id) => {
                    finalStatuses[id] =
                        id in statuses ? statuses[id] : followStatusCache[id];
                });

                return finalStatuses;
            }
        }),
        {
            name: 'following-storage',
            partialize: (state) => ({
                following: state.following,
                followStatusCache: state.followStatusCache
            })
        }
    )
);
