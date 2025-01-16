import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
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
    allSearchQuery: string;
    allLastVisible: any;
    allHasMore: boolean;
    isAllInitialized: boolean;

    followers: UserProfile[];
    followersSearchQuery: string;
    followersLastVisible: any;
    followersHasMore: boolean;
    isFollowersInitialized: boolean;
    bufferedFollowersIds: string[];
    currentFollowersQueryId: number | null;
    followersSearchLastBatchIndex: number;

    following: UserProfile[];
    followingSearchQuery: string;
    followingLastVisible: any;
    followingHasMore: boolean;
    isFollowingInitialized: boolean;
    bufferedFollowingIds: string[];
    currentFollowingQueryId: number | null;
    followingSearchLastBatchIndex: number;

    currentUserId: string | null;
    loadingFollowId: string | null;
    loadingUnfollowId: string | null;

    loadingFollow: boolean;
    loadingUnfollow: boolean;
    loading: boolean;
    error: string | null;

    debouncedFetchUsers: () => void;
    debouncedFetchFollowers: () => void;
    debouncedFetchFollowing: () => void;

    setAllSearchQuery: (query: string) => void;
    setFollowersSearchQuery: (query: string) => void;
    setFollowingSearchQuery: (query: string) => void;

    fetchUsers: (reset?: boolean) => Promise<void>;
    fetchMoreUsers: () => Promise<void>;

    fetchFollowing: (reset?: boolean) => Promise<void>;
    fetchMoreFollowing: () => Promise<void>;

    fetchFollowers: (reset?: boolean) => Promise<void>;
    fetchMoreFollowers: () => Promise<void>;

    followUser: (
        targetUserId: string,
        fromAnotherPage?: boolean
    ) => Promise<void>;
    unfollowUser: (
        targetUserId: string,
        fromAnotherPage?: boolean
    ) => Promise<void>;

    fetchUserByUsername: (username: string) => Promise<UserProfile | null>;
    setViewedUser: (user: UserProfile) => void;
    setCurrentUserId: (userId: string) => void;
}

export const useUsersStore = create<UsersState>()(
    persist(
        (set, get) => ({
            users: [],
            viewedUser: null,
            allSearchQuery: '',
            allLastVisible: null,
            allHasMore: true,
            isAllInitialized: false,

            followers: [],
            followersSearchQuery: '',
            followersLastVisible: null,
            followersHasMore: true,
            isFollowersInitialized: false,
            bufferedFollowersIds: [],
            currentFollowersQueryId: null,
            followersSearchLastBatchIndex: 0,

            following: [],
            followingSearchQuery: '',
            followingLastVisible: null,
            followingHasMore: true,
            isFollowingInitialized: false,
            bufferedFollowingIds: [],
            currentFollowingQueryId: null,
            followingSearchLastBatchIndex: 0,

            currentUserId: null,
            loadingFollowId: null,
            loadingUnfollowId: null,

            loadingFollow: false,
            loadingUnfollow: false,
            loading: false,
            error: null,

            debouncedFetchFollowers: debounce(() => {
                const { fetchFollowers, currentUserId } = get();
                if (!currentUserId) return;
                fetchFollowers(true);
            }, 300),

            debouncedFetchFollowing: debounce(() => {
                const { fetchFollowing, currentUserId } = get();
                if (!currentUserId) return;
                fetchFollowing(true);
            }, 300),

            debouncedFetchUsers: debounce(() => {
                const { fetchUsers } = get();
                fetchUsers(true);
            }, 300),

            setAllSearchQuery: (query: string) => {
                set({ allSearchQuery: query });

                if (get().isAllInitialized) {
                    get().debouncedFetchUsers();
                }
            },

            setFollowersSearchQuery: (query: string) => {
                const currentQuery = get().followersSearchQuery;

                if (currentQuery === query) return;

                set({
                    followersSearchQuery: query,
                    followersSearchLastBatchIndex: 0
                });

                if (query.trim() !== '') {
                    get().debouncedFetchFollowers();
                } else {
                    get().fetchFollowers(true);
                }
            },

            setFollowingSearchQuery: (query: string) => {
                const currentQuery = get().followingSearchQuery;

                if (currentQuery === query) return;

                set({
                    followingSearchQuery: query,
                    followingSearchLastBatchIndex: 0
                });

                if (query.trim() !== '') {
                    get().debouncedFetchFollowing();
                } else {
                    get().fetchFollowing(true);
                }
            },

            fetchUsers: async (reset = false) => {
                const { allSearchQuery, users, allLastVisible, allHasMore } =
                    get();

                if (
                    !reset &&
                    users.length > 0 &&
                    allSearchQuery.trim() === '' &&
                    !allHasMore
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
                            allLastVisible: null,
                            allHasMore: true,
                            isAllInitialized: false
                        });
                    }

                    if (allSearchQuery.trim()) {
                        const normalizedQuery = allSearchQuery
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
                            ...(reset || !allLastVisible
                                ? []
                                : [startAfter(allLastVisible)])
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
                        allLastVisible:
                            snapshot.docs[snapshot.docs.length - 1] || null,
                        allHasMore: fetchedUsers.length === 15,
                        isAllInitialized: true
                    });
                } catch (error: any) {
                    console.error('Error fetching users:', error.message);
                    set({ error: error.message });
                } finally {
                    set({ loading: false });
                }
            },

            fetchMoreUsers: async () => {
                const { allLastVisible, users, allHasMore } = get();

                if (!allHasMore) return;

                set({ loading: true, error: null });

                try {
                    const usersRef = collection(db, 'users');
                    const q = query(
                        usersRef,
                        where('verified', '==', true),
                        orderBy('username'),
                        startAfter(allLastVisible),
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
                        allLastVisible:
                            snapshot.docs[snapshot.docs.length - 1] || null,
                        allHasMore: fetchedUsers.length === 15
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

            followUser: async (
                targetUserId: string,
                fromAnotherPage: boolean = false
            ) => {
                const { userProfile } = useAuthStore.getState();
                if (!userProfile) return;

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
                        )
                    }));

                    if (fromAnotherPage) {
                        set({
                            isFollowingInitialized: false,
                            isFollowersInitialized: false
                        });
                    }
                } catch (error: any) {
                    console.error('Follow Error:', error.message);
                    set({ error: error.message });
                } finally {
                    set({ loadingFollowId: null });
                }
            },

            unfollowUser: async (
                targetUserId: string,
                fromAnotherPage: boolean = false
            ) => {
                const { userProfile } = useAuthStore.getState();
                if (!userProfile) return;

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
                        )
                    }));

                    if (fromAnotherPage) {
                        set({
                            isFollowingInitialized: false,
                            isFollowersInitialized: false
                        });
                    }
                } catch (error: any) {
                    console.error('Unfollow Error:', error.message);
                    set({ error: error.message });
                } finally {
                    set({ loadingUnfollowId: null });
                }
            },

            fetchFollowers: async (reset = false) => {
                const {
                    followersSearchQuery,
                    followers,
                    followersLastVisible,
                    followersHasMore,
                    currentUserId,
                    followersSearchLastBatchIndex
                } = get();
                const normalizedQuery = followersSearchQuery
                    .trim()
                    .toLowerCase();

                if (
                    (!reset &&
                        normalizedQuery === '' &&
                        !followersHasMore &&
                        followers.length > 0) ||
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
                            followersSearchLastBatchIndex: 0
                        });
                        return;
                    }

                    const ids: string[] = userDoc.data()?.followers || [];

                    if (ids.length === 0) {
                        set({
                            followers: [],
                            followersHasMore: false,
                            isFollowersInitialized: true,
                            followersSearchLastBatchIndex: 0
                        });
                        return;
                    }

                    const usersRefCollection = collection(db, 'users');

                    if (normalizedQuery) {
                        let matchingUsers: UserProfile[] = [];
                        const batchSize = 10;
                        const maxBatches = Math.ceil(ids.length / batchSize);
                        let currentBatchIndex = followersSearchLastBatchIndex;

                        for (let i = currentBatchIndex; i < maxBatches; i++) {
                            const batchIds = ids.slice(
                                i * batchSize,
                                (i + 1) * batchSize
                            );
                            if (batchIds.length === 0) continue;

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
                                limit(10 - matchingUsers.length)
                            );

                            const snapshot = await getDocs(q);

                            const fetchedFollowers = snapshot.docs.map(
                                (doc) => ({
                                    id: doc.id,
                                    ...doc.data()
                                })
                            ) as UserProfile[];

                            const filteredUsers = fetchedFollowers.filter(
                                (user) =>
                                    user.usernameLower.includes(normalizedQuery)
                            );

                            matchingUsers.push(...filteredUsers);

                            currentBatchIndex = i + 1;

                            if (matchingUsers.length >= 10) {
                                break;
                            }
                        }

                        set({
                            followers: reset
                                ? matchingUsers.slice(0, 10)
                                : [...followers, ...matchingUsers.slice(0, 10)],
                            followersHasMore:
                                matchingUsers.length >= 10 &&
                                currentBatchIndex < maxBatches,
                            followersSearchLastBatchIndex: currentBatchIndex,
                            isFollowersInitialized: true
                        });
                    } else {
                        const startIndex = reset ? 0 : followers.length;
                        const batchIds = ids.slice(startIndex, startIndex + 10);

                        if (batchIds.length === 0) {
                            set({
                                followersHasMore: false,
                                isFollowersInitialized: true
                            });
                            return;
                        }

                        const q = query(
                            usersRefCollection,
                            where('id', 'in', batchIds),
                            where('verified', '==', true),
                            orderBy('username'),
                            limit(10),
                            ...(reset || !followersLastVisible
                                ? []
                                : [startAfter(followersLastVisible)])
                        );

                        const snapshot = await getDocs(q);

                        const fetchedFollowers = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        })) as UserProfile[];

                        set({
                            followers: reset
                                ? fetchedFollowers
                                : [...followers, ...fetchedFollowers],
                            followersLastVisible:
                                snapshot.docs[snapshot.docs.length - 1] || null,
                            followersHasMore: fetchedFollowers.length === 10,
                            isFollowersInitialized: true
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
                const { followersHasMore, followers, currentUserId } = get();

                if (!followersHasMore || !currentUserId) return;

                set({ loading: true, error: null });

                try {
                    const userRef = doc(db, 'users', currentUserId);
                    const userDoc = await getDoc(userRef);

                    if (!userDoc.exists()) {
                        set({ error: 'User not found', loading: false });
                        return;
                    }

                    const ids: string[] = userDoc.data()?.followers || [];
                    const currentCount = followers.length;
                    const nextBatchIds = ids.slice(
                        currentCount,
                        currentCount + 10
                    ); // Следующая порция ID

                    if (nextBatchIds.length === 0) {
                        set({ followersHasMore: false, loading: false });
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

                    const fetchedFollowers = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    })) as UserProfile[];

                    set({
                        followers: [...followers, ...fetchedFollowers],
                        followersHasMore: fetchedFollowers.length === 10
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

            fetchFollowing: async (reset = false) => {
                const {
                    followingSearchQuery,
                    following,
                    followingLastVisible,
                    followingHasMore,
                    currentUserId,
                    followingSearchLastBatchIndex
                } = get();
                const normalizedQuery = followingSearchQuery
                    .trim()
                    .toLowerCase();

                if (
                    (!reset &&
                        normalizedQuery === '' &&
                        !followingHasMore &&
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
                            followingSearchLastBatchIndex: 0
                        });
                        return;
                    }

                    const ids: string[] = userDoc.data()?.following || [];

                    if (ids.length === 0) {
                        set({
                            following: [],
                            followingHasMore: false,
                            isFollowingInitialized: true,
                            followingSearchLastBatchIndex: 0
                        });
                        return;
                    }

                    const usersRefCollection = collection(db, 'users');

                    if (normalizedQuery) {
                        let matchingUsers: UserProfile[] = [];
                        const batchSize = 10;
                        const maxBatches = Math.ceil(ids.length / batchSize);
                        let currentBatchIndex = followingSearchLastBatchIndex;

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
                            followingHasMore:
                                matchingUsers.length >= 10 &&
                                currentBatchIndex < maxBatches,
                            followingSearchLastBatchIndex: currentBatchIndex,
                            isFollowingInitialized: true
                        });
                    } else {
                        // **Режим пагинации: загрузка подписок порциями**

                        const startIndex = reset ? 0 : following.length;
                        const batchIds = ids.slice(startIndex, startIndex + 10);

                        if (batchIds.length === 0) {
                            set({
                                followingHasMore: false,
                                isFollowingInitialized: true
                            });
                            return;
                        }

                        const q = query(
                            usersRefCollection,
                            where('id', 'in', batchIds),
                            where('verified', '==', true),
                            orderBy('username'),
                            limit(10),
                            ...(reset || !followingLastVisible
                                ? []
                                : [startAfter(followingLastVisible)])
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
                            followingLastVisible:
                                snapshot.docs[snapshot.docs.length - 1] || null,
                            followingHasMore: fetchedFollowing.length === 10,
                            isFollowingInitialized: true
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
                    followingHasMore,
                    following,
                    currentUserId,
                    followingSearchQuery,
                    followingSearchLastBatchIndex
                } = get();
                const normalizedQuery = followingSearchQuery
                    .trim()
                    .toLowerCase();

                if (!followingHasMore || !currentUserId) return;

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
                        let currentBatchIndex = followingSearchLastBatchIndex;

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
                            followingHasMore:
                                matchingUsers.length >= 10 &&
                                currentBatchIndex < maxBatches,
                            followingSearchLastBatchIndex: currentBatchIndex,
                            isFollowingInitialized: true
                        });
                    } else {
                        // **Кейс 2: Пустой поисковый запрос (исходная логика)**
                        const startIndex = following.length;
                        const nextBatchIds = ids.slice(
                            startIndex,
                            startIndex + 10
                        ); // Следующая порция ID

                        if (nextBatchIds.length === 0) {
                            set({ followingHasMore: false, loading: false });
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
                            followingHasMore: fetchedFollowing.length === 10
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

            setViewedUser: (user: UserProfile) => {
                if (get().viewedUser?.id === user.id) return;

                set({ viewedUser: user });
            },

            setCurrentUserId: (userId: string) => {
                if (get().currentUserId !== userId) {
                    set({
                        currentUserId: userId,
                        bufferedFollowingIds: [],
                        currentFollowingQueryId: null,
                        following: [],
                        followingLastVisible: null,
                        followingHasMore: true,
                        isFollowingInitialized: false,
                        followingSearchLastBatchIndex: 0,
                        error: null
                    });
                }
            }
        }),
        {
            name: 'viewed-user-storage',
            partialize: (state) => ({ viewedUser: state.viewedUser })
        }
    )
);
