module.exports = {
  env: {
    browser: true,
    amd: true,
    es6: true
  },
  extends: ['eslint:recommended', 'p5js', 'p5js/dom', 'p5js/sound'],
  plugins: ['prettier'],
  rules: {

    'prettier/prettier': ['error', {
      singleQuote: true
    }],

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
    
    // These are overrides for files where changes would make it hard for those coming from the video to understand.

    {
      'files': [
        'Courses/programming_with_text/session02/2-0607_regexTestMatchExec/sketch.js',
      ],
      'rules': {
        'no-cond-assign': 'off',
      },
    },

    {
      'files': [
        'Courses/beginner_ml5/07_knn_classifier/P5/sketch.js',
      ],
      'rules': {
        'no-use-before-define': 'off',
      },
    },
  
  ],
};
