import { BaseComponent, triggerManager, BaseComponentProps, emojiPlayerModel, PersonAppearComponent, PersonAppearParam, } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Text, View } from 'react-native';
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
export class DemoScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

    public viewModel: DemoViewModel;

    public constructor(props: BaseComponentProps) {
        super(props);
        emojiPlayerModel.setShow(true);
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
        if (this.viewModel.getFlag()) {
            console.log('啦啦啦啦getflag()方法进来了');
            emojiPlayerModel.setShow(false);
            return null;
        }
        console.log('啦啦啦啦啦啦1111');
        const personAppearParam = new PersonAppearParam(
            undefined, undefined, 0.5,
            undefined, false, undefined,
            undefined, true, false,
            undefined, 2 * 60 * 1000);
        return (
            <>
                <PersonAppearComponent
                    param={personAppearParam}
                    onFinish={this.viewModel && this.viewModel.onFinish}
                    onStatusUpdate={this.personAppearonUpdata}/>
            </>
        );

    }

    public personAppearonUpdata = (event: any): boolean => {
        console.log('personAppearonUpdata', event)
        if (event && event.status) {
            let path = event.data;
            let photoPath = String(path);
            if (photoPath) {
                photoPath = 'file://' + photoPath;
                console.log("personAppearonUpdata人脸图片地址：" + photoPath);
            }
        }
        return true;
    }
}
