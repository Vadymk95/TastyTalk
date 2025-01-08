export const other = {
    Recipe: {
        difficulty: 'Сложность:',
        categories: 'Категории:',
        ingredients: 'Ингредиенты:',
        steps: 'Шаги приготовления:',
        time: 'Время приготовления:',
        video: 'Видео',
        cookingTime:
            'Приготовление блюда займет около <b>~{{count}} минут.</b>',
        tips: 'Советы:',
        warnings: 'Предостережения:',
        generated: 'Создан при помощи чат-бота',
        user: 'Создан вручную'
    },
    Stepper: {
        back: 'Назад',
        skip: 'Пропустить',
        next: 'Далее',
        submit: 'Завершить',
        backToFinalStep: 'Вернуться к последнему шагу',
        completeStep: 'Завершить шаг',
        checkStep: 'Проверить шаг',
        incompleteStep: 'Шаг не завершен',
        completed: 'Завершено',
        step: 'Шаг',
        Steps: {
            Recipe: {
                '1': {
                    title: 'Название и параметры',
                    description:
                        'Шаг 1: Введите название рецепта, выберите сложность, категории и укажите примерное время приготовления.'
                },
                '2': {
                    title: 'Описание рецепта',
                    description:
                        'Шаг 2: Опишите рецепт, чтобы другие пользователи могли понять, почему он уникален или интересен.'
                },
                '3': {
                    title: 'Добавьте фото',
                    description:
                        'Шаг 3: Загрузите изображение, которое будет использоваться как превью рецепта.'
                },
                '4': {
                    title: 'Ингредиенты',
                    description:
                        'Шаг 4: Укажите список всех ингредиентов, необходимых для приготовления рецепта.'
                },
                '5': {
                    title: 'Этапы приготовления',
                    description:
                        'Шаг 5: Опишите шаги, которые нужно выполнить, чтобы приготовить блюдо.'
                },
                '6': {
                    title: 'Советы',
                    description:
                        'Шаг 6: Добавьте полезные советы, которые помогут улучшить процесс приготовления.'
                },
                '7': {
                    title: 'Предостережения',
                    description:
                        'Шаг 7: Укажите важные предостережения, например, возможные аллергены или особенности рецепта.'
                },
                '8': {
                    title: 'Видео',
                    description:
                        'Шаг 8: Добавьте ссылку на видео(YouTube), показывающее, как готовить блюдо.'
                },
                '9': {
                    title: 'Подтверждение',
                    description:
                        'Шаг 9: Просмотрите введенные данные, чтобы убедиться, что всё правильно, перед публикацией рецепта.'
                }
            },
            MealPlan: {}
        }
    },
    Categories: {
        dishType: 'Типы блюд',
        worldCuisine: 'Мировая кухня',
        dietaryPreference: 'Диетические предпочтения',
        cookingFeatures: 'Особенности приготовления',
        spiciness: 'Острота',
        DishType: {
            breakfast: 'Завтраки',
            soups: 'Супы',
            salads: 'Салаты',
            main_dishes: 'Основные блюда',
            side_dishes: 'Гарниры',
            desserts: 'Десерты',
            baking: 'Выпечка',
            drinks: 'Напитки',
            snacks: 'Закуски',
            sauces: 'Соусы и дипы'
        },
        WorldCuisine: {
            italian: 'Итальянская кухня',
            asian: 'Азиатская кухня',
            french: 'Французская кухня',
            american: 'Американская кухня',
            ukrainian: 'Украинская кухня',
            russian: 'Русская кухня',
            mediterranean: 'Средиземноморская кухня',
            eastern: 'Восточная кухня',
            latin: 'Латиноамериканская кухня'
        },
        DietaryPreference: {
            vegetarian: 'Вегетарианское',
            vegan: 'Веганское',
            gluten_free: 'Безглютеновое',
            sugar_free: 'Без сахара',
            for_allergy_sufferers: 'Для аллергиков',
            lent: 'Постное'
        },
        CookingFeatures: {
            quick: 'Быстрое (до 15 минут)',
            medium: 'Среднее (15-60 минут)',
            long: 'Долгое (более 60 минут)',
            budget: 'Экономичное',
            beginner_friendly: 'Для начинающих',
            kids_friendly: 'Детское меню',
            party: 'Для праздника'
        },
        Spiciness: {
            spicy: 'Острое',
            medium_spicy: 'Средне острое',
            not_spicy: 'Не острое'
        }
    },
    Pricing: {
        title: 'Наши тарифные планы',
        yourPlan: 'Ваш текущий план',
        free: {
            title: 'Бесплатный',
            price: 'Бесплатно',
            feature1: 'Доступ к 10 рецептам',
            feature2: 'Основные функции сообщества',
            feature3: 'Ограниченная поддержка',
            button: 'Получить Бесплатно'
        },
        basic: {
            title: 'Базовый',
            price: '5$/месяц',
            feature1: 'Доступ к 50 рецептам',
            feature2: 'Базовые планы питания',
            feature3: 'Поддержка сообщества',
            button: 'Выбрать Базовый'
        },
        standard: {
            title: 'Стандарт',
            price: '10$/месяц',
            feature1: 'Доступ к 200 рецептам',
            feature2: 'Стандартные планы питания',
            feature3: 'Приоритетная поддержка',
            button: 'Выбрать Стандарт'
        },
        premium: {
            title: 'Премиум',
            price: '20$/месяц',
            feature1: 'Неограниченный доступ к рецептам',
            feature2: 'Индивидуальные планы питания',
            feature3: 'Личная консультация',
            button: 'Выбрать Премиум'
        }
    },
    Rules: {
        description:
            'Пожалуйста, внимательно ознакомьтесь с правилами сообщества TastyTalks перед публикацией контента (рецептов и планов питания) и использованием информации, предоставленной другими пользователями или ИИ:',
        rule1: 'Уважайте других участников сообщества. Оскорбительный или дискриминационный язык запрещен.',
        rule2: 'Не публикуйте личную или конфиденциальную информацию о себе или других.',
        rule3: 'Убедитесь, что рецепты и планы питания, которые вы публикуете, не нарушают авторские права.',
        rule4: 'Не публикуйте вводящие в заблуждение или вредные советы по питанию. Всегда консультируйтесь с профессионалами по медицинским и диетическим вопросам.',
        rule5: 'Сообщайте администраторам о неподобающем или вредном контенте.',
        rule6: 'Платформа не несет ответственности за точность информации, публикуемой пользователями. Используйте рецепты и советы по питанию на свое усмотрение.',
        rule7: 'Платформа не гарантирует, что советы по питанию или здоровью подходят для ваших нужд. Всегда консультируйтесь с сертифицированным специалистом перед изменением диеты.',
        rule8: 'Платформа не может быть использована для незаконных действий, таких как спам, мошенничество или вредоносное ПО.',
        rule9: 'Запрещено массовое продвижение и реклама без предварительного согласования с администрацией.',
        rule10: 'Пользователи несут ответственность за законность и точность публикуемого контента.',
        rule11: 'Администрация оставляет за собой право удалять аккаунты за нарушение правил.',
        rule12: 'Использование Платформы разрешено только лицам старше 13 лет. Для лиц младше 18 лет требуется согласие родителей или опекунов.',
        rule13: 'Пользователи обязаны соблюдать законы своей страны при использовании Платформы.',
        rule14: 'Администрация оставляет за собой право изменять правила и уведомлять пользователей об изменениях.',
        rule15: 'Пользователи могут добавлять ссылки на внешние ресурсы, такие как YouTube-видео и профили в социальных сетях, только если они имеют право на их публикацию. Администрация оставляет за собой право удалять ссылки, нарушающие правила платформы или законы.'
    },
    Privacy: {
        description:
            'Пожалуйста, внимательно ознакомьтесь с нашей Политикой конфиденциальности, которая описывает, как мы собираем, используем и защищаем ваши данные.',
        rule1: 'Мы собираем личную информацию, такую как имя, email и данные аккаунта, только с вашего согласия.',
        rule2: 'Мы используем собранные данные для регистрации, авторизации, отправки уведомлений и улучшения работы платформы.',
        rule3: 'Мы используем cookie-файлы для анализа поведения пользователей и персонализации контента.',
        rule4: 'Ваши данные хранятся в защищённых системах и не передаются третьим лицам без вашего согласия.',
        rule5: 'Вы можете запросить доступ к своим данным, их удаление или изменение в любое время.',
        rule6: 'Данные хранятся не дольше, чем это необходимо для выполнения целей их обработки.',
        rule7: 'Платформа предназначена для пользователей старше 13 лет. Для детей младше 18 лет требуется согласие родителей или опекунов.',
        rule8: 'Мы оставляем за собой право изменять Политику конфиденциальности и уведомлять пользователей об изменениях.',
        rule9: 'При добавлении ссылок на внешние ресурсы (например, YouTube-видео или профили в соцсетях), администрация не собирает и не обрабатывает данные, содержащиеся в этих ссылках. Пользователи несут ответственность за их корректность и законность.'
    },
    General: {
        ok: 'Ок',
        loading: 'Загрузка...',
        error: 'Ошибка:',
        close: 'Закрыть',
        cancel: 'Отмена',
        somethingWentWrong: 'Что-то пошло не так, попробуйте позже',
        notAvailable: 'Недоступно',
        yourQueryTitle: 'Ваш запрос',
        invalidYouTubeUrl: 'Неверная ссылка на YouTube',
        easy: 'Легко',
        medium: 'Средне',
        hard: 'Сложно',
        search: 'Поиск...',
        removePhoto: 'Удалить фото',
        profilePhoto: 'Фото профиля',
        noImage: 'Нет фото',
        settings: 'Настройки',
        confirm: 'Подтвердить',
        selectAll: 'Выбрать всеx',
        apply: 'Применить',
        noResultsFound: 'Ничего не найдено',
        requiredField: 'Это поле обязательно',
        back: 'Назад',
        follow: 'Подписаться',
        unfollow: 'Отписаться',
        clickHere: 'Нажмите сюда',
        or: 'Или',
        selected: 'Выбрано',
        oops: 'Упс!',
        enterPhoneNumber: 'Введите номер телефона',
        send: 'Отправить'
    }
};
