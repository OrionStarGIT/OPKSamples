import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoTrigger } from './DemoTrigger';
import { demoModel } from './DemoModel';

//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new DemoTrigger());
const TAG = 'DemoTrtcScreen'
const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    sideView: {
        width: '30%',
        height: '30%',
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: 'black'
    },
    infoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})
/**
 * 功能UI界面
 */
@observer
export class DemoScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

    public viewModel: DemoViewModel;
    private userId = '';
    private sdkAppId = 0;
    private roomId: number | undefined;
    private userSig = '';

    private isMuteLocalVideo = false;
    private isMuteLocalAudio = false;
    private isFront = true;
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
        demoModel.reset()
    }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
    }

    public render() {
        return (
            <View style={styles.mainView}>
                {demoModel.getIsEnterRoom() ? this.renderRoom() : this.renderHomePage()}
            </View>
        )
    }

    public renderHomePage(): React.ReactChild {
        return (
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 40 }}
                    placeholder='请输入房间号（只能包含数字）'
                    keyboardType='numeric'
                    onChangeText={this.setRoomId}
                />
                <Button title='进入房间' onPress={this.goRoom}></Button>
            </View>
        )
    }

    public renderRoom(): React.ReactChild {
        let remoteChild = React.createElement(global.RTCVIEW, {
            style: { width: '100%', height: '100%' },
            remoteParams: {
                userId: demoModel.getRemoteUserId()
            },
        });

        let localChild = React.createElement(global.RTCVIEW, {
            style: { width: '100%', height: '100%' },
            trtcParams: {
                sdkAppId: this.sdkAppId,
                userId: this.userId,
                roomId: this.roomId,
                userSig: this.userSig,
            },
            beautyParams: {
                beautyStyle: global.TRTC.TRTC_BEAUTY_STYLE_SMOOTH,
                beautyLevel: 2,
                whitenessLevel: 5,
                ruddinessLevel: 3,
            },
            videoParams: {
                videoResolution: global.TRTC.TRTC_VIDEO_RESOLUTION_1280_720,
                videoFps: 24,
                videoBitrate: 1200,
                minVideoBitrate: 700,
            },
            isFrontCamera: demoModel.getIsFrontCamera(),
            onRemoteUserEnterRoom: this.onRemoteUserEnterRoom,
            onRemoteUserLeaveRoom: this.onRemoteUserLeaveRoom,
            onEnterRoom: this.onEnterRoom,
            onExitRoom: this.onExitRoom,
            onUserVideoAvailable: this.onUserVideoAvailable,
            onError: this.onError
        });

        return (
            <View style={styles.mainView} >
                {localChild}
                <View style={styles.sideView} >
                    {remoteChild}
                </View>
                <View style={{ flexDirection: 'row', position: 'absolute', bottom: 10 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'blue', marginLeft: 10 }}
                        onPress={this.switchCamare}
                    >
                        <Text style={styles.infoText}>切换摄像头</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: 'blue', marginLeft: 10 }}
                        onPress={this.muteLocalVideo}
                    >
                        <Text style={styles.infoText}>暂停/恢复发布本地视频</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: 'blue', marginLeft: 10 }}
                        onPress={this.muteLocalAudio}
                    >
                        <Text style={styles.infoText}>暂停/恢复发布本地音频</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    private switchCamare = () => {
        //方法一：
       /*  global.TRTC.switchCamera() */
        //方法二：
        demoModel.setIsFrontCamera(!demoModel.getIsFrontCamera())
        this.isFront = !this.isFront
    }

    private muteLocalVideo = () => {
        this.isMuteLocalVideo = !this.isMuteLocalVideo
        if (this.isMuteLocalVideo) {
            global.TRTC.muteLocalVideo(this.isMuteLocalVideo)
            global.TRTC.stopLocalPreview()
        } else {
            //this.isFront，当前是否为前置摄像头
            global.TRTC.startLocalPreview(this.isFront)
            global.TRTC.muteLocalVideo(this.isMuteLocalVideo)
        }
    }

    private muteLocalAudio = () => {
        this.isMuteLocalAudio = !this.isMuteLocalAudio;
        global.TRTC.muteLocalAudio(this.isMuteLocalAudio)
    }

    private setRoomId = (text: string) => {
        this.roomId = Number(text)
    }

    private goRoom = () => {
        if (this.roomId) {
            demoModel.setIsEnterRoom(true)
        }
    }

    private onRemoteUserEnterRoom = (userId: string) => {
        console.log(TAG, 'RNTRTCView', 'onRemoteUserEnterRoom userId = ' + userId);
        demoModel.setRemoteUserId(userId)
    };

    private onRemoteUserLeaveRoom = (userId: string, reason: number) => {
        console.log(
            TAG, 'onRemoteUserLeaveRoom userId = ' + userId + '; reason = ' + reason
        );
    };

    private onEnterRoom = (result: number) => {
        console.log(TAG, 'onEnterRoom result = ' + result);
    };

    private onExitRoom = (reason: number) => {
        console.log(TAG, 'onExitRoom reason = ' + reason);
    };

    private onUserVideoAvailable = (userId: string, available: boolean) => {
        console.log(
            TAG,
            'onUserVideoAvailable userId = ' +
            userId +
            '; available = ' +
            available
        );
    };

    private onError = (errCode: any, errMsg: any, extraInfo: any) => {
        console.log(
            TAG,
            'onError errCode = ' +
            errCode +
            '; errMsg = ' +
            errMsg +
            '; extraInfo = ' +
            JSON.stringify(extraInfo)
        );
    };
}
