module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@babel/eslint-parser",
  extends: [
    "airbnb-base",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    requireConfigFile: false,
  },
  rules: {
    "no-console": "off",
    "comma-dangle": 1,
    "quotes": ["error", "double"],
    "no-unsafe-optional-chaining": "off",
    "Linebreak-style": 0,
    "no-unused-vars": 0,
    "max-len": 0,
    "class-methods-use-this": "off",
    "import/extensions": [
      "error",
      {
        "js": "ignorePackages",
      },
    ],
  },
};
