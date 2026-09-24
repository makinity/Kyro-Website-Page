import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            // ── KyroPad Cyberpunk Design Tokens ──────────────────────────────
            colors: {
                kyro: {
                    // Backgrounds
                    bg:       '#0d0d0d',
                    surface:  '#111318',
                    card:     '#161926',
                    border:   '#1e2537',

                    // Accent
                    cyan:     '#00e5ff',
                    'cyan-dim': '#00b8cc',
                    'cyan-glow': 'rgba(0, 229, 255, 0.15)',

                    // Text
                    primary:  '#f0f0f0',
                    muted:    '#7a8a9a',
                    subtle:   '#4a5568',

                    // Status
                    success:  '#00ff88',
                    warning:  '#ffaa00',
                    danger:   '#ff4455',

                    // Pro badge
                    pro:      '#ffd700',
                },
            },

            fontFamily: {
                sans:     ['Inter', ...defaultTheme.fontFamily.sans],
                heading:  ['Space Grotesk', ...defaultTheme.fontFamily.sans],
            },

            boxShadow: {
                'cyan-sm': '0 0 10px rgba(0, 229, 255, 0.25)',
                'cyan-md': '0 0 20px rgba(0, 229, 255, 0.35)',
                'cyan-lg': '0 0 40px rgba(0, 229, 255, 0.45)',
                'card':    '0 4px 24px rgba(0, 0, 0, 0.6)',
            },

            backgroundImage: {
                'grid-pattern':
                    'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
                'hero-glow':
                    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,255,0.12) 0%, transparent 70%)',
                'card-gradient':
                    'linear-gradient(135deg, rgba(22,25,38,0.9) 0%, rgba(17,19,24,0.95) 100%)',
            },

            backgroundSize: {
                'grid': '40px 40px',
            },

            animation: {
                'glow-pulse':  'glow-pulse 3s ease-in-out infinite',
                'float':       'float 6s ease-in-out infinite',
                'scan-line':   'scan-line 4s linear infinite',
            },

            keyframes: {
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 10px rgba(0,229,255,0.3)' },
                    '50%':      { boxShadow: '0 0 25px rgba(0,229,255,0.6)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%':      { transform: 'translateY(-12px)' },
                },
                'scan-line': {
                    '0%':   { top: '0%', opacity: '0.6' },
                    '100%': { top: '100%', opacity: '0' },
                },
            },
        },
    },

    plugins: [forms],
};
