module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
   rules: {
    "jsx-a11y/alt-text": ["warn", {
      "elements": ["img", "object", "area", "input[type='image']"],
      "img": ["Image"]
    }],
  },
}


