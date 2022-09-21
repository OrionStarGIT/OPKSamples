import { BaseComponent, triggerManager, BaseComponentProps, RNCameraFilterView, CameraType } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Button, View } from 'react-native';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoTrigger } from './DemoTrigger';
import { demoModel } from './DemoModel';

const TAG = 'DemoScreen'
//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new DemoTrigger());

/**
 * 功能UI界面
 */
@observer
export class DemoScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

    public viewModel: DemoViewModel;
    public cameraView: any;

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
                <Button title="拍照" onPress={()=> {
                    console.log(TAG)
                    this.cameraView.saveSnapShot(true)
                }}></Button>
                <Button title="暂停预览" onPress={()=> {
                    console.log(TAG)
                    this.cameraView.pausePreview()
                }}></Button>
                <Button title="恢复预览" onPress={()=> {
                     console.log(TAG)
                    this.cameraView.resumePreview()
                }}></Button>
                <RNCameraFilterView
                    ref={ref => {
                        this.cameraView = ref;
                    }}
                    onCameraFilterInitSuccess={this.onCameraFilterInitSuccess}   //成功回调
                    onCameraFilterFailure={this.onCameraFilterFailure}   // 失败回调
                    onCameraFilterSnapShot={this.onCameraFilterSnapShot}  // 拍照回调
                    type={CameraType.CAMERA_SHARE}
                    style={{
                        width: 1200 / 3.5,
                        height: 2134 / 3.5,
                    }}
                />
            </View>
        );
    }

    public onCameraFilterInitSuccess() {
        console.log(TAG, 'onCameraFilterInitSuccess',)
    }
    public onCameraFilterFailure(errCode: number) {
        console.log(TAG, 'onCameraFilterFailure', errCode)
    }
    public onCameraFilterSnapShot(path: string) {
        console.log(TAG, 'onCameraFilterSnapShot', path)
    }
}
