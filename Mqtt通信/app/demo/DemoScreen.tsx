import {BaseComponent, triggerManager, BaseComponentProps} from 'orionos-eve-core';
import React from 'react';
import {observer} from 'mobx-react';
import {Text, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedbackBase, Button} from 'react-native';
import {DemoViewModel} from './DemoViewModel';
import {DemoVoice} from './DemoVoice';
import {DemoTrigger} from './DemoTrigger';
import {demoModel} from './DemoModel';

//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new DemoTrigger());
const styles = StyleSheet.create({
    items: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white',
        padding: 10,
    }
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
                <Button title={'初始化MQTT'} onPress={this.initMqttClient}/>
                <Button title={'发送Mqtt消息'} onPress={this.sendMqttTestMessage}/>
                <Button title={'断开MQTT'} onPress={this.closeMqttClient}/>
            </View>
        );
    }

    private initMqttClient = () => {
        this.viewModel?.initMqttClient();
    }

    private sendMqttTestMessage = () => {
        this.viewModel?.sendMqttTestMessage();
    }

    private closeMqttClient = () => {
        this.viewModel?.closeMqttClient();
    }
}
