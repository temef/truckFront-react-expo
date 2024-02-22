module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "universe/native",
    "plugin:react-native/all",
    "plugin:react-hooks/recommended",
    "plugin:import/typescript",
    "plugin:import/recommended",
  ],
  plugins: ["react", "react-native", "react-hooks"],
  rules: {
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-hooks/exhaustive-deps": "error",
    "react-native/no-color-literals": "off",
    "react-native/no-raw-text": "off",
    "react-native/no-single-element-style-arrays": 2,
    "react-native/no-inline-styles": "off",
    "react-native/sort-styles": "off",
  },
};
