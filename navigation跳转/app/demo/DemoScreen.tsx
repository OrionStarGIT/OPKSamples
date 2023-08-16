import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
import React from 'react';
import { Button, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';
import { observer } from 'mobx-react';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { demoModel } from './DemoModel';

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

        //throw new Error("TestException");
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
            <>
                <Text style={{ fontSize: 17, color: 'red' }}> {demoModel.getInfoText()}</Text>
                <Button title={'跳转Main'} onPress={
                    () => {
                        this.props.navigation && this.props.navigation.navigate('main', {test_data: 'demo to main data'});
                    }
                }/>

{/*                 <WebView
                    style={{ width: '100%', height: '100%' }}
                    automaticallyAdjustContentInsets={true}
                    allowsInlineMediaPlayback={true}
                    source={{ uri: 'https://m.baidu.com/' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    mixedContentMode="compatibility"
                /> */}
            </>
        );

    }
}
