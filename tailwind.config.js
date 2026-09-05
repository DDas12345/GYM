/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kinetix: {
          950: '#07080B',
          900: '#0C0E14',
          850: '#11131C',
          800: '#171B26',
          700: '#212738',
          gold: '#E5A93C',
          'gold-light': '#F6CE7D',
          'gold-dark': '#B87B1E',
          cyan: '#00F2FE',
          emerald: '#10B981',
          crimson: '#FF2A54',
          muted: '#8B94A5',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-gold': 'rgba(229, 169, 60, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syncopate', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #F6CE7D 0%, #E5A93C 50%, #B87B1E 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(229, 169, 60, 0.25)',
        'gold-glow-lg': '0 0 45px rgba(229, 169, 60, 0.4)',
        'cyan-glow': '0 0 25px rgba(0, 242, 254, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
