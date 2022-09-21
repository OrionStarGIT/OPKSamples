import { BaseComponent, triggerManager, BaseComponentProps, ComponentEvent, ComponentResultConst, ComponentErrorConst, FaceTrackParam, FaceTrackComponent } from 'orionos-eve-core';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { observer } from 'mobx-react';
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
export class FaceOneScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

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

    public onStatusUpdate = (event?: ComponentEvent): boolean => {
        console.log('biantai_face_track_one__onStatusUpdate', 'onFinish event error faceAppear false');
        //TODO: 状态处理
        return true;
    };
    

    public recoverHeadFinish = (result?: ComponentEvent): boolean => {
        if (result) {
            switch (result.status) {
                case ComponentResultConst.RESULT_SUCCESS:
                    console.log('biantai_face_track_one_success', 'onFinish event success faceAppear true');
                    return true;
                case ComponentResultConst.RESULT_TIMEOUT:
                   console.log('biantai_face_track_one__timeout', 'onFinish event timeout faceAppear false');
                   return true;
                case ComponentErrorConst.ERROR_OPEN_PERSON_DETECT_FAILED:
                    console.log('biantai_face_track_one__failed', 'onFinish event error faceAppear false');
                    return true;
            }
        }
        console.log('face_track_one_没有结果');
        return false;
     };

    public render() {
        console.log('face_track_one');
        let param = new FaceTrackParam(1);
        return (
            <FaceTrackComponent
                param={param}
                onStatusUpdate={this.onStatusUpdate}
                onFinish={this.recoverHeadFinish}
            />
        );

    }
}
