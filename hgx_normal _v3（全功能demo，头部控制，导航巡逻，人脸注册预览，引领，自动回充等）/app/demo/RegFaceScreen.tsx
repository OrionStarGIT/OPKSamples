import { BaseComponent, triggerManager, BaseComponentProps, ComponentEvent, ComponentResultConst, ComponentErrorConst, RegisterComponent, RegisterParam } from 'orionos-eve-core';
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
export class RegFaceScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

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

    public recoverHeadFinish = (result?: ComponentEvent): boolean => {
        if (result) {
            switch (result.status) {
                case ComponentResultConst.RESULT_SUCCESS:
                    console.log('biantai_register_face_success', 'onFinish event success faceAppear true');
                    return true;
                case ComponentResultConst.RESULT_TIMEOUT:
                   console.log('biantai_register_face_timeout', 'onFinish event timeout faceAppear false');
                   return true;
                case ComponentErrorConst.ERROR_OPEN_PERSON_DETECT_FAILED:
                    console.log('biantai_register_face_failed', 'onFinish event error faceAppear false');
                    return true;
            }
        }
        console.log('biantai_register_face_false');
        return false;
     };

    public render() {
        console.log('register face');
        {/*人脸注册，需要签了协议之后才可以使用，默认不可用*/}
        let registerParam = new RegisterParam('雷超然', '', 200000, 200000);
        return (          
            <RegisterComponent
                param={registerParam}
                onFinish={this.recoverHeadFinish}
            />
        );

    }
}
