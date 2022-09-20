import { BaseComponent} from 'orionos-eve-core';
import React from 'react';
import { AppScreen } from './main/AppScreen';

const TAG = 'app.js';
/**
 * 主界面
 */
export default class App1 extends BaseComponent {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        super.componentDidMount();
    }
    
    componentWillUnmount() {
        super.componentWillUnmount();
    }

    render() {
        console.log("hgx_getPropsxxxxxxxxxxxxxxxxxxxxxxxApp.js" + this.props);
        return (<AppScreen {...this.props}/>);
    }
}
