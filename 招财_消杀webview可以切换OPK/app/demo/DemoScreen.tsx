import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Text, View, WebView, TouchableOpacity } from 'react-native';
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
            <View style={{ width: '100%', height: '100%' }}>
                <WebView
                    style={{ width: '20%', height: '10%' }}
                    automaticallyAdjustContentInsets={true}
                    allowsInlineMediaPlayback={true}
                    source={{ uri: 'https://www.sina.com.cn/' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    mixedContentMode="compatibility"
                />
                <View style={{ position: 'absolute', width: 60}}>

                    <TouchableOpacity style={{ marginTop: 10, marginLeft: 15}} onPress={this.cancel} >
                        <Text>点击事件</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
    private cancel = (): void => {
        this.finishCurrentResource();
    };
    private finishCurrentResource() {
        console.log("only a click event llljjlllllllllll");
        //this.guideViewModel && this.guideViewModel.playResourceFromAskFree();
    }
}
