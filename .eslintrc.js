module.exports = {
  env: {
    browser: true,
    amd: true,
    es6: true
  },
  extends: ['eslint:recommended', 'p5js', 'p5js/dom', 'p5js/sound'],
  plugins: ['prettier'],
  rules: {

    // 'prettier/prettier': ['error', {
    //   singleQuote: true
    // }],

    'no-cond-assign': ['error', 'except-parens'],
    
    'no-use-before-define': ['error', {
      'classes': false,
      'functions': false
    }],

    'no-caller': 'error',

    'no-empty': ['error', {
      allowEmptyCatch: true
    }],

    // 'no-var': 'error',

    // eqeqeq: ['error', 'smart'],

    // "semi": ['error', 'always'],

    "linebreak-style": ['error', 'unix'],

    'no-unused-vars': 'off',
    // 'no-unused-vars': ['error', {
    //   "vars": "local"
    // }],

    'no-undef': 'off',
    // 'no-undef': 'error',

    'no-redeclare': 'off',
    // 'no-redeclare': ['error', {
    //   'builtinGlobals': false,
    // }],

    'no-prototype-builtins': 'off', // would be nice to remove

    'new-cap': 'off',

  },
  "parserOptions": {
    "ecmaVersion": 11,
  },
  'overrides': [
    
    // { // These overrides are for any external libraries used in sketches.
    //   'files': [
    //     '',
    //   ],
    //   'rules': {
    //     'no-var': 'off',
    //   },
    // }
  
  ],
};

// module.exports = {
//   "env": {
//     "browser": true,
//     "es6": true
//   },
//   "extends": "eslint:recommended",
//   "rules": {
//     "indent": [
//       "error",
//       4
//     ],
//     
//     "quotes": [
//       "error",
//       "single"
//     ],
//     "semi": [
//       "error",
//       "always"
//     ]
//   }
// };