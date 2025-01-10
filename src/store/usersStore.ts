import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
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
import { RelationshipType, UserProfile } from '@root/types';

interface UsersState {
    users: UserProfile[];
    followers: UserProfile[];
    following: UserProfile[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    lastVisible: any;
    hasMore: boolean;
    fetchUsers: (reset?: boolean) => Promise<void>;
    setSearchQuery: (query: string) => void;
    fetchUserByUsername: (username: string) => Promise<UserProfile | null>;
    followUser: (userId: string) => Promise<void>;
    unfollowUser: (userId: string) => Promise<void>;
    debouncedFetchUsers: () => void;
    fetchMoreUsers: () => Promise<void>;
    fetchRelationships: (
        userId: string,
        type: RelationshipType,
        reset?: boolean
    ) => Promise<void>;
    fetchMoreRelationships: (
        userId: string,
        type: RelationshipType
    ) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set, get) => ({
    users: [],
    followers: [],
    following: [],
    loading: false,
    error: null,
    searchQuery: '',
    lastVisible: null,
    hasMore: true,
    debouncedFetchUsers: debounce(() => {
        const { fetchUsers } = get();
        fetchUsers(true);
    }, 300),

    setSearchQuery: (query: string) => {
        const { searchQuery, loading } = get();

        if (query !== searchQuery && !loading) {
            set({ searchQuery: query });
            get().debouncedFetchUsers();
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
                set({ users: [], lastVisible: null, hasMore: true });
            }

            if (searchQuery.trim()) {
                const normalizedQuery = searchQuery.trim().toLowerCase();

                q = query(
                    usersRef,
                    where('verified', '==', true),
                    where('usernameLower', '>=', normalizedQuery),
                    where('usernameLower', '<=', normalizedQuery + '\uf8ff'),
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
                    ...(reset || !lastVisible ? [] : [startAfter(lastVisible)])
                );
            }

            const snapshot = await getDocs(q);

            const fetchedUsers: UserProfile[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as UserProfile[];

            set({
                users: reset ? fetchedUsers : [...users, ...fetchedUsers],
                lastVisible: snapshot.docs[snapshot.docs.length - 1] || null,
                hasMore: fetchedUsers.length === 15
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

        set({ loading: true });

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

            const fetchedUsers: UserProfile[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as UserProfile[];

            set({
                users: [...users, ...fetchedUsers],
                lastVisible: snapshot.docs[snapshot.docs.length - 1] || null,
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
                set({ error: null });
                return user;
            } else {
                set({ error: 'User not found' });
                return null;
            }
        } catch (error: any) {
            console.error('Error fetching user by username:', error.message);
            set({ error: error.message });
            return null;
        } finally {
            set({ loading: false });
        }
    },

    followUser: async (targetUserId) => {
        const { userProfile } = useAuthStore.getState();
        if (!userProfile) return;

        set({ loading: true });

        try {
            const currentUserRef = doc(db, 'users', userProfile.id);
            const targetUserRef = doc(db, 'users', targetUserId);

            await Promise.all([
                updateDoc(currentUserRef, {
                    following: arrayUnion(targetUserId),
                    followingCount: userProfile.followingCount + 1
                }),
                updateDoc(targetUserRef, {
                    followers: arrayUnion(userProfile.id)
                })
            ]);

            useAuthStore.setState({
                userProfile: {
                    ...userProfile,
                    following: [...(userProfile.following || []), targetUserId],
                    followingCount: userProfile.followingCount + 1
                }
            });
        } catch (error: any) {
            console.error('Follow Error:', error.message);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    unfollowUser: async (targetUserId) => {
        const { userProfile } = useAuthStore.getState();
        if (!userProfile) return;

        set({ loading: true });

        try {
            const currentUserRef = doc(db, 'users', userProfile.id);
            const targetUserRef = doc(db, 'users', targetUserId);

            await Promise.all([
                updateDoc(currentUserRef, {
                    following: arrayRemove(targetUserId),
                    followingCount: Math.max(0, userProfile.followingCount - 1)
                }),
                updateDoc(targetUserRef, {
                    followers: arrayRemove(userProfile.id)
                })
            ]);

            useAuthStore.setState({
                userProfile: {
                    ...userProfile,
                    following: userProfile.following?.filter(
                        (id) => id !== targetUserId
                    ),
                    followingCount: Math.max(0, userProfile.followingCount - 1)
                }
            });
        } catch (error: any) {
            console.error('Unfollow Error:', error.message);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    fetchRelationships: async (userId, type, reset = false) => {
        const { searchQuery, hasMore } = get();
        const currentState = get()[type]; // followers или following
        const normalizedQuery = searchQuery.trim().toLowerCase();

        if (
            !reset &&
            currentState.length > 0 &&
            searchQuery.trim() === '' &&
            !hasMore
        ) {
            return;
        }

        set({ loading: true, error: null });

        try {
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                set({ error: 'User not found' });
                return;
            }

            // IDs фолловеров или фолловингов
            const ids: string[] = userDoc.data()?.[type] || [];

            if (reset) {
                set({ [type]: [], lastVisible: null, hasMore: true });
            }

            // Если есть фильтр по searchQuery
            let filteredIds = ids;
            if (normalizedQuery) {
                const usersRef = collection(db, 'users');
                const filterQuery = query(
                    usersRef,
                    where('id', 'in', ids.slice(0, 10)), // Ограничиваем до 10 из-за Firestore
                    where('usernameLower', '>=', normalizedQuery),
                    where('usernameLower', '<=', normalizedQuery + '\uf8ff'),
                    orderBy('usernameLower')
                );
                const snapshot = await getDocs(filterQuery);
                filteredIds = snapshot.docs.map((doc) => doc.id);
            }

            // Пагинация (ограничение по 15 пользователей за раз)
            const batchIds = reset
                ? filteredIds.slice(0, 15)
                : filteredIds.slice(
                      currentState.length,
                      currentState.length + 15
                  );

            if (batchIds.length === 0) {
                set({ hasMore: false });
                return;
            }

            // Загружаем пользователей
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('id', 'in', batchIds));
            const snapshot = await getDocs(q);

            const fetchedUsers = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as UserProfile[];

            set({
                [type]: reset
                    ? fetchedUsers
                    : [...currentState, ...fetchedUsers],
                hasMore: fetchedUsers.length === 15,
                lastVisible: snapshot.docs[snapshot.docs.length - 1] || null
            });
        } catch (error: any) {
            console.error(`Error fetching ${type}:`, error.message);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    fetchMoreRelationships: async (userId, type) => {
        await get().fetchRelationships(userId, type, false);
    }
}));
