import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';
import AppDebug from './app/AppDebug';

//关闭其中某些yellow警告
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key'];
//关闭全部yellow警告
console.disableYellowBox = true;

//上线使用
AppRegistry.registerConfig([{
    //是否为此opk的默认场景
    default: true,
    //场景名称
    appKey: 'hello_robot_sample',
    //是否开机默认启动此场景
    portal: false,
    //场景入口
    component: () => App,
    //启动action，需配合语音使用
    action: 'action_demo',
    //优先级
    priority: 1
}]);

//Debug调试使用
AppRegistry.registerComponent(appName, () => AppDebug);
