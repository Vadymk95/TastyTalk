import { auth, db, googleProvider } from '@root/firebase/firebaseConfig';
import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    User
} from 'firebase/auth';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { create } from 'zustand';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    signInWithEmail: (
        email: string,
        password: string,
        handleRedirectToMainPage: () => void
    ) => Promise<void>;
    signInWithGoogle: (handleRedirectToMainPage: () => void) => Promise<void>;
    signOutUser: () => Promise<void>;
    registerWithEmailAndProfile: (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => Promise<void>;
    deleteUserAccount: (email: string, password: string) => Promise<void>;
    reauthenticateUser: (email: string, password: string) => Promise<void>;
    setLoading: (value: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,

    setUser: (user) => set({ user }),

    setLoading: (value) => set({ loading: value }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    signInWithEmail: async (email, password, handleRedirectToMainPage) => {
        set({ loading: true });
        try {
            set({ error: null });
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            set({ user: userCredential.user, error: null });

            handleRedirectToMainPage();
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    signInWithGoogle: async (handleRedirectToMainPage) => {
        set({ loading: true });
        try {
            set({ error: null });
            const userCredential = await signInWithPopup(auth, googleProvider);
            set({ user: userCredential.user, error: null });

            handleRedirectToMainPage();
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
    },

    registerWithEmailAndProfile: async (
        email,
        password,
        firstName,
        lastName
    ) => {
        set({ loading: true });
        try {
            set({ error: null });
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`
            });
            await user.reload();
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                firstName,
                lastName,
                createdAt: new Date()
            });

            set({ user, error: null });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    reauthenticateUser: async (email, password) => {
        const user = auth.currentUser;
        if (user) {
            const credential = EmailAuthProvider.credential(email, password);
            await reauthenticateWithCredential(user, credential);
        }
    },

    deleteUserAccount: async (email, password) => {
        set({ loading: true });
        const user = auth.currentUser;

        if (user) {
            try {
                await useAuthStore
                    .getState()
                    .reauthenticateUser(email, password);
                await deleteDoc(doc(db, 'users', user.uid));
                await deleteUser(user);

                set({ user: null, error: null });
            } catch (error: any) {
                set({ error: error.message });
            } finally {
                set({ loading: false });
            }
        } else {
            set({ error: 'No user is currently signed in.' });
            set({ loading: false });
        }
    }
}));

onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
});
