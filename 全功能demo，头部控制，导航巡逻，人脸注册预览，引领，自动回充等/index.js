/** @format */

import { AppRegistry } from 'react-native';
import DemoList from './app/DemoList';
import { name as appName } from './app.json';
import { appid } from './package.json';

//关闭其中某些yellow警告
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
// 关闭全部yellow警告
console.disableYellowBox = true;

//上线使用
AppRegistry.registerConfig([{
    appKey: 'Demo',
    component: () => DemoList,
    intent: ['demonstrate_app&open'], //例如:'weather&get_weather'
    appId: appid,
    priority: 1
}]);

//注册主界面，必须有
AppRegistry.registerComponent(appName, () => DemoList);
