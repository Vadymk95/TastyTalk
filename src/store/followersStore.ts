import {
    collection,
    doc,
    getDoc,
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

                if (
                    (!reset &&
                        normalizedQuery === '' &&
                        !hasMore &&
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
                            searchLastBatchIndex: 0
                        });
                        return;
                    }

                    const ids: string[] = userDoc.data()?.followers || [];

                    if (ids.length === 0) {
                        set({
                            followers: [],
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
                            hasMore:
                                matchingUsers.length >= 10 &&
                                currentBatchIndex < maxBatches,
                            searchLastBatchIndex: currentBatchIndex,
                            isInitialized: true
                        });
                    } else {
                        const startIndex = reset ? 0 : followers.length;
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

                        const fetchedFollowers = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        })) as UserProfile[];

                        set({
                            followers: reset
                                ? fetchedFollowers
                                : [...followers, ...fetchedFollowers],
                            lastVisible:
                                snapshot.docs[snapshot.docs.length - 1] || null,
                            hasMore: fetchedFollowers.length === 10,
                            isInitialized: true
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
                const { hasMore, followers, currentUserId } = get();

                if (!hasMore || !currentUserId) return;

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

                    const fetchedFollowers = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    })) as UserProfile[];

                    set({
                        followers: [...followers, ...fetchedFollowers],
                        hasMore: fetchedFollowers.length === 10
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
