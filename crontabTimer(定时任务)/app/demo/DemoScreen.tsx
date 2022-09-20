import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Button, View } from 'react-native';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoTrigger } from './DemoTrigger';
import { demoModel } from './DemoModel';
import {cronParser} from '../cronParser';
//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new DemoTrigger());

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
        //保存任务列表至本地
        cronParser.storeCronList()
    }

    public render() {
        return (
            <View>
                <Button onPress={this.startTask} title="新建任务"></Button>
                <Button onPress={this.getTask} title="获取任务"></Button>
                <Button onPress={this.deleteTask} title="删除指定任务"></Button>
                <Button onPress={this.clearStore} title="清空任务"></Button>
            </View>
        );
    }

    public startTask = (): any => {
        //任务id（每个任务id不可重复）， 文法， 任务标识符
        cronParser.startCronTask('1', "*/1 * * * *", 'callback1');
    }

    public clearStore = (): any => {
        cronParser.clearStoreCronList()
    }

    public getTask = (): any => {
        return cronParser.getCronTaskList()
    }

    public deleteTask = (): any => {
        //传入任务id
        cronParser.deleteCronTask('1')
    }
   
}
