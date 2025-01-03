import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    updateDoc,
    where
} from 'firebase/firestore';
import { create } from 'zustand';
import debounce from 'lodash/debounce';

import { db } from '@root/firebase/firebaseConfig';
import { useAuthStore } from '@root/store/authStore';
import { UserProfile } from '@root/types';

interface UsersState {
    users: UserProfile[];
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
}

export const useUsersStore = create<UsersState>((set, get) => ({
    users: [],
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
    }
}));
