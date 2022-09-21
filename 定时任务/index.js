/** @format */

import { AppRegistry } from 'react-native';
import App from './app/App';
import { appid } from './package';
import { name as appName } from './app.json';
import AppDebug from './app/AppDebug';
import {cronParser} from './app/cronParser'

//关闭其中某些yellow警告
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
// 关闭全部yellow警告
console.disableYellowBox = true;

//上线使用
AppRegistry.registerConfig([{
    default: true,
    appKey: 'jiankangxiaowu',
    component: () => App,
    intent: 'demonstrate_app&open',
    appId: appid,
    priority: 1
}]);

//Debug调试使用
AppRegistry.registerComponent(appName, () => AppDebug);

//获取并执行任务列表
cronParser.checkTimerTask();

