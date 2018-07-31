module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      'jsx': true
    }
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  globals: {
    __static: true
  },
  plugins: [
    'html',
    'react'
  ],
  'rules': {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // etc.
    'no-multi-spaces': 0,         // 0: 複数個の連続する空白を許可.
    'no-multiple-empty-lines': 0, // 0: 複数行の空行を許可.
    'comma-dangle': 1,            // 0: 最終要素の次のカンマを許可.
    'indent': 0,                  // switch~case, one-var, comment, その他に影響.
    'one-var': 0,
  }
}
