/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Palet Warna Khas Gumroad/Neo-Brutalism
        'dom-black': '#000000',
        'dom-white': '#ffffff',
        'dom-pink': '#FF90E8',   // Aksen Utama
        'dom-yellow': '#FFC900', // Aksen Sekunder
        'dom-blue': '#23A6D5',   // Aksen Tersier
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        // Hard Shadow (Kunci Neo-Brutalism)
        'neo': '5px 5px 0px 0px #000000',
        'neo-sm': '3px 3px 0px 0px #000000',
        'neo-hover': '2px 2px 0px 0px #000000', // Efek saat tombol ditekan
      },
      borderWidth: {
        '3': '3px', // Border tebal
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Tambahkan ini
  ],
}