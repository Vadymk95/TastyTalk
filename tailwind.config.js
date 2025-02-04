/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'Nunito', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
                body: ['Nunito', 'sans-serif']
            },
            colors: {
                primary: {
                    DEFAULT: '#FF7F6B',
                    dark: '#D45D5D',
                    light: '#FF8787'
                },
                secondary: {
                    DEFAULT: '#4ECDC4',
                    dark: '#3EB5B0',
                    light: '#66D5D1'
                },
                accent: {
                    DEFAULT: '#FFDB6D',
                    dark: '#FFD835',
                    light: '#FFF18D'
                },
                neutral: {
                    light: '#F7F7F7',
                    DEFAULT: '#E5E5E5',
                    dark: '#333333'
                },
                category: {
                    dishType: '#BFDBFE',
                    dishTypeText: '#1E40AF',
                    worldCuisine: '#FECACA',
                    worldCuisineText: '#B91C1C',
                    dietaryPreference: '#D1FAE5',
                    dietaryPreferenceText: '#065F46',
                    cookingFeatures: '#FEF3C7',
                    cookingFeaturesText: '#B45309',
                    spiciness: '#E9D5FF',
                    spicinessText: '#6B21A8',
                    defaultBg: '#F3F4F6',
                    defaultText: '#1F2937'
                }
            },
            boxShadow: {
                'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
                'custom-dark': '0 -4px 6px rgba(0, 0, 0, 0.1)'
            },
            backgroundImage: (theme) => ({
                'gradient-main':
                    'linear-gradient(135deg, #FF8573 0%, #4ECDC4 100%)'
            }),
            fontSize: {
                xs: '0.75rem', // 12px
                sm: '0.875rem', // 14px
                base: '1rem', // 16px (default)
                lg: '1.125rem', // 18px
                xl: '1.25rem', // 20px
                '2xl': '1.5rem', // 24px
                '3xl': '1.875rem', // 30px
                '4xl': '2.25rem', // 36px
                '5xl': '3rem', // 48px
                '6xl': '3.75rem', // 60px
                '7xl': '4.5rem' // 72px
            },
            screens: {
                xs: { max: '480px' },
                sm: { max: '640px' },
                md: { max: '768px' },
                lg: { max: '1024px' },
                xl: { max: '1280px' },
                '2xl': { max: '1536px' }
            },
            spacing: {
                1: '0.25rem', // 4px
                2: '0.5rem', // 8px
                3: '0.75rem', // 12px
                4: '1rem', // 16px
                5: '1.25rem', // 20px
                6: '1.5rem', // 24px
                8: '2rem', // 32px
                10: '2.5rem', // 40px
                12: '3rem', // 48px
                13: '3.25rem', // 52px
                14: '3.5rem', // 56px
                15: '3.75rem', // 60px
                16: '4rem', // 64px
                17: '4.25rem', // 68px
                18: '4.5rem', // 72px
                19: '4.75rem', // 76px
                20: '5rem', // 80px
                24: '6rem', // 96px
                32: '8rem', // 128px
                40: '10rem', // 160px
                48: '12rem', // 192px
                56: '14rem', // 224px
                64: '16rem' // 256px
            },
            maxWidth: {
                xs: '20rem', // 320px
                sm: '24rem', // 384px
                md: '28rem', // 448px
                lg: '32rem', // 512px
                xl: '36rem', // 576px
                '2xl': '42rem', // 672px
                '3xl': '48rem', // 768px
                '4xl': '56rem', // 896px
                '5xl': '64rem', // 1024px
                '6xl': '72rem', // 1152px
                '7xl': '80rem' // 1280px
            },
            animation: {
                'spin-slow': 'spin 2s linear infinite'
            }
        }
    },
    plugins: []
};
