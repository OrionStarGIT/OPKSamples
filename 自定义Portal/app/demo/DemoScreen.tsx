import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import {  Text, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedbackBase } from 'react-native';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoTrigger } from './DemoTrigger';
import { demoModel } from './DemoModel';

//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new DemoTrigger());
const styles = StyleSheet.create({
    items: {
        alignItems: 'center',
    },
    buttons: {
        width: 200,
        height: 20,
        marginTop: 3,
        backgroundColor: 'white',
        borderRadius: 2.3,
    },
    buttons_red: {
        width: 200,
        height: 20,
        marginTop: 3,
        backgroundColor: 'grey',
        borderRadius: 2.3,
        color: 'white',
    },
})
/**
 * 功能UI界面
 */
@observer
export class DemoScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

    public viewModel: DemoViewModel;

    public constructor(props: BaseComponentProps) {
        super(props);

        this.viewModel = new DemoViewModel();
        let voice = new DemoVoice(this.viewModel);

        //关联ViewModel及Voice的生命周期到当前界面上
        this.setViewModel(this.viewModel);
        this.setVoice(voice);
    }

    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();
    }

    public componentWillMount() {

    }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
    }

    public render() {
        return (
            <View style={styles.items}>
                <Text style={{ fontSize: 17, color: 'red' }}> {demoModel.getInfoText()}</Text>
                <TouchableOpacity onPress={this.queryLocation}><Text style={styles.buttons}>Trigger to queryLocation</Text></TouchableOpacity>
            </View>
        );

    }

    public queryLocation = () => {
        this.viewModel.queryLocation();
    }
}
