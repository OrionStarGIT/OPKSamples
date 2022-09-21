module.exports = {
  root: true,
  extends: ['plugin:@typescript-eslint/recommended', 'koot'],
  plugins: ['react', 'orion-os'],
  rules: {
    semi: [1, 'always'],
    '@typescript-eslint/indent': 'warn',
    'orion-os/lifecycle-no-arrow-function': 'error',
    'orion-os/render-with-arrow-function': 'warn',
    'orion-os/timer-clear': 'warn',
    'orion-os/listener-remove': [
      'error',
      'always',
      [{
        obj: 'DeviceEventEmitter',
        add: 'addListener',
        remove: 'removeListener',
        assignRemove: 'remove'
      },
        {
          obj: 'DataCenterUtils.getInstance',
          add: 'registerListener',
          remove: 'unRegisterListener'
        },
        {
          superClass: 'TextListener',
          assignRemove: 'removeListener'
        }
      ]
    ],
    'orion-os/super-method': [
      'error',
      'always',
      [{
        superClass: 'BaseComponent',
        methods: [
          'constructor',
          'componentDidMount',
          'componentWillUnmount'
        ]
      }]
    ],
    'orion-os/autorun-remove': 'error'
  }
  // rules: {
  //     'no-use-before-define': ['error', { variables: false }],
  //     'no-constructor-vars': false
  // }
  // plugins: ["react", "react-native"],
  // globals: {
  //   fetch: true
  // },
  // parser: "babel-eslint",
  // parserOptions: {
  //   ecmaFeatures: {
  //     legacyDecorators: true,
  //     experimentalObjectRestSpread: true,
  //   },
  // }
};
