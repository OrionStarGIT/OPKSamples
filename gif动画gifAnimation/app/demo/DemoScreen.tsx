import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Image, Text, View } from 'react-native';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoTrigger } from './DemoTrigger';
import { demoModel } from './DemoModel';
import { QRCodeView } from "../control/QRCodeView";

//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new DemoTrigger());

/**
 * 功能UI界面
 */
@observer
export class DemoScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

    state = {
        text: 'weixin://wxpay/bizpayurl?pr=YTvXv8Jzz',
      };
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
                {/* <Text style={{ fontSize: 17, color: 'red' }}> {demoModel.getInfoText()}</Text>
                <Image
                        style={{
                            alignSelf: 'center',
                            width: '50%',
                            height: '70%'
                        }}
                        source={require('../../img/gif_is_charging3.gif')}
                        //source={{uri: 'data:image/png;base64,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'}}
                    />  */}
                    <QRCodeView demoViewModel={this.viewModel}/>
            </View>
        );

    }
}
