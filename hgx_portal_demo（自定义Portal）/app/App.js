import { BaseComponent } from 'orionos-eve-core';
import React from 'react';
import { DemoScreen } from './demo/DemoScreen';

/**
 * 主界面
 */
export default class App extends BaseComponent {

    constructor(props) {
        super(props);
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
