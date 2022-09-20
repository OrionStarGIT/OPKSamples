/** @format */

import { AppRegistry } from 'react-native';
import App from './app/App';
import { OpkClientPageScreen } from './app/demo/OpkClientPageScreen';
import { appid } from './package';
import { name as appName } from './app.json';
import AppDebug from './app/AppDebug';

//关闭其中某些yellow警告
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
// 关闭全部yellow警告
console.disableYellowBox = true;

//上线使用
AppRegistry.registerConfig([{
    appKey: 'Demo',
    component: () => App,
    intent: ['demonstrate_app&open'], //例如:'weather&get_weather'
    appId: appid,
    priority: 3
}, {
    appKey: 'opkclientpage',
    component: () => OpkClientPageScreen,
    priority: 1,
    ignoreConfig: true,
    appId: appid
}]);

//Debug调试使用
AppRegistry.registerComponent(appName, () => AppDebug);
