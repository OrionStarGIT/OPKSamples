import { BaseComponent, triggerManager, BaseComponentProps, FaceTrackSoundLocalizationComponent, SoundLocalizationParam, StandardFaceTrackParam } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Text, View } from 'react-native';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoTrigger } from './DemoTrigger';
import { demoModel } from './DemoModel';
import { RobotInfo } from '../config/RobotInfo';

//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new DemoTrigger());

/**
 * 功能UI界面
 */
@observer
export class DemoScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

    public viewModel: DemoViewModel;
    private personId: number = -1;

    public constructor(props: BaseComponentProps) {
        super(props);

        this.viewModel = new DemoViewModel();
        let voice = new DemoVoice(this.viewModel);

        //关联ViewModel及Voice的生命周期到当前界面上
        this.setViewModel(this.viewModel);
        this.setVoice(voice);

        let angle =
            props.navigation &&
            props.navigation.state &&
            props.navigation.state.params &&
            props.navigation.state.params.result &&
            props.navigation.state.params.result.angle || undefined;  

        let isMoveBody = !RobotInfo.isCharging;  

        let person =
            props.navigation &&
            props.navigation.state &&
            props.navigation.state.params &&
            props.navigation.state.params.person || undefined;
        this.personId = person && person.id || undefined;        

        this.viewModel.setSoundParams(new SoundLocalizationParam(angle, isMoveBody));
        this.viewModel.setFaceTrackParams(new StandardFaceTrackParam(this.personId, 3, 60, false, 7000, false, 2, isMoveBody));
        console.log("-----------------------------------啦啦啦啦啦啦啦");
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
                {!this.viewModel.getAvoidWakeupState() ? (
                    <FaceTrackSoundLocalizationComponent
                        onStatusUpdate={this.viewModel.onStatusUpdate}
                        onFinish={this.viewModel.onFaceTrackFinish}
                        soundLocalizationParam={this.viewModel.getSoundParams()}
                        standardFaceTrackParam={this.viewModel.getFaceTrackParams()}
                    />
                ) : <Text style={{ fontSize: 17, color: 'red' }}> {demoModel.getInfoText()}</Text>}
            </View>
        );

    }
}
