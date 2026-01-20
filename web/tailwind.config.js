/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kakeibo: {
          need: '#10B981',     // 🟢 CẦN
          want: '#F59E0B',     // 🟡 MUỐN
          should: '#F97316',   // 🟠 NÊN
          can: '#3B82F6',      // 🔵 CÓ THỈ
        },
      },
    },
  },
  plugins: [],
};
