import { BaseComponent } from 'orionos-eve-core';
import React from 'react';
import { HeadTurnScreen } from './demo/HeadTurnScreen';

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
        return (<HeadTurnScreen {...this.props}/>);
    }
}
