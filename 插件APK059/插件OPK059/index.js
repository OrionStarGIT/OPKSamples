/** @format */

import { AppRegistry } from 'react-native';
import App from './app/App';
import { appid } from './package';
import { name as appName } from './app.json';
import AppDebug from './app/AppDebug';

//关闭其中某些yellow警告
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
// 关闭全部yellow警告
console.disableYellowBox = true;

//上线使用
AppRegistry.registerConfig([{
    appKey: 'HeadTurn1199',
    component: () => App,
    intent: 'demonstrate_app&open', //例如:'weather&get_weather'
    //intent: ['smart_library&select_book', 'smart_library&onsultation_guide', 'smart_library&return_book', 'smart_library&borrow_book', 'smart_library&recommended_book', 'smart_library&find_book', 'smart_library&portuguese_guide'], //例如:'海恒客户'
    //intent: 'myyangji_open&open', //例如:'盟锐'
    // intent: 'open_apk&open_shangshu_show', //例如:'汇智机器人远程医疗'
    // intent: 'open_test_app&test_app', //例如:'上海青岚'
    // intent: 'apk_show&open_apk', //例如:'河北奇诺信息'
    // intent: 'open_ship&open_ship', //例如:'代理商深圳市大爱大白科技有限公司'
    // intent: 'cmri_call&cmri_call', //例如:'中移智家中心'
    appId: appid,
    priority: 1
}]);

//Debug调试使用
AppRegistry.registerComponent(appName, () => AppDebug);
