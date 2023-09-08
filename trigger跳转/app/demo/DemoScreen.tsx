import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Text, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedbackBase } from 'react-native';
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
                <TouchableOpacity onPress={this.triggerHome}><Text style={styles.buttons}>Trigger to Home</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.triggerWakeup}><Text style={styles.buttons}>Trigger to Wakeup</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.queryLocation}><Text style={styles.buttons}>Trigger to queryLocation</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.reception}><Text style={styles.buttons}>Trigger to reception</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.navigation}><Text style={styles.buttons}>Trigger to navigation</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.guide}><Text style={styles.buttons}>Trigger to guide</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.advert} disabled={true}><Text style={styles.buttons_red }>Trigger to advert</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.cruise}><Text style={styles.buttons}>Trigger to cruise</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.dance}><Text style={styles.buttons}>Trigger to dance</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.groupPhoto}><Text style={styles.buttons}>Trigger to groupPhoto</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.getProps}><Text style={styles.buttons}>Get Props</Text></TouchableOpacity>
            </View>
        );

    }

    public triggerHome = () => {
        this.viewModel.triggerHome();
    }

    public triggerWakeup = () => {
        this.viewModel.triggerHome();
    }

    public queryLocation = () => {
        this.viewModel.queryLocation();
    }

    public reception = () => {
        this.viewModel.reception();
    }

    public navigation = () => {
        this.viewModel.navigation();
    }

    public guide = () => {
        this.viewModel.guide();
    }

    public advert = () => {
        this.viewModel.advert();
    }

    public cruise = () => {
        this.viewModel.cruise();
    }

    public dance = () => {
        this.viewModel.dance();
    }

    public groupPhoto = () => {
        this.viewModel.groupPhoto();
    }

    public getProps = () => {
        this.viewModel.getProps();
    }
}
