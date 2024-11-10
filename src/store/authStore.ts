import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    updateProfile,
    User,
    UserCredential
} from 'firebase/auth';
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where
} from 'firebase/firestore';
import { create } from 'zustand';

import { auth, db, googleProvider } from '@root/firebase/firebaseConfig';
import { isMobileDevice } from '@root/helpers';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isRegistered: boolean;
    isEmailVerified: boolean;
    initialized: boolean;
    signInWithEmailOrUsername: (
        emailOrUsername: string,
        password: string
    ) => Promise<boolean>;
    signInWithGoogle: () => Promise<boolean>;
    signOutUser: () => Promise<void>;
    registerWithEmailAndProfile: (
        email: string,
        username: string,
        password: string,
        firstName: string,
        lastName: string
    ) => Promise<void>;
    resendVerificationEmail: () => Promise<void>;
    checkEmailVerificationStatus: () => Promise<void>;
    deleteUserAccount: (email: string, password: string) => Promise<void>;
    reauthenticateUser: (email: string, password: string) => Promise<void>;
    checkUsernameAvailability: (username: string) => Promise<boolean>;
    setLoading: (value: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    setUser: (user: User | null, isRegistered?: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,
    isRegistered: false,
    initialized: false,
    isEmailVerified: false,

    setUser: (user, isRegistered = false) =>
        set({
            user,
            isRegistered,
            isEmailVerified: user ? user.emailVerified : false,
            initialized: true
        }),

    setLoading: (value) => set({ loading: value }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    signInWithEmailOrUsername: async (
        emailOrUsername: string,
        password: string
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
                    throw new Error('Пользователь с таким именем не найден');
                }
            }

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            set({ user: userCredential.user, error: null, isRegistered: true });

            return true;
        } catch (error: any) {
            set({ error: error.message });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    signInWithGoogle: async () => {
        set({ loading: true });

        const isMobile = isMobileDevice();

        try {
            if (isMobile) {
                await signInWithRedirect(auth, googleProvider);
                return true;
            } else {
                const userCredential = await signInWithPopup(
                    auth,
                    googleProvider
                );
                return await processGoogleSignIn(userCredential);
            }
        } catch (error: any) {
            set({ error: error.message });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    signOutUser: async () => {
        set({ loading: true });
        try {
            await signOut(auth);
            set({ user: null, error: null, isRegistered: false });
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

            set({ user, error: null, isRegistered: true });
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

                set({ user: null, error: null, isRegistered: false });
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
    },

    resendVerificationEmail: async () => {
        const user = auth.currentUser;
        if (user && !user.emailVerified) {
            await sendEmailVerification(user);
        } else {
            throw new Error(
                'No user is currently signed in or email is already verified.'
            );
        }
    },

    checkEmailVerificationStatus: async () => {
        const user = auth.currentUser;
        if (user) {
            await user.reload();
            if (user.emailVerified) {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                const isRegistered = userSnap.exists() && user.emailVerified;
                await user.reload();
                set({ user, isRegistered });
            }
        }
    }
}));

const processGoogleSignIn = async (
    userCredential: UserCredential
): Promise<boolean> => {
    const user = userCredential.user;
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        useAuthStore.getState().setUser(user, true);
        return true;
    } else {
        useAuthStore.getState().setUser(user, false);
        return false;
    }
};

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const isRegistered = userSnap.exists();
        useAuthStore.getState().setUser(user, isRegistered);
    } else {
        useAuthStore.getState().setUser(null, false);
    }
});
