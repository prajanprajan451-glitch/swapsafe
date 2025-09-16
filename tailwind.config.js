/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // light-gray
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // deep-forest-green
        background: 'var(--color-background)', // near-white
        foreground: 'var(--color-foreground)', // near-black
        primary: {
          DEFAULT: 'var(--color-primary)', // deep-forest-green
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // calming-blue-gray
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // clear-red
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // subtle-gray
          foreground: 'var(--color-muted-foreground)', // medium-gray
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // warm-amber
          foreground: 'var(--color-accent-foreground)', // near-black
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // near-black
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)', // near-black
        },
        success: {
          DEFAULT: 'var(--color-success)', // standard-green
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // attention-yellow
          foreground: 'var(--color-warning-foreground)', // near-black
        },
        error: {
          DEFAULT: 'var(--color-error)', // clear-red
          foreground: 'var(--color-error-foreground)', // white
        },
        surface: 'var(--color-surface)', // subtle-gray
        'text-primary': 'var(--color-text-primary)', // near-black
        'text-secondary': 'var(--color-text-secondary)', // medium-gray
      },
      fontFamily: {
        'sans': ['Source Sans 3', 'sans-serif'],
        'heading': ['Inter', 'sans-serif'],
        'caption': ['Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      transitionTimingFunction: {
        'smooth': 'ease-out',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        'smooth': '200ms',
        'spring': '300ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}