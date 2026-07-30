/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sky: '#5EC8F2',
        ice: '#5ED7F2',
        teal: '#377D8C',
        dark: '#0D0D0D',
        'background-dark': '#0D0D0D',
        light: '#F2F2F2',
        pass: '#1A7A4A',
        fail: '#8B1A1A',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
