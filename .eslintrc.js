module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:cypress/recommended",
        "plugin:storybook/recommended",
        "react-app"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.js"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "quotes": ["error", "single"],
        "prefer-const": "error",
        "no-duplicate-imports": "error",
        "no-trailing-spaces": "error",
        "no-multi-spaces": "error",
        "no-multiple-empty-lines": "error",
        "keyword-spacing": "error",
        "space-before-blocks": "error",
        "comma-dangle": [
            "error",
            {
                "arrays": "only-multiline",
                "objects": "only-multiline",
                "imports": "ignore",
                "exports": "only-multiline",
                "functions": "only-multiline"
            }
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-types": [
            "error",
            {
                "extendDefaults": true,
                "types": {
                    "{}": false
                }
            }
        ],
    }
}
