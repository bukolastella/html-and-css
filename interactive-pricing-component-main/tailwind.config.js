module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // colors: {
    //   transparent: "transparent",
    //   current: "currentColor",
    //   pink: {
    //     softCyan: "hsl(174, 77%, 80%)",
    //     strongCyan: "hsl(174, 86%, 45%)",
    //     lightGrayishRed: "hsl(14, 92%, 95%)",
    //     lightRed: "hsl(15, 100%, 70%)",
    //     paleBlue: "hsl(226, 100%, 87%)",

    //     white: " hsl (0, 0%, 100%)",
    //     veryPaleBlue: " hsl(230, 100%, 99%)",
    //     lightGrayishBlue: "hsl(224, 65%, 95%)",
    //     lightGrayishBlue: "hsl(223, 50%, 87%)",
    //     grayishBlue: "hsl(225, 20%, 60%)",
    //     darkDesaturatedBlue: "hsl(227, 35%, 25%)",
    //   },
    // },
    // screens: {
    //   sm: "375px",
    // },
    fontFamily: {
      custom: ["Manrope", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
