import { BaseComponent, triggerManager, BaseComponentProps, TextListener, speechApi} from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Button, Text, View } from 'react-native';
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
            <View>
                <Text style={{ fontSize: 17, color: 'red' }}>语音输出：{demoModel.getInfoText()}</Text>
                <Button title="播放tts" onPress={this.playText}></Button>
                <Button title="暂停tts" onPress={this.stopTTS}></Button>
                <Button title="启用语音识别" onPress={this.setRecognizableTrue}></Button>
                <Button title="关闭语音识别" onPress={this.setRecognizableFalse}></Button>
                <Button title="启用长拾音" onPress={this.setRecognizeModeTrue}></Button>
                <Button title="关闭长拾音" onPress={this.setRecognizeModeFalse}></Button>
                <Button title="识别文本内容" onPress={this.queryByText}></Button>
                <Button title="语音识别区域" onPress={this.setAngleCenterRange}></Button>
                <Button title="重置语音识别区域" onPress={this.resetAngleCenterRange}></Button>
            </View>
        );

    }

    public playText() {
        let listener = new TextListener();
        listener.setFinish(() => {
            //TODO: 播放完成
            listener.removeListener();
        });
        speechApi.playText(listener.getId(), '你好你好你好你好你好你好你好');
    }

    public stopTTS() {
        speechApi.stopTTS()
    }

    public setRecognizableTrue() {
        speechApi.setRecognizable(true);
    }

    public setRecognizableFalse() {
        speechApi.setRecognizable(false);
    }

    public setRecognizeModeTrue() {
        speechApi.setRecognizeMode(true);
    }

    public setRecognizeModeFalse() {
        speechApi.setRecognizeMode(false);
    }

    public queryByText() {
        speechApi.queryByText('打开天气');
    }

    public setAngleCenterRange() {
        speechApi.setAngleCenterRange(180, 120);
    }
    
    public resetAngleCenterRange() {
        speechApi.resetAngleCenterRange();
    }
}
