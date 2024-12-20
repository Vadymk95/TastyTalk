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

import { db } from '@root/firebase/firebaseConfig';
import { useAuthStore } from '@root/store';
import { UserProfile } from '@root/types';
import { debounce } from 'lodash';

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
        const { searchQuery, lastVisible, users } = get();

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
                    limit(20)
                );
            } else {
                q = query(
                    usersRef,
                    where('verified', '==', true),
                    orderBy('username'),
                    limit(20),
                    ...(reset ? [] : [startAfter(lastVisible)])
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
                hasMore: fetchedUsers.length === 20
            });
        } catch (error: any) {
            console.log('Error fetching users:', error.message);
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
            set({ error: error.message });
            return null;
        } finally {
            set({ loading: false });
        }
    },

    followUser: async (targetUserId) => {
        const { userProfile } = useAuthStore.getState(); // Получаем текущий профиль
        if (!userProfile) return;

        try {
            const currentUserRef = doc(db, 'users', userProfile.id); // Текущий юзер
            const targetUserRef = doc(db, 'users', targetUserId); // Целевой юзер

            // Обновляем Firestore
            await Promise.all([
                updateDoc(currentUserRef, {
                    following: arrayUnion(targetUserId),
                    followingCount: userProfile.followingCount + 1
                }),
                updateDoc(targetUserRef, {
                    followers: arrayUnion(userProfile.id)
                })
            ]);

            // Обновляем локальное состояние userProfile в authStore
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
        }
    },

    unfollowUser: async (targetUserId) => {
        const { userProfile } = useAuthStore.getState(); // Получаем текущий профиль
        if (!userProfile) return;

        try {
            const currentUserRef = doc(db, 'users', userProfile.id);
            const targetUserRef = doc(db, 'users', targetUserId);

            // Обновляем Firestore
            await Promise.all([
                updateDoc(currentUserRef, {
                    following: arrayRemove(targetUserId),
                    followingCount: Math.max(0, userProfile.followingCount - 1)
                }),
                updateDoc(targetUserRef, {
                    followers: arrayRemove(userProfile.id)
                })
            ]);

            // Обновляем локальное состояние userProfile в authStore
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
        }
    }
}));
