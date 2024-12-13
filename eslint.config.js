import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import pluginQuery from 'eslint-plugin-react-hooks';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...pluginQuery.configs['flat/recommended'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all', // 모든 변수 검사
          args: 'after-used', // 사용하지 않는 매개변수 경고
          ignoreRestSiblings: true, // 나머지 연산자 무시
          varsIgnorePattern: '^_', // _로 시작하는 변수 무시
          argsIgnorePattern: '^_', // _로 시작하는 매개변수 무시
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'semi': ['error', 'always']
    },
  },
)
