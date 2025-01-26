export const forms = {
    Forms: {
        LoginForm: {
            actionSignUp: 'Sign Up',
            signIn: 'Sign In',
            dontHaveAccount: "Don't have an account?",
            login: 'Login',
            loginDescription:
                '*Enter your username, email, or phone number in international format (starting with "+").',
            password: 'Password',
            requiredField: 'This field is required',
            emailNotValid: 'Email is not valid',
            passwordMinLength: 'Password must be at least 6 characters long',
            signInWithGoogle: 'Sign in with Google',
            forgotPassword: 'Forgot your password?'
        },
        RegisterForm: {
            signUp: 'Register',
            email: 'Email',
            enterNumber: 'Enter a number',
            username: 'Username',
            lastName: 'Last Name',
            firstName: 'First Name',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            verificationMethodTitle: 'Choose a verification method',
            viaPhone: 'Phone',
            viaEmail: 'Email',
            usernameInvalid:
                'Username can only contain letters, numbers and underscores',
            usernameMustContainLetter:
                'Username must contain at least one letter',
            firstNameInvalid: 'First name can only contain letters',
            lastNameInvalid: 'Last name can only contain letters',
            passwordComplexity:
                'Password must contain at least one letter and one number',
            actionSignIn: 'Sign In',
            firstNameMinLength: 'First name must be at least 2 character long',
            firstNameMaxLength:
                'First name must be less than 16 characters long',
            usernameMinLength: 'Username must be at least 4 character long',
            usernameMaxLength: 'Username must be less than 16 characters long',
            lastNameMinLength: 'Last name must be at least 2 character long',
            lastNameMaxLength: 'Last name must be less than 16 characters long',
            requiredField: 'This field is required',
            emailNotValid: 'Email is not valid',
            emailMinLength: 'Email must be at least 6 characters long',
            emailMaxLength: 'Email must be less than 50 characters long',
            phoneNumberNotValid: 'Phone number is not valid',
            passwordMinLength: 'Password must be at least 6 characters long',
            passwordsMustMatch: 'Passwords must match',
            enterYourEmail: 'Enter your email',
            enterYourName: 'Enter your name',
            enterYourLastName: 'Enter your last name',
            haveAccount: 'Already have an account?',
            registerFinish: 'Finish your registration process',
            selectVerificationMethod: 'Select a verification method'
        },
        EditProfileForm: {
            firstName: 'First Name',
            lastName: 'Last Name',
            username: 'Username',
            email: 'Email',
            phoneNumber: 'Phone Number',
            phoneNumberNotValid: 'Phone number is not valid',
            nameCheckboxLabel: 'Show name on profile',
            countryCheckboxLabel: 'Show country on profile',
            usernameInvalid:
                'Username can only contain letters, numbers and underscores',
            usernameMustContainLetter:
                'Username must contain at least one letter',
            firstNameInvalid: 'First name can only contain letters',
            lastNameInvalid: 'Last name can only contain letters',
            firstNameMinLength: 'First name must be at least 2 character long',
            firstNameMaxLength:
                'First name must be less than 16 characters long',
            usernameMinLength: 'Username must be at least 4 character long',
            usernameMaxLength: 'Username must be less than 16 characters long',
            lastNameMinLength: 'Last name must be at least 2 character long',
            lastNameMaxLength: 'Last name must be less than 16 characters long',
            requiredField: 'This field is required',
            personalInfo: 'Personal Information',
            additionalInfo: 'Additional Information',
            bio: 'About You',
            bioMaxLength: 'Maximum 200 characters allowed',
            country: 'Country',
            selectCountry: 'Select your country',
            socialNetworks: 'Social Networks',
            socialNetworksDescription:
                '(Add your Social Network profiles to help others find you.)',
            socialNetworkName: 'Social Network Name',
            socialNetworkNameMinLength:
                'Social Network name must be at least 2 character long',
            socialNetworkNameMaxLength:
                'Social Network name must be less than 16 characters long',
            socialNetworkProfileNameMinLength:
                'Username must be at least 2 character long',
            socialNetworkProfileNameMaxLength:
                'Username must be less than 16 characters long',
            socialNetworkUsername: 'Username',
            socialNetworkPlaceholder: 'F.e. Youtube',
            socialNetworkUsernamePlaceholder: 'F.e. @tasty_talks',
            socialNetworkNameRequired: 'Social Network name is required',
            socialNetworkUsernameRequired: 'Username is required',
            maxSocialNetworks: 'You can add up to 5 Social Networks',
            addSocialNetwork: 'Add Social Network',
            save: 'Save Changes',
            successMessage: 'Profile updated successfully'
        },
        EditEmailForm: {
            description:
                'Update your email address to keep your account secure.',
            editEmail: 'Your Email',
            editEmailPlaceholder: 'Enter your Email',
            newEmail: 'New Email',
            newEmailPlaceholder: 'Enter your new Email',
            emailNotValid: 'Email is not valid',
            emailMinLength: 'Email must be at least 6 characters long',
            emailMaxLength: 'Email must be less than 50 characters long',
            successMessage:
                'Email updated successfully. An Email has been sent to your new Email address.',
            password: 'Password',
            passwordMinLength: 'Password must be at least 6 characters long',
            requiredField: 'This field is required'
        },
        EditPhoneNumberForm: {
            description:
                'Update your phone number to keep your account secure.',
            editPhoneNumber: 'Your Phone Number',
            newPhoneNumber: 'New Phone Number',
            successMessage:
                'Phone number updated successfully. A code has been sent to your new phone number.',
            password: 'Password',
            passwordMinLength: 'Password must be at least 6 characters long',
            requiredField: 'This field is required',
            phoneNumberNotValid: 'Phone number is not valid'
        },
        PhoneVerificationForm: {
            codeLength: 'Code must be 6 characters long',
            typeCode: 'Type the code you received'
        },
        ChangePasswordForm: {
            description:
                'Enter your current password and choose a new password.',
            currentPassword: 'Current Password',
            newPassword: 'New Password',
            confirmNewPassword: 'Confirm New Password',
            passwordMinLength: 'Password must be at least 6 characters long.',
            passwordsMustMatch: 'Passwords must match.',
            requiredField: 'This field is required.',
            cancel: 'Cancel',
            change: 'Change Password',
            successMessage: 'Your password has been successfully changed.'
        },
        DeleteAccountForm: {
            description:
                'Please confirm your email and password to delete your account. This action cannot be undone.',
            email: 'Email',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            invalidEmail: 'Please enter a valid email address.',
            passwordMinLength: 'Password must be at least 6 characters long.',
            passwordsMustMatch: 'Passwords must match.',
            requiredField: 'This field is required.',
            cancel: 'Cancel',
            delete: 'Delete',
            successMessage: 'Your account has been successfully deleted.'
        },
        CreateRecipeWithAIForm: {
            label: 'What do you need for the dish?',
            tooShort: 'Query is too short',
            tooLong: 'Query is too long',
            placeholder:
                'Write the name of the dish or list the ingredients. For example: I have 2 eggs and some milk, what can I make with it?...',
            find: 'Find Recipe',
            requiredField: 'This field is required.',
            saveRecipe: 'Save Recipe',
            saveRecipeDescription: 'Save the recipe to your profile',
            tryAnother: 'Try Another',
            tryAnotherDescription:
                'Remove current recipe and create a new one with our chatbot',
            disclaimer:
                'Please note: The generated data may contain errors. Use it with caution. We do not take responsibility for its usage.'
        },
        CreateRecipeManuallyForm: {
            requiredField: 'This field is required',
            min: 'Minimum 3 characters',
            max: 'Maximum 50 characters',
            invalidCookingTime:
                'Please enter a cooking time between 1 and 999.',
            title: 'Recipe Title',
            difficulty: 'Difficulty',
            difficultyPlaceholder: 'Select difficulty',
            categories: 'Categories',
            categoriesPlaceholder: 'Select categories',
            cookingTime: 'Approximate Cooking Time (in minutes)',
            cookingTimePlaceholder: 'Enter cooking time',
            description: 'Description',
            descriptionPlaceholder: 'Write a brief description of your recipe',
            descriptionHelpText:
                'The description helps others understand what makes your recipe special. It could be a personal twist, a family tradition, or just an idea you’d like to share!',
            previewPhotoPlaceholder:
                'Drag and drop a photo here or click to upload',
            previewPhotoHelpText:
                'Upload a photo that will become the preview for your recipe. It helps others see what the dish looks like and makes your recipe more appealing!',
            invalidFileType: 'Invalid file type. Please upload an image file.',
            fileTooLarge:
                'File is too large. Please upload an image file smaller than 5MB.',
            maxIngredients: 'You can add up to 30 ingredients',
            ingredient: 'Ingredient',
            ingredientPlaceholder: 'Enter ingredient',
            addIngredient: 'Add Ingredient',
            ingredientsCategory: 'Ingredients Category',
            addCategoryIngredients: 'Add Ingredient Category',
            categoryIngredientsPlaceholder: 'Enter category name',
            subIngredientPlaceholder: 'Enter ingredient',
            addSubIngredient: 'Add Ingredient to Category',
            subIngredient: 'Ingredient to Category',
            step: 'Step',
            stepPlaceholder: 'Enter Step',
            maxSteps: 'You can add up to 20 steps',
            addStep: 'Add Step',
            tip: 'Tip',
            tipPlaceholder: 'Enter tip',
            maxTips: 'You can add up to 10 tips',
            addTip: 'Add Tip',
            warning: 'Warning',
            warningPlaceholder: 'Enter warning',
            maxWarnings: 'You can add up to 10 warnings',
            addWarning: 'Add Warning',
            videoUrl: 'Video URL',
            invalidUrl: 'Invalid URL',
            videoUrlPlaceholder: 'https://example.com',
            videoUrlPhotoHelpText:
                'Add a video link(YouTube) to help users better understand the cooking process. A video makes your recipe clearer and inspires others to try making it!',
            previewRecipe: 'Preview Recipe'
        },
        ForgotPasswordForm: {
            email: 'Email',
            emailPlaceholder: 'Enter your email',
            emailNotValid: 'Email is not valid',
            requiredField: 'This field is required',
            resetPassword: 'Reset Password',
            successMessage: 'An email has been sent to reset your password.',
            errorMessage: 'Failed to send reset email. Please try again.'
        }
    }
};
