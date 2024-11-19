import pluginJs from '@eslint/js'
import pluginJsdoc from 'eslint-plugin-jsdoc'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVitest from 'eslint-plugin-vitest'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

const files = ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
const noUnusedVarsOptions = { args: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' }

export default [
  { ignores: ['**/.history/*', '**/.vscode/*', '**/dist/*'] },
  { files },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    ...pluginReact.configs.flat.all,
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  pluginJsdoc.configs['flat/recommended-typescript'],
  {
    files,
    plugins: {
      'simple-import-sort': pluginSimpleImportSort,
      'react-hooks': pluginReactHooks
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', noUnusedVarsOptions],
      'max-len': [
        'warn',
        {
          code: 150, // Defer to Prettier
          comments: 100
        }
      ],
      'react/hook-use-state': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-curly-newline': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-indent': 'off',
      'react/jsx-indent-props': 'off',
      'react/jsx-max-props-per-line': 'off',
      'react/jsx-no-literals': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/react-in-jsx-scope': 'off',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn'
    }
  },
  {
    files: ['**/*.test.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      vitest: pluginVitest
    },
    rules: {
      ...pluginVitest.configs.recommended.rules,
      'jsdoc/require-jsdoc': 'off',
      'react/jsx-no-bind': 'off',
      'react/no-multi-comp': 'off'
    }
  }
]
