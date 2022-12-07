module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "airbnb",
    "plugin:import/errors",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["prettier"],
  rules: {
    "arrow-body-style": 0,
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-unused-vars": "warn",
    "import/prefer-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
};
