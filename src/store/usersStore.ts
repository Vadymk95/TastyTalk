import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where
} from 'firebase/firestore';
import { create } from 'zustand';

import { db } from '@root/firebase/firebaseConfig';
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
}

export const useUsersStore = create<UsersState>((set, get) => ({
    users: [],
    loading: false,
    error: null,
    searchQuery: '',
    lastVisible: null,
    hasMore: true,

    setSearchQuery: (query) => set({ searchQuery: query }),

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
                q = query(
                    usersRef,
                    where('verified', '==', true),
                    where('username', '>=', searchQuery.trim()),
                    where('username', '<=', searchQuery.trim() + '\uf8ff'),
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

            console.log('Fetched users:', fetchedUsers);
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

            const q = query(
                usersRef,
                where('verified', '==', true),
                where('username', '==', username),
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
    }
}));
