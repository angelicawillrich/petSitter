module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb-typescript",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        'max-len': ["error", { "code": 180 }],
        "semi": ["error", "never"],
        "@typescript-eslint/semi": "off",
        "no-unexpected-multiline": "error",
        "react/function-component-definition": [
            2,
            {
              namedComponents: "arrow-function",
              unnamedComponents: "arrow-function",
            },
        ],
        "react/prop-types": "off",
        "react/require-default-props": "off",
        "arrow-body-style": 0,
        'no-plusplus': 'off',
        "import/no-extraneous-dependencies": "off"
    }
};
