import { BaseComponent, triggerManager, BaseComponentProps, PersonAppearComponent } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Text, View, Button } from 'react-native';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoTrigger } from './DemoTrigger';
import { demoModel } from './DemoModel';

//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new DemoTrigger());

/**
 * 功能UI界面
 */
@observer
export class OpkClientPageScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

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
        console.log('啦啦啦啦啦啦opkclientpage');
        return (
            <View>
                <Text style={{ fontSize: 17, color: 'red' }}> {demoModel.getInfoText()}</Text>
                <Button title={'Back To Home'} onPress={
                    () => {
                        this.viewModel.exit();
                    }
                }/>
            </View>
        );

    }
}
