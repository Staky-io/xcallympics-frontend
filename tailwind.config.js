/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin'

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        screens: {
            xxs: '360px',
            xs: '472px',
            s: '640px',
            m: '768px',
            l: '1024px',
            xl: '1280px',
            xxl: '1680px'
        },
        colors: {
            disabled: '#3A4455',
            grey: {
                DEFAULT: '#F9FAFF',
                secondary: '#637592',
                tertiary: '#B6BFCD'
            },
            black: {
                DEFAULT: '#080A0C',
                secondary: '#111318',
                tertiary: '#191D24',
                quaternary: '#242932'
            },
            primary: {
                DEFAULT: '#3D6EFF',
                light: '#ADC8FF',
                dark: '#1939B7'
            },
            info: {
                DEFAULT: '#00C1FF',
                light: '#C2F0FF',
                dark: '#0070B7'
            },
            warning: {
                DEFAULT: '#FFC400',
                light: '#FFEBAD',
                dark: '#B78401'
            },
            error: {
                DEFAULT: '#E03232',
                light: '#FBC1AD',
                dark: '#A11930'
            },
            success: {
                DEFAULT: '#00DBB6',
                light: '#99FFC6',
                dark: '#009093'
            }
        },
        // Tailwind Utility : tracking-
        letterSpacing: {
            0: '0.0px',
            1: '1.0px',
            2: '2.0px'
        },
        // Tailwind Utility : leading-
        lineHeight: {
            none: '1',
            tight: '1.25',
            regular: '1.5',
            wide: '1.75',
            double: '2',
            20: '2.0rem',
            25: '2.5rem',
            35: '3.5rem',
            50: '5.0rem'
        },
        fontSize: {
            0: '0.0rem',
            10: '0.625rem',
            12: '0.75rem',
            14: '0.875rem',
            16: '1rem',
            18: '1.125rem',
            20: '1.25rem',
            24: '1.5rem',
            32: '2rem',
            40: '2.5rem',
            48: '3rem',
            60: '3.75rem',
            72: '4.5rem',
            84: '5.25rem',
            96: '6rem'
        },
        fontWeight: {
            thin: '100',
            extralight: '200',
            light: '300',
            regular: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900'
        },
        borderRadius: {
            DEFAULT: '0.75rem',
            inherit: 'inherit',
            full: '9999px',
            0: '0.0px',
            5: '0.3125rem',
            10: '0.625rem',
            15: '0.9375rem',
            20: '1.25rem',
            30: '1.875rem',
            40: '2.5rem'
        },
        // Tailwind Utility : border-, border-t- etc.
        borderWidth: {
            DEFAULT: '1px',
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            6: '6px',
            8: '8px'
        },
        opacity: {
            inherit: 'inherit',
            0: '0.00',
            5: '0.05',
            10: '0.10',
            15: '0.15',
            20: '0.20',
            25: '0.25',
            30: '0.30',
            35: '0.35',
            40: '0.40',
            45: '0.45',
            50: '0.50',
            55: '0.55',
            60: '0.60',
            65: '0.65',
            70: '0.70',
            75: '0.75',
            80: '0.80',
            85: '0.85',
            90: '0.90',
            95: '0.95',
            100: '0.99'
        },
        spacing: {
            none: 'none',
            auto: 'auto',
            full: '100%',
            'screen-w': '100vw',
            'screen-h': '100vh',

            // Rem
            0: '0rem',
            1: '0.0625rem',
            2: '0.125rem',
            4: '0.25rem',
            6: '0.375rem',
            8: '0.5rem',
            10: '0.625rem',
            12: '0.75rem',
            16: '1rem',
            20: '1.25rem',
            24: '1.5rem',
            32: '2rem',
            40: '2.5rem',
            48: '3rem',
            56: '3.5rem',
            60: '3.75rem',
            72: '4.5rem',
            84: '5.25rem',
            96: '6rem',
            112: '7rem',
            128: '8rem',
            144: '9rem',
            160: '10rem',
            192: '12rem',
            224: '14rem',
            256: '16rem',
            288: '18rem',
            320: '20rem',
            384: '24rem',
            448: '28rem',
            512: '32rem',
            576: '36rem',
            604: '37.75rem',
            640: '40rem',
            672: '42rem',
            768: '48rem',
            896: '56rem',
            960: '60rem',
            1024: '64rem',
            1152: '72rem',

            // Percentages
            '1/2': '50%',
            '1/3': '33.333333%',
            '2/3': '66.666667%',
            '1/4': '25%',
            '2/4': '50%',
            '3/4': '75%',
            '1/5': '20%',
            '2/5': '40%',
            '3/5': '60%',
            '4/5': '80%',
            '1/6': '16.666667%',
            '2/6': '33.333333%',
            '3/6': '50%',
            '4/6': '66.666667%',
            '5/6': '83.333333%',
            '1/12': '8.333333%',
            '2/12': '16.666667%',
            '3/12': '25%',
            '4/12': '33.333333%',
            '5/12': '41.666667%',
            '6/12': '50%',
            '7/12': '58.333333%',
            '8/12': '66.666667%',
            '9/12': '75%',
            '10/12': '83.333333%',
            '11/12': '91.666667%'
        },
        // Tailwind Utility : min-w-
        minWidth: (theme) => theme('spacing'),
        // Tailwind Utility : w-
        width: (theme) => theme('spacing'),
        // Tailwind Utility : max-w-
        maxWidth: (theme, { breakpoints }) => ({
            ...theme('spacing'),
            ...breakpoints(theme('screens'))
        }),
        // Tailwind Utility : min-h-
        minHeight: (theme) => theme('spacing'),
        // Tailwind Utility : h-
        height: (theme) => theme('spacing'),
        // Tailwind Utility : max-h-
        maxHeight: (theme) => theme('spacing'),
        // Tailwind Utility : p-
        padding: (theme) => theme('spacing'),
        // Tailwind Utility : m-
        margin: (theme, { negative }) => ({
            ...theme('spacing'),
            ...negative(theme('spacing'))
        }),
        // Tailwind Utility : z-
        zIndex: {
            auto: 'auto',
            '-1': '-1',
            0: '0',
            1: '1',
            10: '10',
            20: '20',
            30: '30',
            40: '40',
            50: '50',
            60: '60',
            70: '70',
            80: '80',
            90: '90',
            100: '100'
        },
        // Tailwind Utility : transform & scale-
        scale: {
            0: '0',
            50: '.5',
            75: '.75',
            90: '.9',
            95: '.95',
            100: '1',
            105: '1.05',
            110: '1.1',
            125: '1.25',
            150: '1.5'
        },
        // Tailwind Utility : transform & rotate-, -rotate- etc.
        rotate: {
            '-180': '-180deg',
            '-135': '-135deg',
            '-90': '-90deg',
            '-45': '-45deg',
            0: '0',
            45: '45deg',
            90: '90deg',
            135: '135deg',
            180: '180deg'
        },
        // Tailwind Utility : transform & skew-, -skew- etc.
        skew: {
            '-12': '-12deg',
            '-6': '-6deg',
            '-3': '-3deg',
            0: '0',
            3: '3deg',
            6: '6deg',
            12: '12deg'
        },
        // Tailwind Utility : transform & translate-, -translate- etc.
        translate: (theme, { negative }) => ({
            ...theme('spacing'),
            ...negative(theme('spacing')),
            '-full': '-100%',
            '-1/2': '-50%'
        }),
        // Tailwind Utility : transition-
        transitionProperty: {
            DEFAULT: 'background-color, color, opacity, transform',
            all: 'all',
            none: 'none',
            color: 'color',
            background: 'background-color',
            border: 'border-color, border-opacity',
            width: 'width',
            height: 'height',
            size: 'width, height',
            opacity: 'opacity',
            transform: 'transform',
            composite: 'opacity, transform'
        },
        // Tailwind Utility : ease-
        transitionTimingFunction: {
            linear: 'linear',
            ease: 'cubic-bezier(.54, .1, 0, .99)',
            reveal: 'cubic-bezier(.5, 0, 0, 1.5)',
            in: 'cubic-bezier(0.4, 0, 1, 1)',
            out: 'cubic-bezier(0, 0, 0.2, 1)',
            'in-sine': 'cubic-bezier(0.47, 0, 0.745, 0.715)',
            'in-quad': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
            'in-cubic': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            'in-quart': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
            'in-quint': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
            'in-circ': 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
            'in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
            'out-sine': 'cubic-bezier(0.39, 0.575, 0.565, 1)',
            'out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
            'out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
            'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
            'out-circ': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
            'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'in-out-sine': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
            'in-out-quad': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
            'in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
            'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
            'in-out-quint': 'cubic-bezier(0.86, 0, 0.07, 1)',
            'in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
            'in-out-circ': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
            'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        },
        // Tailwind Utility : duration-
        transitionDuration: {
            0: '0ms',
            100: '100ms',
            200: '200ms',
            250: '250ms',
            300: '300ms',
            400: '400ms',
            500: '500ms',
            750: '750ms',
            1000: '1000ms',
            2000: '2000ms',
            5000: '5000ms'
        },
        // Tailwind Utility : delay-
        transitionDelay: (theme) => ({
            ...theme('transitionDuration')
        }),
        extend: {
            fontFamily: {
                notoSans: ['var(--font-noto-sans)']
            }
        }
    },
    plugins: [
        plugin(({ addUtilities, theme }) => {
            addUtilities({
                ...Object.entries(theme('colors'))
                    .map(([name, value]) => ({
                        [`.border-b-${name}`]: { borderBottomColor: value },
                        [`.border-t-${name}`]: { borderTopColor: value },
                        [`.border-l-${name}`]: { borderLeftColor: value },
                        [`.border-r-${name}`]: { borderRightColor: value }
                    }))
                    .reduce((accu, curr) => ({ ...accu, ...curr }), {}),
                '.position-full': {
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    width: '100%',
                    height: '100%'
                },
                '.text-ellipsis': { textOverflow: 'ellipsis' },
                '.will-change-all': { willChange: 'opacity, transform' },
                '.will-change-opacity': { willChange: 'opacity' },
                '.will-change-transform': { willChange: 'transform' }
            })
            addUtilities({
                '.filter-none': { filter: 'none' },
                '.filter-grayscale': { filter: 'grayscale(100%)' },
                '.filter-shadow-primary': { filter: 'drop-shadow(0px 0px 50px #2A4E94)' },
                '.cursor-grab': { cursor: 'grab' },
                '.cursor-grabbing': { cursor: 'grabbing' }
            }, ['hover'])
            addUtilities({
                '.grid-row': { display: 'grid', gridAutoFlow: 'row' },
                '.grid-col': { display: 'grid', gridAutoFlow: 'column' }
            }, ['responsive'])
        })
    ]
}
