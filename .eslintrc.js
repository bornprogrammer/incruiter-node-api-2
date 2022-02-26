module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
    jquery: false,
    jest: true,
    jasmine: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  overrides: [
    {
      files: ["*/.js"],
      rules: {
        "func-names": ["error", "never"],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  },
};
