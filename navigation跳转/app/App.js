import {
    BaseComponent,
    listenersManager,
    TriggerNavigate
} from 'orionos-eve-core';
import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';
import { MainScreen } from './main/MainScreen';
import { DemoScreen } from './demo/DemoScreen';
import { AppVoice } from './AppVoice';

/**
 * 主界面
 */
export default class App extends BaseComponent {

    constructor(props) {
        super(props);
        this.setVoice(new AppVoice());
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    /**
     * 界面配置
     *
     * @return
     */
    initRouterConfig() {
        return {
            main: MainScreen,
            demo: DemoScreen
        };
    }

    render() {
        return (
            <>
                {this.initRouter()}
            </>
        );
    }

    /**
     * 初始化界面跳转路由
     *
     * @return {*}
     */
    initRouter() {
        let routes = this.initRouterConfig();
        const workFlowNavigator = createStackNavigator(routes,
            {
                initialRouteName: 'demo',
                defaultNavigationOptions: ({ navigation }) => {
                    return {
                        headerTransparent: true,
                        header: () => null,
                        gesturesEnabled: true,
                        headerBackTitle: null
                    };
                }

            }
        );
        let AppContainer = createAppContainer(workFlowNavigator);
        return (
            <AppContainer
                onNavigationStateChange={(preState, newState, action) => {
                    //界面变化监听
                }}
            />
        );
    }
}
