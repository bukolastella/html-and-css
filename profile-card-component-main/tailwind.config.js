module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "pattern-top": "url('/images/bg-pattern-top.svg')",
        "pattern-down": "url('images\bg-pattern-bottom.svg')",
      }),
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "hsl(185, 75%, 39%)",
        secondary: "hsl(229, 23%, 23%)",
        danger: "hsl(227, 10%, 46%)",
        last: "hsl(0, 0%, 59%)",
      }),
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
