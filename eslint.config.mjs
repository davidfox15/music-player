import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: globals.browser,
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    reactHooks.configs['recommended-latest'],
    {
        rules: {
            'no-console': 'warn',
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
    {
        ignores: ['next.config.js', 'next-env.d.ts'],
    },
]
