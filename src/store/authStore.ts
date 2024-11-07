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
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    setDoc,
    where
} from 'firebase/firestore';
import { create } from 'zustand';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    signInWithEmailOrUsername: (
        emailOrUsername: string,
        password: string,
        handleRedirectToMainPage: () => void
    ) => Promise<void>;
    signInWithGoogle: (handleRedirectToMainPage: () => void) => Promise<void>;
    signOutUser: () => Promise<void>;
    registerWithEmailAndProfile: (
        email: string,
        username: string,
        password: string,
        firstName: string,
        lastName: string
    ) => Promise<void>;
    deleteUserAccount: (email: string, password: string) => Promise<void>;
    reauthenticateUser: (email: string, password: string) => Promise<void>;
    checkUsernameAvailability: (username: string) => Promise<boolean>;
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

    signInWithEmailOrUsername: async (
        emailOrUsername,
        password,
        handleRedirectToMainPage
    ) => {
        set({ loading: true });
        try {
            set({ error: null });

            let email = emailOrUsername;

            if (!/\S+@\S+\.\S+/.test(emailOrUsername)) {
                const usersRef = collection(db, 'users');
                const q = query(
                    usersRef,
                    where('username', '==', emailOrUsername)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    email = userDoc.data().email;
                } else {
                    throw new Error('username not found');
                }
            }

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
        username,
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
                username,
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
    },

    checkUsernameAvailability: async (username: string) => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));

        const querySnapshot = await getDocs(q);

        return querySnapshot.empty;
    }
}));

onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
});
