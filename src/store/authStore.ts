import { auth, googleProvider } from '@root/firebase/firebaseConfig';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User
} from 'firebase/auth';
import { create } from 'zustand';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signOutUser: () => Promise<void>;
    setLoading: (value: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,

    setLoading: (value) => set({ loading: value }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    signInWithEmail: async (email, password) => {
        set({ loading: true });
        try {
            set({ error: null });
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            set({ user: userCredential.user, error: null });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    signInWithGoogle: async () => {
        set({ loading: true });
        try {
            set({ error: null });
            const userCredential = await signInWithPopup(auth, googleProvider);
            set({ user: userCredential.user, error: null });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    signOutUser: async () => {
        set({ loading: true });
        try {
            await signOut(auth);
            set({ user: null, error: null });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    }
}));
