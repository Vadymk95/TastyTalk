import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    fetchSignInMethodsForEmail,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    updatePassword,
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
import { convertFileToBase64, isMobileDevice } from '@root/helpers';
import { UpdateProfileData, UserProfile } from '@root/types';

interface AuthState {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    error: string | null;
    isRegistered: boolean;
    isEmailVerified: boolean;
    initialized: boolean;
    editProfile: (profileData: UpdateProfileData) => Promise<boolean>;
    changePassword: (
        currentPassword: string,
        newPassword: string
    ) => Promise<boolean>;
    signInWithEmailOrUsername: (
        emailOrUsername: string,
        password: string
    ) => Promise<boolean | null>;
    signInWithGoogle: () => Promise<boolean | null>;
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
    deleteUserAccount: (email: string, password: string) => Promise<boolean>;
    reauthenticateUser: (email: string, password: string) => Promise<void>;
    checkUsernameAvailability: (username: string) => Promise<boolean>;
    setLoading: (value: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    setUser: (user: User | null, isRegistered?: boolean) => void;
    loadUserProfile: (uid: string) => Promise<void>;
    checkEmailAndFirestoreAvailability: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    userProfile: null,
    loading: false,
    error: null,
    isRegistered: false,
    initialized: false,
    isEmailVerified: false,

    setUser: async (user, isRegistered = false) => {
        if (user) {
            set({
                user,
                isRegistered,
                isEmailVerified: user.emailVerified,
                initialized: true,
                userProfile: null // Очистка userProfile
            });

            if (isRegistered) {
                try {
                    await get().loadUserProfile(user.uid);
                } catch (error) {
                    console.error('Failed to load user profile:', error);
                }
            }
        } else {
            set({
                user: null,
                isRegistered: false,
                isEmailVerified: false,
                initialized: true,
                userProfile: null
            });
        }
    },

    loadUserProfile: async (uid: string) => {
        const userRef = doc(db, 'users', uid);
        try {
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const userProfile = userSnap.data() as UserProfile;
                set({ userProfile });
            } else {
                console.warn('User profile not found in Firestore.');
                set({ userProfile: null });
            }
        } catch (error: any) {
            console.error('Error loading user profile:', error);
            set({ error: error.message });
        }
    },

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
            return null;
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
            return null;
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

            const currentUser = auth.currentUser;

            if (currentUser && currentUser.email === email) {
                //! НУЖНО пофиксить из верифайд опцию
                const userProfile = {
                    id: currentUser.uid,
                    email: currentUser.email,
                    username,
                    firstName,
                    lastName,
                    createdAt: new Date(),
                    followers: [],
                    following: [],
                    verified: false
                };

                await setDoc(doc(db, 'users', currentUser.uid), userProfile);
                await get().loadUserProfile(currentUser.uid);

                set({
                    user: currentUser,
                    userProfile,
                    isRegistered: true,
                    error: null
                });
            } else {
                // Полная регистрация нового пользователя
                await get().checkEmailAndFirestoreAvailability(email);

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

                const userProfile = {
                    id: user.uid,
                    email: user.email,
                    username,
                    firstName,
                    lastName,
                    createdAt: new Date(),
                    followers: [],
                    following: [],
                    verified: false
                };

                await setDoc(doc(db, 'users', user.uid), userProfile);
                await get().loadUserProfile(user.uid);

                set({
                    user,
                    userProfile,
                    isRegistered: true,
                    error: null
                });
            }
        } catch (error: any) {
            set({ error: error.message });
            throw error;
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
                return true;
            } catch (error: any) {
                set({ error: error.message });
                return false;
            } finally {
                set({ loading: false });
            }
        } else {
            set({ error: 'No user is currently signed in.' });
            set({ loading: false });
            return false;
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
    },

    editProfile: async (profileData: UpdateProfileData): Promise<boolean> => {
        set({ loading: true });
        try {
            set({ error: null });
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const firestoreUpdates: Partial<UserProfile> = {};
                const currentUsername = get().userProfile?.username;

                if (profileData.firstName || profileData.lastName) {
                    const displayName =
                        `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim();
                    await updateProfile(user, { displayName });
                    firestoreUpdates.firstName = profileData.firstName || '';
                    firestoreUpdates.lastName = profileData.lastName || '';
                }

                // Проверка и обновление username
                if (
                    profileData.username &&
                    profileData.username !== currentUsername
                ) {
                    const isAvailable = await get().checkUsernameAvailability(
                        profileData.username
                    );
                    if (!isAvailable) {
                        throw new Error('Этот юзернейм уже занят');
                    }
                    firestoreUpdates.username = profileData.username;
                }

                // Дополнительные поля профиля
                if (profileData.bio) {
                    firestoreUpdates.bio = profileData.bio;
                }

                if (profileData.country) {
                    firestoreUpdates.country = profileData.country;
                }

                if (profileData.socialNetworks) {
                    firestoreUpdates.socialNetworks =
                        profileData.socialNetworks;
                }

                // Преобразование файла в Base64
                if (profileData.profileImage) {
                    // This is a workaround to convert the profile photo to base64. Temporary solution.
                    if (profileData.profileImage instanceof File) {
                        const base64Image = await convertFileToBase64(
                            profileData.profileImage
                        );
                        firestoreUpdates.profileImage = base64Image;
                    }
                } else {
                    firestoreUpdates.profileImage = null;
                }

                // Обновление данных в Firestore
                if (Object.keys(firestoreUpdates).length > 0) {
                    await setDoc(userRef, firestoreUpdates, { merge: true });
                }

                // Обновление локального состояния
                const updatedUserSnap = await getDoc(userRef);
                if (updatedUserSnap.exists()) {
                    set({ userProfile: updatedUserSnap.data() as UserProfile });
                }

                await user.reload();
                set({ user: auth.currentUser });

                return true;
            } else {
                throw new Error('No user is currently signed in.');
            }
        } catch (error: any) {
            console.error('Edit Profile Error:', error);
            set({ error: error.message });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    changePassword: async (currentPassword: string, newPassword: string) => {
        set({ loading: true });
        try {
            set({ error: null });
            const user = auth.currentUser;
            if (user && user.email) {
                const credential = EmailAuthProvider.credential(
                    user.email,
                    currentPassword
                );
                await reauthenticateWithCredential(user, credential);

                await updatePassword(user, newPassword);
                return true;
            } else {
                throw new Error('No user is currently signed in.');
            }
        } catch (error: any) {
            set({ error: error.message });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    checkEmailAndFirestoreAvailability: async (
        email: string
    ): Promise<void> => {
        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);

            if (signInMethods.length > 0) {
                throw new Error(
                    'This email is already registered. Please log in or verify your email.'
                );
            }

            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                throw new Error(
                    'This email is already in use. Please try another email.'
                );
            }
        } catch (error: any) {
            console.error('Email availability check failed:', error);
            throw new Error(
                error.message ||
                    'An error occurred while checking email availability.'
            );
        }
    }
}));

const processGoogleSignIn = async (
    userCredential: UserCredential
): Promise<boolean> => {
    const user = userCredential.user;
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    const isRegistered = userSnap.exists();
    useAuthStore.getState().setUser(user, isRegistered);

    return isRegistered;
};

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const state = useAuthStore.getState();
        if (!state.userProfile) {
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            const isRegistered = userSnap.exists();
            const userProfile = isRegistered
                ? (userSnap.data() as UserProfile)
                : null;
            state.setUser(user, isRegistered);
            if (userProfile) {
                useAuthStore.setState({ userProfile });
            }
        }
    } else {
        useAuthStore.getState().setUser(null, false);
        useAuthStore.setState({ userProfile: null });
    }
});
