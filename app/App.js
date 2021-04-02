import { BaseComponent, emojiPlayerModel } from 'orionos-eve-core';
import React from 'react';
import { DemoProvider } from './demo/DemoProvider';
import { ConfigUtils } from './demo/ConfigUtils';

/**
 * 运行入口
 */
export default class App extends BaseComponent {

    constructor(props) {
        super(props);
        ConfigUtils.loadServiceConfig();
        emojiPlayerModel.setShow(false);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillMount() {
        console.log();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    render() {
        return (<DemoProvider/>);
    }
}
