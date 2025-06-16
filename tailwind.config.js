/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this to match your project structure
  ],
  darkMode: 'class',
  theme: {
    extend: {}, // Add customizations here if needed
  },
  plugins: [],

    theme: {
      extend: {
        animation: {
          bounce: 'bounce 0.6s infinite alternate',
        },
        keyframes: {
          bounce: {
            from: { transform: 'translateY(0)', opacity: '0.8' },
            to: { transform: 'translateY(-8px)', opacity: '0.4' },
          },
        },
      },
    },
};
