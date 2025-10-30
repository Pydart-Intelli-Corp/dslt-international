/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Main background colors - exact Centure design match (darker)
        'dark-bg': '#0f0f1e',        // Very dark main background
        'dark-bg-deeper': '#0a0a15',  // Even darker for video backgrounds
        'dark-surface': '#151528',   // Container boxes/cards
        'dark-card': '#1a1a2e',      // Elevated card background
        'dark-surface-light': '#1f1f35',
        
        // Gradient colors for buttons and accents
        'gradient-start': '#572c7c',  // Purple gradient start
        'gradient-end': '#8231c7',    // Purple gradient end
        
        // Accent colors - Centure inspired
        'accent-blue': '#00d4ff',     // Bright cyan blue
        'accent-purple': '#572c7c',   // Primary purple
        'accent-purple-light': '#8231c7', // Light purple
        'accent-green': '#00ff88',    // Bright green
        'accent-cyan': '#00d4ff',     // Bright cyan
        'accent-pink': '#ff3d71',     // Pink accent
        
        // Text colors
        'text-primary': '#FFFFFF',    // Pure white for primary text
        'text-secondary': '#a0a3bd',  // Muted purple-gray for secondary text
        'text-muted': '#6b7280',      // More muted for tertiary text
        
        // Border and divider colors
        'border-color': '#2a2640',    // Subtle borders
        'border-accent': '#3d3a50',   // More visible borders
        
        // Glass morphism colors
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-purple': 'rgba(87, 44, 124, 0.2)',
        'glass-blue': 'rgba(0, 212, 255, 0.1)',
        
        // Status colors
        'success': '#00ff88',
        'warning': '#ffb800',
        'error': '#ff4757',
        'info': '#00d4ff',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-purple': 'linear-gradient(135deg, #572c7c 0%, #8231c7 100%)',
        'gradient-blue': 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'cyber-grid': 'linear-gradient(rgba(87, 44, 124, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(87, 44, 124, 0.1) 1px, transparent 1px)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '10px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(87, 44, 124, 0.37)',
        'glass-lg': '0 25px 50px -12px rgba(87, 44, 124, 0.25)',
        'neon': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(130, 49, 199, 0.5)',
      }
    },
  },
  plugins: [],
}