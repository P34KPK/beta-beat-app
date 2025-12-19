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
            "mono": ["JetBrains Mono", "monospace"],
        },
        borderRadius: { "DEFAULT": "0px", "sm": "0px", "md": "0px", "lg": "0px", "xl": "0px", "2xl": "0px", "3xl": "0px", "full": "9999px" },
    },
    plugins: [],
}
