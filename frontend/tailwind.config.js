/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "25.10rem", // 324px
      sm: "36rem", // 576
      md: "48rem", // 768
      lg: "62rem", // 992
      xl: "75rem", // 1200
      xxl: "87.5rem", // 1400
    },
    extend: {
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["lofi", "dark",], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "lofi", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}

