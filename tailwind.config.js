/** @type {import('tailwindcss').Config} */
export default {
    prefix: 'ns-',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                chatbox: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);'
            }
        },
    },
    plugins: [],
}

