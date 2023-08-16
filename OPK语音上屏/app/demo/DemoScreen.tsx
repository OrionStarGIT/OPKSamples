import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
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

        this.viewModel = new DemoViewModel();
        let voice = new DemoVoice(this.viewModel);
        this.viewModel?.showRecognition(true);

        //关联ViewModel及Voice的生命周期到当前界面上
        this.setViewModel(this.viewModel);
        this.setVoice(voice);

        //若需要长拾音，请将参数改为true
        //详情请见：https://doc.orionstar.com/blog/knowledge-base/%e8%af%ad%e9%9f%b3-2/#undefined
        global.recognition && global.recognition.setRecognizeMode(false)

        //debug模式无法显示语音识别条
        //需要显示语音识别条，请使用orionos-sh run 再对小豹说"小豹小豹，打开开发者演示模式"
        global.recognition && global.recognition.setShow(true);
        global.recognition && global.recognition.setGuideArray(['提示1','提示2']);
        global.recognition && global.recognition.setGuideShow(true);
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
            <View>
                <Text style={{ fontSize: 17, color: 'red' }}> {demoModel.getInfoText()}</Text>
            </View>
        );

    }
}
