module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true

    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "react/jsx-filename-extension": "off",
        "import/imports-first": 0,

        "react/no-array-index-key": "off"

    },
    "parser": "babel-eslint"
};


