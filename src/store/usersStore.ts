import { db } from '@root/firebase/firebaseConfig';
import { UserProfile } from '@root/types';
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

interface UsersState {
    users: UserProfile[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    lastVisible: any; // Firestore reference for pagination
    hasMore: boolean;
    fetchUsers: (reset?: boolean) => Promise<void>;
    setSearchQuery: (query: string) => void;
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

            if (searchQuery) {
                // Поиск по имени, фамилии или юзернейму
                q = query(
                    usersRef,
                    where('verified', '==', true),
                    where('username', '>=', searchQuery),
                    where('username', '<=', searchQuery + '\uf8ff'),
                    orderBy('username'),
                    limit(20)
                );
            } else {
                // Без поиска
                q = query(
                    usersRef,
                    where('verified', '==', true),
                    orderBy('username'),
                    limit(20),
                    ...(lastVisible ? [startAfter(lastVisible)] : [])
                );
            }

            const snapshot = await getDocs(q);

            const fetchedUsers: UserProfile[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as UserProfile[];

            set({
                users: reset ? fetchedUsers : [...users, ...fetchedUsers],
                lastVisible: snapshot.docs[snapshot.docs.length - 1],
                hasMore: fetchedUsers.length === 20
            });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    }
}));
