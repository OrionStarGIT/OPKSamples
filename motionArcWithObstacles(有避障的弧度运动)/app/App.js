import { BaseComponent } from 'orionos-eve-core';
import React from 'react';
import { DemoScreen } from './demo/DemoScreen';

/**
 * 主界面
 */
const TAG = 'demoApp'
export default class App extends BaseComponent {

    constructor(props) {
        super(props);

        console.log(TAG, 'constructor', props)
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
        return (<DemoScreen {...this.props}/>);
    }
}
