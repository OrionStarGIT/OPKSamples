/*
 *  Copyright (C) 2017 OrionStar Technology Project
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
