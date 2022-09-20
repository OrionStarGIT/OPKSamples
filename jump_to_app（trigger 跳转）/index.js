/** @format */

import { AppRegistry } from 'react-native';
import { DemoScreen } from './app/demo/DemoScreen';
import App1 from './app/App1';
import { appid } from './package';
import { name as appName } from './app.json';
import AppDebug from './app/AppDebug';

//关闭其中某些yellow警告
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
// 关闭全部yellow警告
console.disableYellowBox = true;

//上线使用
AppRegistry.registerConfig([{
    appKey: 'jump_to_app',
    component: () => DemoScreen,
    intent: ['demonstrate_app&open'], //例如:'weather&get_weather'
    appId: appid,
    priority: 1
},{
    appKey: 'get_props',
    component: () => App1,
    appId: appid,
    ignoreConfig: true,
    priority: 3
}]);

//Debug调试使用
AppRegistry.registerComponent(appName, () => AppDebug);
