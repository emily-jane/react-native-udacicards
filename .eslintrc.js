{
  "extends": [ "eslint:recommended", "plugin:react/recommended", "airbnb" ],
  "env": {
    “node”: true,
    “browser”: true,
  },
  "parserOptions": {
      ecmaVersion: 6,
      ecmaFeatures: {
          jsx: true,
      },
      sourceType: "module"
  },
  "plugins": [ "react" ]
};
