export const en = {
    en: {
        translation: {
            AuthPage: {
                signInToAccount: 'Sign in to your account',
                signUp: 'Sign Up'
            },
            EmailVerificationPage: {
                title: 'Confirm your email address',
                text: 'An email has been sent to your email address. Please confirm it to complete the registration.',
                goToHome: 'Go to Homepage',
                resendEmailText: 'Didn’t receive the email?',
                resendEmail: 'Resend Email',
                emailSent: 'Email has been sent',
                emailSendError: 'Error sending email'
            },
            GreetingPage: {
                welcome: 'Welcome!',
                description: 'Choose where you want to go:',
                recipes: 'View recipes',
                mealPlans: 'View meal plans',
                createRecipe: 'Create a recipe',
                createPlan: 'Create a meal plan'
            },
            ProfilePage: {
                settings: 'Profile Settings'
            },
            ProfileSettingsPage: {
                title: 'Edit Profile',
                changeLanguageTitle: 'Change Language',
                changeLanguageDescription:
                    'Select your preferred language for the app',
                changeLanguageButton: 'Change Language',
                logOut: 'Log Out',
                logOutDescription: 'Log out of your account on this device',
                logOutButton: 'Log Out',
                support: 'Support',
                supportDescription:
                    'If you have any questions or issues, contact support',
                contactSupport: 'Contact Support',
                changePassword: 'Change Password',
                passwordDescription:
                    'Update your password to keep your account secure',
                changePasswordButton: 'Change Password',
                deleteAccount: 'Delete Account',
                deleteDescription:
                    'Permanently delete your account. This action cannot be undone.',
                deleteButton: 'Delete Account'
            },
            NotFoundPage: {
                notFound: '404',
                oops: "Oops! The page you're looking for doesn't exist.",
                goHome: 'Go to Homepage'
            },
            Header: {
                brand: 'TastyTalks',
                signOut: 'Sign Out',
                signIn: 'Sign In',
                home: 'Home',
                registerFinish: 'Finish Registration'
            },
            Footer: {
                allRights: '© 2024 TastyTalks. All rights reserved.',
                profile: 'Your Profile',
                signOut: 'Sign Out'
            },
            AuthErrors: {
                invalidEmail: 'Invalid email address.',
                userDisabled: 'This account has been disabled.',
                userNotFound: 'No user found with this email.',
                wrongPassword: 'Incorrect password.',
                invalidCredential: 'Invalid credentials provided.',
                popupClosedByUser: 'Sign in process was canceled by the user.',
                usernameNotFound: 'Username not found. Please try again.'
            },
            UsernameInput: {
                chooseUsername: 'Choose a username',
                checking: 'Checking...',
                available: 'Username is available',
                taken: 'Username is already taken'
            },
            Forms: {
                LoginForm: {
                    actionSignUp: 'Sign Up',
                    signIn: 'Sign In',
                    dontHaveAccount: "Don't have an account?",
                    emailOrUsername: 'Email or Username',
                    emailOrUsernamePlaceholder: 'Enter your email or username',
                    password: 'Password',
                    requiredField: 'This field is required',
                    emailNotValid: 'Email is not valid',
                    passwordMinLength:
                        'Password must be at least 6 characters long',
                    signInWithGoogle: 'Sign in with Google'
                },
                RegisterForm: {
                    signUp: 'Register',
                    email: 'Email',
                    username: 'Username',
                    lastName: 'Last Name',
                    firstName: 'First Name',
                    password: 'Password',
                    confirmPassword: 'Confirm Password',
                    usernameInvalid:
                        'Username can only contain letters, numbers and underscores',
                    usernameMustContainLetter:
                        'Username must contain at least one letter',
                    firstNameInvalid: 'First name can only contain letters',
                    lastNameInvalid: 'Last name can only contain letters',
                    passwordComplexity:
                        'Password must contain at least one letter and one number',
                    actionSignIn: 'Sign In',
                    firstNameMinLength:
                        'First name must be at least 2 character long',
                    usernameMinLength:
                        'Username must be at least 4 character long',
                    lastNameMinLength:
                        'Last name must be at least 2 character long',
                    requiredField: 'This field is required',
                    emailNotValid: 'Email is not valid',
                    passwordMinLength:
                        'Password must be at least 6 characters long',
                    passwordsMustMatch: 'Passwords must match',
                    enterYourEmail: 'Enter your email',
                    enterYourName: 'Enter your name',
                    enterYourLastName: 'Enter your last name',
                    haveAccount: 'Already have an account?',
                    registerFinish: 'Finish your registration process'
                },
                EditProfileForm: {
                    firstName: 'First Name',
                    lastName: 'Last Name',
                    username: 'Username',
                    usernameInvalid:
                        'Username can only contain letters, numbers and underscores',
                    usernameMustContainLetter:
                        'Username must contain at least one letter',
                    firstNameInvalid: 'First name can only contain letters',
                    lastNameInvalid: 'Last name can only contain letters',
                    firstNameMinLength:
                        'First name must be at least 2 character long',
                    usernameMinLength:
                        'Username must be at least 4 character long',
                    lastNameMinLength:
                        'Last name must be at least 2 character long',
                    requiredField: 'This field is required',
                    personalInfo: 'Personal Information',
                    additionalInfo: 'Additional Information',
                    bio: 'About You',
                    bioMaxLength: 'Maximum 200 characters allowed',
                    country: 'Country',
                    selectCountry: 'Select your country',
                    socialLinks: 'Social Media Links',
                    linkName: 'Link Name',
                    link: 'URL',
                    linkNamePlaceholder: 'Enter link name',
                    linkPlaceholder: 'Enter link URL',
                    linkNameRequired: 'Link name is required',
                    linkRequired: 'Link URL is required',
                    invalidLink: 'Invalid URL',
                    maxSocialLinks: 'You can add up to 5 social links',
                    addLink: 'Add another link',
                    save: 'Save Changes',
                    successMessage: 'Profile updated successfully'
                },
                ChangePasswordForm: {
                    description:
                        'Enter your current password and choose a new password.',
                    currentPassword: 'Current Password',
                    newPassword: 'New Password',
                    confirmNewPassword: 'Confirm New Password',
                    passwordMinLength:
                        'Password must be at least 6 characters long.',
                    passwordsMustMatch: 'Passwords must match.',
                    requiredField: 'This field is required.',
                    cancel: 'Cancel',
                    change: 'Change Password',
                    successMessage:
                        'Your password has been successfully changed.'
                },
                DeleteAccountForm: {
                    description:
                        'Please confirm your email and password to delete your account. This action cannot be undone.',
                    email: 'Email',
                    password: 'Password',
                    confirmPassword: 'Confirm Password',
                    invalidEmail: 'Please enter a valid email address.',
                    passwordMinLength:
                        'Password must be at least 6 characters long.',
                    passwordsMustMatch: 'Passwords must match.',
                    requiredField: 'This field is required.',
                    cancel: 'Cancel',
                    delete: 'Delete',
                    successMessage:
                        'Your account has been successfully deleted.'
                }
            },
            Modals: {
                SupportModal: {
                    title: 'Support & Contact Us',
                    description:
                        'If you have any questions or need assistance, please reach out to us through one of the following contact options.',
                    contactTitle: 'General Inquiries',
                    contactDescription:
                        'For general questions or feedback, please contact us at:',
                    advertisingTitle: 'Advertising Inquiries',
                    advertisingDescription:
                        'If you are interested in advertising opportunities, please reach out to us at:'
                },
                ChangePasswordModal: {
                    title: 'Change Password'
                },
                DeleteAccountModal: {
                    title: 'Delete Account'
                }
            },
            General: {
                loading: 'Loading...',
                error: 'Error:',
                somethingWentWrong:
                    'Something went wrong, please try again later',
                profilePreview: 'Profile preview',
                uploadProfilePicture: 'Upload Profile Picture'
            }
        }
    }
};
