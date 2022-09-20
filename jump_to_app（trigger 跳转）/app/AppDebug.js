import { BaseComponent, triggerManager, listenersManager } from 'orionos-eve-core';
import React from 'react';
import { DeviceEventEmitter, Text, View } from 'react-native';
import { DemoScreen } from './demo/DemoScreen';

/**
 * Debug调试界面
 */
export default class AppDebug extends BaseComponent {

    constructor(props) {
        super(props);

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
        return (<DemoScreen/>);
    }
}
