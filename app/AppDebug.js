import { BaseComponent, triggerManager, listenersManager } from 'orionos-eve-core';
import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { DemoProvider } from './demo/DemoProvider';
import { ConfigUtils } from './demo/ConfigUtils';

/**
 * Debug调试入口
 */
export default class AppDebug extends BaseComponent {

    constructor(props) {
        super(props);
        ConfigUtils.loadServiceConfig();
        //在单独调试的时候需要添加，否则无法接收语音指令
        listenersManager.listen(DeviceEventEmitter);
        triggerManager.start();
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillMount() {
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    render() {
        return (<DemoProvider/>);
    }
}
