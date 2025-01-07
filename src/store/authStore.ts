import {
    ApplicationVerifier,
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    fetchSignInMethodsForEmail,
    getRedirectResult,
    GoogleAuthProvider,
    linkWithCredential,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    updateEmail,
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
import { convertFileToBase64, isInWebViewOrIframe } from '@root/helpers';
import {
    SubscriptionPlan,
    UpdateProfileData,
    UserProfile,
    VerificationMethod
} from '@root/types';

interface AuthState {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    error: string | null;
    isRegistered: boolean;
    initialized: boolean;
    editProfile: (profileData: UpdateProfileData) => Promise<boolean>;
    editEmail: (newEmail: string, currentPassword: string) => Promise<boolean>;
    changePassword: (
        currentPassword: string,
        newPassword: string
    ) => Promise<boolean>;
    signIn: (loginData: string, password: string) => Promise<boolean | null>;
    signInWithGoogle: () => Promise<boolean | null>;
    signOutUser: () => Promise<void>;
    registerWithEmailAndProfile: (
        email: string,
        phoneNumber: string,
        verificationMethod: VerificationMethod,
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
    checkEmailAndFirestoreAvailability: (email: string) => Promise<boolean>;
    updateSubscriptionPlan: (plan: SubscriptionPlan) => Promise<void>;
    isMe: (username: string) => boolean;
    hasPaidPlan: () => boolean;
    isBasicPlan: () => boolean;
    isStandardPlan: () => boolean;
    isPremiumPlan: () => boolean;
    handleRedirectResult: () => Promise<void>;
    verifyPhoneNumber: (
        phoneNumber: string,
        appVerifier: ApplicationVerifier
    ) => Promise<any>;
    confirmPhoneVerificationCode: (
        verificationCode: string,
        confirmationResult: any
    ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    userProfile: null,
    loading: false,
    error: null,
    isRegistered: false,
    initialized: false,

    setUser: async (user, isRegistered = false) => {
        set({ loading: true });
        try {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                const userProfile = userSnap.exists()
                    ? (userSnap.data() as UserProfile)
                    : null;

                const isVerified =
                    user.emailVerified || (userProfile?.verified ?? false);

                set({
                    user,
                    isRegistered,
                    initialized: true,
                    userProfile: userProfile
                        ? { ...userProfile, verified: isVerified }
                        : null
                });

                if (
                    isRegistered &&
                    userProfile &&
                    userProfile.verified !== isVerified
                ) {
                    await setDoc(
                        userRef,
                        { verified: isVerified },
                        { merge: true }
                    );
                }

                if (!isVerified && !isRegistered) {
                    await sendEmailVerification(user);
                }
            } else {
                set({
                    user: null,
                    isRegistered: false,
                    initialized: true,
                    userProfile: null
                });
            }
        } catch (error) {
            console.error('Failed to set user:', error);
        } finally {
            set({ loading: false });
        }
    },

    loadUserProfile: async (uid: string) => {
        set({ loading: true });
        try {
            const userRef = doc(db, 'users', uid);
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
        } finally {
            set({ loading: false });
        }
    },

    setLoading: (value) => set({ loading: value }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    signIn: async (loginData: string, password: string) => {
        set({ loading: true });
        try {
            set({ error: null });
            let email = loginData;
            if (loginData.startsWith('+')) {
                const phoneWithoutPlus = loginData.slice(1);
                const usersRef = collection(db, 'users');
                const q = query(
                    usersRef,
                    where('phoneNumber', '==', phoneWithoutPlus)
                );
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    email = userDoc.data().email;
                } else {
                    throw new Error('auth/invalid-phone-number');
                }
            } else if (!/\S+@\S+\.\S+/.test(loginData)) {
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('username', '==', loginData));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    email = userDoc.data().email;
                } else {
                    throw new Error('auth/invalid-credential');
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
        try {
            if (isInWebViewOrIframe()) {
                await signInWithRedirect(auth, googleProvider);
            } else {
                const userCredential = await signInWithPopup(
                    auth,
                    googleProvider
                );
                const googleUser = userCredential.user;

                const signInMethods = await fetchSignInMethodsForEmail(
                    auth,
                    googleUser.email!
                );

                if (signInMethods.includes('password')) {
                    const user = auth.currentUser;
                    if (user) {
                        const credential =
                            GoogleAuthProvider.credentialFromResult(
                                userCredential
                            );
                        await linkWithCredential(user, credential!);
                    }
                } else {
                    return await processGoogleSignIn(userCredential);
                }
            }
            return true;
        } catch (error: any) {
            console.error('Error signing in with Google:', error);
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
        phoneNumber,
        verificationMethod,
        username,
        password,
        firstName,
        lastName
    ) => {
        set({ loading: true });
        try {
            set({ error: null });

            if (phoneNumber) {
                const usersRef = collection(db, 'users');
                const q = query(
                    usersRef,
                    where('phoneNumber', '==', phoneNumber)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    throw new Error('This phone number is already in use.');
                }
            }

            const currentUser = auth.currentUser;

            if (currentUser && currentUser.email === email) {
                const credential = EmailAuthProvider.credential(
                    email,
                    password
                );
                const usernameLower = username.toLowerCase();
                await linkWithCredential(currentUser, credential);

                const userProfile = {
                    id: currentUser.uid,
                    email: currentUser.email,
                    phoneNumber,
                    verificationMethod,
                    username,
                    usernameLower,
                    firstName,
                    lastName,
                    createdAt: new Date(),
                    followers: [],
                    following: [],
                    verified: true,
                    subscriptionPlan: 'Free' as SubscriptionPlan,
                    recipesCount: 0,
                    mealPlansCount: 0,
                    followersCount: 0,
                    followingCount: 0
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
                await get().checkEmailAndFirestoreAvailability(email);

                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = userCredential.user;
                const usernameLower = username.toLowerCase();

                await updateProfile(user, {
                    displayName: `${firstName} ${lastName}`
                });
                await user.reload();

                const userProfile = {
                    id: user.uid,
                    email: user.email,
                    phoneNumber,
                    verificationMethod,
                    username,
                    usernameLower,
                    firstName,
                    lastName,
                    createdAt: new Date(),
                    followers: [],
                    following: [],
                    verified: false,
                    subscriptionPlan: 'Free' as SubscriptionPlan,
                    recipesCount: 0,
                    mealPlansCount: 0,
                    followersCount: 0,
                    followingCount: 0
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
            try {
                await sendEmailVerification(user);
            } catch (error) {
                console.error('Failed to resend verification email:', error);
                throw new Error('Failed to resend verification email.');
            }
        } else {
            throw new Error(
                'No user is currently signed in or email is already verified.'
            );
        }
    },

    checkEmailVerificationStatus: async () => {
        const user = auth.currentUser;

        if (!user) {
            console.error('No authenticated user found.');
            return;
        }

        try {
            await user.reload();
            const isVerified = user.emailVerified;

            if (isVerified) {
                const userRef = doc(db, 'users', user.uid);

                await setDoc(userRef, { verified: true }, { merge: true });

                const { userProfile } = get();

                if (userProfile) {
                    set({
                        userProfile: {
                            ...userProfile,
                            verified: true
                        }
                    });
                } else {
                    console.error('User profile not found in store!');
                }
            }
        } catch (error) {
            console.error('Error checking email verification status:', error);
            set({ error: 'Failed to check email verification status' });
        }
    },

    verifyPhoneNumber: async (
        phoneNumber: string,
        appVerifier: ApplicationVerifier
    ) => {
        set({ loading: true });
        try {
            set({ error: null });
            const currentUser = get().user;
            const userProfile = get().userProfile;

            if (!currentUser || !userProfile) {
                set({
                    error: 'User is not authenticated or profile is missing.'
                });
                return;
            }

            if (!phoneNumber.startsWith('+')) {
                throw new Error('Phone number must be in E.164 format.');
            }

            // Отправляем код на указанный номер телефона
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                phoneNumber,
                appVerifier
            );

            // Сохраняем `confirmationResult` в состоянии для дальнейшей верификации кода
            set({
                userProfile: {
                    ...userProfile,
                    phoneNumber: phoneNumber
                }
            });

            return confirmationResult;
        } catch (error: any) {
            console.error('Phone Verification Error:', error);
            set({ error: error.message });
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    confirmPhoneVerificationCode: async (
        verificationCode: string,
        confirmationResult: any
    ) => {
        set({ loading: true });
        try {
            set({ error: null });

            const userCredential =
                await confirmationResult.confirmationResult.confirm(
                    verificationCode
                );
            const user = userCredential.user;
            const userProfile = get().userProfile;

            if (!user || !userProfile) {
                set({
                    error: 'User is not authenticated or profile is missing.'
                });
                return false;
            }

            // Обновляем информацию о пользователе в Firestore
            const userRef = doc(db, 'users', user.uid);
            await setDoc(
                userRef,
                { phoneNumber: user.phoneNumber },
                { merge: true }
            );

            // Обновляем состояние
            set({
                user,
                userProfile: {
                    ...userProfile,
                    phoneNumber: user.phoneNumber,
                    verified: true
                }
            });

            return true;
        } catch (error: any) {
            console.error('Code Confirmation Error:', error);
            set({ error: error.message });
            return false;
        } finally {
            set({ loading: false });
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

                if (
                    profileData.username &&
                    profileData.username !== currentUsername
                ) {
                    const isAvailable = await get().checkUsernameAvailability(
                        profileData.username
                    );
                    if (!isAvailable) {
                        console.error('This username is already taken.');
                        throw new Error('This username is already taken.');
                    }
                    const usernameLower = profileData.username.toLowerCase();
                    firestoreUpdates.username = profileData.username;
                    firestoreUpdates.usernameLower = usernameLower;
                }

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

                if (profileData.showCountry !== undefined) {
                    firestoreUpdates.showCountry = profileData.showCountry;
                }

                if (profileData.showName !== undefined) {
                    firestoreUpdates.showName = profileData.showName;
                }

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

                if (Object.keys(firestoreUpdates).length > 0) {
                    await setDoc(userRef, firestoreUpdates, { merge: true });
                }

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

    editEmail: async (newEmail: string, currentPassword: string) => {
        set({ loading: true });
        try {
            set({ error: null });

            const user = auth.currentUser;
            if (!user) {
                throw new Error('No user is currently signed in.');
            }

            // Проверяем, доступен ли новый email
            const isAvailable =
                await get().checkEmailAndFirestoreAvailability(newEmail);
            if (!isAvailable) {
                throw new Error('This email is already in use.');
            }

            // Реаутентификация пользователя
            const credential = EmailAuthProvider.credential(
                user.email!,
                currentPassword
            );
            await reauthenticateWithCredential(user, credential);

            // Обновление email пользователя в Firebase Authentication
            await updateEmail(user, newEmail);

            // Отправляем письмо для подтверждения нового email
            await sendEmailVerification(user);

            const userProfile = get().userProfile;

            if (!userProfile) {
                throw new Error('User profile not found in store.');
            }

            const isVerified =
                userProfile.verificationMethod === 'full' ? true : false;
            const verifMethod =
                userProfile.verificationMethod !== 'email' ? 'phone' : 'email';

            const userRef = doc(db, 'users', user.uid); // Здесь user.uid — это идентификатор пользователя
            await setDoc(
                userRef,
                {
                    email: newEmail,
                    verified: isVerified,
                    verificationMethod: verifMethod
                },
                { merge: true } // Указываем merge, чтобы не затереть остальные поля
            );

            set({
                userProfile: {
                    ...userProfile,
                    email: newEmail,
                    verified: isVerified,
                    verificationMethod: verifMethod
                }
            });

            return true; // Обновление завершено
        } catch (error: any) {
            console.error('Edit Email Error:', error);
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
    ): Promise<boolean> => {
        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);

            if (signInMethods.length > 0) {
                console.error(
                    'This email is already registered. Please log in or verify your email.'
                );
                return false;
            }

            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                console.error(
                    'This email is already in use. Please try another email.'
                );
                return false;
            }

            return true;
        } catch (error: any) {
            console.error('Email availability check failed:', error);
            return false;
        }
    },

    updateSubscriptionPlan: async (plan: SubscriptionPlan) => {
        const currentUser = get().user;
        const userProfile = get().userProfile;

        if (!currentUser || !userProfile) {
            set({ error: 'User is not authenticated or profile is missing.' });
            return;
        }

        set({ loading: true, error: null });
        try {
            const userRef = doc(db, 'users', currentUser.uid);
            await setDoc(userRef, { subscriptionPlan: plan }, { merge: true });

            set({
                userProfile: { ...userProfile, subscriptionPlan: plan },
                loading: false
            });
        } catch (error: any) {
            console.error('Failed to update subscription plan:', error);
            set({
                error: 'Failed to update subscription plan.',
                loading: false
            });
        }
    },

    isMe: (username: string) => {
        const currentUser = get().userProfile;
        return currentUser ? currentUser.username === username : false;
    },

    hasPaidPlan: () => {
        const plan = get().userProfile?.subscriptionPlan;
        return plan === 'Basic' || plan === 'Standard' || plan === 'Premium';
    },

    isBasicPlan: () => get().userProfile?.subscriptionPlan === 'Basic',

    isStandardPlan: () => get().userProfile?.subscriptionPlan === 'Standard',

    isPremiumPlan: () => get().userProfile?.subscriptionPlan === 'Premium',

    handleRedirectResult: async () => {
        try {
            const result = await getRedirectResult(auth);
            if (result) {
                const userCredential = result;

                await processGoogleSignIn(userCredential);
            }
        } catch (error) {
            console.error('Error processing redirect result:', error);
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
