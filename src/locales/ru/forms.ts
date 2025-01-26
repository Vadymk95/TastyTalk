export const forms = {
    Forms: {
        LoginForm: {
            actionSignUp: 'Зарегистрироваться',
            signIn: 'Войти',
            dontHaveAccount: 'У вас еще нет аккаунта?',
            login: 'Логин',
            loginDescription:
                '*Введите имя пользователя, email или номер телефона в международном формате (начиная с "+").',
            password: 'Пароль',
            requiredField: 'Это поле обязательно',
            emailNotValid: 'Email не валидный',
            passwordMinLength: 'Пароль должен быть не менее 6 символов',
            signInWithGoogle: 'Войти через Google',
            forgotPassword: 'Забыли пароль?'
        },
        RegisterForm: {
            signUp: 'Регистрация',
            email: 'Email',
            enterNumber: 'Введите номер телефона',
            username: 'Имя пользователя',
            firstName: 'Имя',
            lastName: 'Фамилия',
            password: 'Пароль',
            confirmPassword: 'Подтвердите пароль',
            verificationMethodTitle: 'Способ подтверждения',
            viaPhone: 'Телефон',
            viaEmail: 'Email',
            usernameInvalid:
                'Имя пользователя может содержать только буквы, цифры и подчеркивания',
            usernameMustContainLetter:
                'Имя пользователя должно содержать хотя бы одну букву',
            firstNameInvalid: 'Имя может содержать только буквы',
            lastNameInvalid: 'Фамилия может содержать только буквы',
            passwordComplexity:
                'Пароль должен содержать как минимум одну букву и одну цифру',
            actionSignIn: 'Войти',
            firstNameMinLength: 'Имя должно быть не менее 2 символа',
            firstNameMaxLength: 'Имя должно быть не более 16 символов',
            usernameMinLength:
                'Имя пользователя должно быть не менее 4 символов',
            usernameMaxLength:
                'Имя пользователя должно быть не более 16 символов',
            lastNameMinLength: 'Фамилия должна быть не менее 2 символа',
            lastNameMaxLength: 'Фамилия должно быть не более 16 символов',
            requiredField: 'Это поле обязательно',
            emailNotValid: 'Email не валидный',
            emailMinLength: 'Email должен быть не менее 6 символов',
            emailMaxLength: 'Email должен быть не более 50 символов',
            phoneNumberNotValid: 'Номер телефона не валидный',
            passwordMinLength: 'Пароль должен быть не менее 6 символов',
            passwordsMustMatch: 'Пароли должны совпадать',
            enterYourEmail: 'Введите ваш email',
            enterYourName: 'Введите ваше имя',
            enterYourLastName: 'Введите вашу фамилию',
            haveAccount: 'Уже есть аккаунт?',
            registerFinish: 'Завершите процесс регистрации',
            selectVerificationMethod: 'Выберите способ подтверждения'
        },
        EditProfileForm: {
            firstName: 'Имя',
            lastName: 'Фамилия',
            username: 'Имя пользователя',
            email: 'Email',
            phoneNumber: 'Номер телефона',
            phoneNumberNotValid: 'Номер телефона не валидный',
            nameCheckboxLabel: 'Отображать имя и фамилию в профиле',
            countryCheckboxLabel: 'Отображать страну в профиле',
            usernameInvalid:
                'Имя пользователя может содержать только буквы, цифры и подчеркивания',
            usernameMustContainLetter:
                'Имя пользователя должно содержать хотя бы одну букву',
            firstNameInvalid: 'Имя может содержать только буквы',
            lastNameInvalid: 'Фамилия может содержать только буквы',
            firstNameMinLength: 'Имя должно быть не менее 2 символа',
            firstNameMaxLength: 'Имя должно быть не более 16 символов',
            usernameMinLength:
                'Имя пользователя должно быть не менее 4 символов',
            usernameMaxLength:
                'Имя пользователя должно быть не более 16 символов',
            lastNameMinLength: 'Фамилия должна быть не менее 2 символа',
            lastNameMaxLength: 'Фамилия должно быть не более 16 символов',
            requiredField: 'Это поле обязательно',
            personalInfo: 'Личная информация',
            additionalInfo: 'Дополнительная информация',
            bio: 'О себе',
            bioMaxLength: 'Максимум 200 символов',
            country: 'Страна',
            selectCountry: 'Выберите страну',
            socialNetworks: 'Социальные сети',
            socialNetworksDescription:
                '(Добавьте ссылки на ваши социальные сети чтобы другие пользователи могли узнать больше о вас)',
            socialNetworkName: 'Название соц. сети',
            socialNetworkNameMinLength:
                'Название соц. сети должно быть не менее 2 символов',
            socialNetworkNameMaxLength:
                'Название соц. сети должно быть не более 16 символов',
            socialNetworkProfileNameMinLength:
                'Имя профиля должно быть не менее 2 символов',
            socialNetworkProfileNameMaxLength:
                'Имя профиля должно быть не более 16 символов',
            socialNetworkUsername: 'Имя профиля',
            socialNetworkPlaceholder: 'Например: Youtube',
            socialNetworkUsernamePlaceholder: 'Например: @tasty_talks',
            socialNetworkNameRequired: 'Название соц. сети обязательно',
            socialNetworkUsernameRequired: 'Это поле обязательно',
            maxSocialNetworks: 'Максимум 5 соц. сетей',
            addSocialNetwork: 'Добавить соц. сеть',
            save: 'Сохранить изменения',
            successMessage: 'Изменения сохранены'
        },
        EditEmailForm: {
            description:
                'Введите новый email и ваш текущий пароль для подтверждения изменений.',
            editEmail: 'Ваш email',
            editEmailPlaceholder: 'Введите ваш Email',
            newEmail: 'Новый email',
            newEmailPlaceholder: 'Введите ваш новый Email',
            emailNotValid: 'Email не валидный',
            emailMinLength: 'Email должен быть не менее 6 символов',
            emailMaxLength: 'Email должен быть не более 50 символов',
            successMessage: 'Изменения сохранены. Письмо повторно отправлено.',
            password: 'Пароль',
            passwordMinLength: 'Пароль должен быть не менее 6 символов',
            requiredField: 'Это поле обязательно'
        },
        EditPhoneNumberForm: {
            description:
                'Введите новый номер телефона и ваш текущий пароль для подтверждения изменений.',
            editPhoneNumber: 'Ваш номер телефона',
            newPhoneNumber: 'Новый номер телефона',
            successMessage: 'Изменения сохранены. Код повторно отправлен.',
            password: 'Пароль',
            passwordMinLength: 'Пароль должен быть не менее 6 символов',
            requiredField: 'Это поле обязательно',
            phoneNumberNotValid: 'Номер телефона не валидный'
        },
        PhoneVerificationForm: {
            codeLength: 'Код должен быть длиной 6 символов',
            typeCode: 'Введите код'
        },
        ChangePasswordForm: {
            description: 'Введите ваш текущий пароль и выберите новый пароль.',
            currentPassword: 'Текущий пароль',
            newPassword: 'Новый пароль',
            confirmNewPassword: 'Подтвердите новый пароль',
            passwordMinLength: 'Пароль должен быть не менее 6 символов.',
            passwordsMustMatch: 'Пароли должны совпадать.',
            requiredField: 'Это поле обязательно',
            cancel: 'Отмена',
            change: 'Изменить пароль',
            successMessage:
                'Ваш пароль успешно изменен. Пожалуйста, войдите снова.'
        },
        DeleteAccountForm: {
            description:
                'Вы уверены, что хотите удалить свою учетную запись? Это действие нельзя отменить.',
            email: 'Email',
            password: 'Пароль',
            confirmPassword: 'Подтвердите пароль',
            invalidEmail: 'Неверный email.',
            passwordMinLength: 'Пароль должен быть не менее 6 символов',
            passwordsMustMatch: 'Пароли должны совпадать',
            requiredField: 'Это поле обязательно',
            cancel: 'Отмена',
            delete: 'Удалить',
            successMessage:
                'Ваша учетная запись успешно удалена. Мы будем скучать по вам!'
        },
        CreateRecipeWithAIForm: {
            label: 'Что потребуется для блюда?',
            tooShort: 'Запрос слишком короткий',
            tooLong: 'Запрос слишком длинный',
            placeholder:
                'Напишите название блюда или перечислите ингредиенты. Например: у меня есть 2 яйца и немного молока, что я могу приготовить с этим?...',
            find: 'Найти рецепт',
            requiredField: 'Это поле обязательно',
            saveRecipe: 'Сохранить рецепт',
            saveRecipeDescription: 'Сохранить рецепт в своем профиле',
            tryAnother: 'Попробовать другой рецепт',
            tryAnotherDescription: 'Удалить текущий рецепт и начать заново',
            disclaimer:
                'Обратите внимание: сгенерированные данные могут содержать ошибки. Используйте их с осторожностью. Мы не несем ответственности за их использование.'
        },
        CreateRecipeManuallyForm: {
            requiredField: 'Это поле обязательно',
            min: 'Минимум 3 символа',
            max: 'Максимум 50 символов',
            invalidCookingTime: 'Пожалуйста, введите число от 1 до 999',
            title: 'Название рецепта',
            difficulty: 'Сложность приготовления',
            difficultyPlaceholder: 'Выберите сложность',
            categories: 'Категории',
            categoriesPlaceholder: 'Выберите категории',
            cookingTime: 'Приблизительное время приготовления (в минутах)',
            cookingTimePlaceholder: 'Введите время приготовления',
            description: 'Описание',
            descriptionPlaceholder:
                'Опишите рецепт, чтобы другие пользователи могли понять, почему он уникален или интересен',
            descriptionHelpText:
                'Описание помогает другим пользователям понять, чем ваш рецепт особенный. Это может быть ваша личная находка, семейный секрет или просто идея, которую вы хотите передать!',
            previewPhotoPlaceholder:
                'Перетащите фото сюда или нажмите для загрузки',
            previewPhotoHelpText:
                'Загрузите фотографию, которая станет превью вашего рецепта. Она поможет другим пользователям понять, как выглядит блюдо, и сделает ваш рецепт привлекательнее!',
            invalidFileType:
                'Неверный тип файла. Пожалуйста, загрузите изображение в формате JPG, JPEG, PNG, WEBP',
            fileTooLarge:
                'Файл слишком большой. Максимальный размер файла - 5 МБ',
            maxIngredients: 'Максимум 30 ингредиентов',
            ingredient: 'Ингредиент',
            ingredientPlaceholder: 'Введите ингредиент',
            addIngredient: 'Добавить ингредиент',
            ingredientsCategory: 'Категория ингредиентов',
            addCategoryIngredients: 'Добавить категорию ингредиентов',
            categoryIngredientsPlaceholder: 'Введите категорию ингредиентов',
            subIngredientPlaceholder: 'Введите ингредиент',
            addSubIngredient: 'Добавить ингредиент в категорию',
            subIngredient: 'Ингредиент в категории',
            step: 'Шаг',
            stepPlaceholder: 'Введите шаг',
            maxSteps: 'Максимум 20 шагов',
            addStep: 'Добавить шаг',
            tip: 'Совет',
            tipPlaceholder: 'Введите совет',
            maxTips: 'Максимум 10 советов',
            addTip: 'Добавить совет',
            warning: 'Предостережение',
            warningPlaceholder: 'Введите предостережение',
            maxWarnings: 'Максимум 10 предостережений',
            addWarning: 'Добавить предостережение',
            videoUrl: 'Ссылка на видео',
            invalidUrl: 'Неверная ссылка',
            videoUrlPlaceholder: 'https://example.com',
            videoUrlPhotoHelpText:
                'Добавьте ссылку на видео(YouTube), чтобы пользователи могли лучше понять процесс приготовления. Видео помогает сделать рецепт более понятным и вдохновляет других попробовать его приготовить!',
            previewRecipe: 'Предпросмотр рецепта'
        },
        ForgotPasswordForm: {
            email: 'Email',
            emailPlaceholder: 'Введите ваш email',
            emailNotValid: 'Email не валидный',
            requiredField: 'Это поле обязательно',
            resetPassword: 'Сбросить пароль',
            successMessage: 'Письмо для сброса пароля отправлено на ваш email',
            errorMessage: 'Что-то пошло не так. Пожалуйста, попробуйте снова.'
        }
    }
};
