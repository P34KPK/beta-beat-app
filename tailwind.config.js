export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#ffffff",
                "background-light": "#ffffff",
                "background-dark": "#000000",
                "surface-dark": "#0a0a0a",
                "border-dark": "#262626"
            },
        },
        fontFamily: {
            "display": ["Spline Sans", "Noto Sans", "sans-serif"],
            "body": ["Noto Sans", "sans-serif"],
        },
        borderRadius: { "DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px" },
    },
    plugins: [],
}
