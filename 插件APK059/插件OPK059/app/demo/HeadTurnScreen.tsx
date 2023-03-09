import { BaseComponent, triggerManager, BaseComponentProps, NLPApkControl, NLPApkControlListener, speechApi, HeadTurnComponent, BasicMotionComponent, StandardFaceTrackComponent, ChargeStartComponent, NavigationComponent, RobotApi, CommandListener } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Text, View, Button, DeviceEventEmitter} from 'react-native';
import { HeadTurnViewModel } from '../headTurn/HeadTurnViewModel';
import { BasicMotionViewModel } from '../basicMotion/BasicMotionViewModel';
import { StandardFaceTrackViewModel } from '../standardFaceTrack/StandardFaceTrackViewModel';
import { ChargeStartViewModel } from '../chargeStart/ChargeStartViewModel';
import {MapViewModel} from '../map/MapViewModel';
import { NavigationViewModel } from '../navigation/NavigationViewModel';
import { HeadTurnVoice } from './HeadTurnVoice';
import { HeadTurnTrigger } from './HeadTurnTrigger';
import { HeadTurnView } from '../headTurn/HeadTurnView';
import { BasicMotionView } from '../basicMotion/BasicMotionView';
import { StandardFaceTrackView } from '../standardFaceTrack/StandardFaceTrackView';
import { ChargeStartView } from '../chargeStart/ChargeStartView';
import { NavigationView } from '../navigation/NavigationView';

//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new HeadTurnTrigger());
const TAG = 'shadow_opk_for_android----shadow_opk_for_android DemoScreen.tsx';
const FORWARD_SPEED = 0.1;
const BACKWARD_SPEED = -0.1;
const LEFT_SPEED = 0.1;
const RIGHT_SPEED = -0.1;
const SPEED_NONE = 0;
/**
 * 功能UI界面
 */
@observer
export class HeadTurnScreen extends BaseComponent<BaseComponentProps, HeadTurnViewModel, HeadTurnVoice> {

    private nlpApkControlListener: NLPApkControlListener | undefined;
    public viewModel: HeadTurnViewModel;
    public bviewModel: BasicMotionViewModel;
    public fviewModel: StandardFaceTrackViewModel;
    public cviewModel: ChargeStartViewModel;
    public mviewModel: MapViewModel;
    public nviewModel: NavigationViewModel;
    private callback?: CommandListener;
    private return_obj = {"command": "", "text": "", "code": -1, "messaage": ""};

    public constructor(props: BaseComponentProps) {
        super(props);
        global.recognition && global.recognition.setShow(false);
        this.nlpApkControlListener = new NLPApkControlListener();
        this.initListener();
        this.viewModel = new HeadTurnViewModel();
        this.bviewModel = new BasicMotionViewModel();
        this.fviewModel = new StandardFaceTrackViewModel();
        this.cviewModel = new ChargeStartViewModel();
        this.mviewModel = new MapViewModel();
        this.nviewModel = new NavigationViewModel();

        let voice = new HeadTurnVoice(this.viewModel);

        //关联ViewModel及Voice的生命周期到当前界面上
        this.setViewModel(this.viewModel);
        this.setVoice(voice);
        this.callback = new CommandListener();
        this.callback.addListener(
            CommandListener.EVENT_RESULT,
            (result: any) => {
                console.log(TAG, 'motionArcWithObstacles onResult', result);
            }
        );
        this.callback.addListener(
            CommandListener.EVENT_ONFINISH,
            (result: any) => {
                console.log(TAG, 'motionArcWithObstacles onFinish', result);
            }
        );
        this.callback.addListener(
            CommandListener.EVENT_STATUSUPDATE,
            (result: any) => {
                console.log(
                    TAG,
                    'motionArcWithObstacles onStatusUpdate',
                    result
                );
            }
        );
    }

    // public componentDidMount() {
    //     //重写界面的didMount，必须调用super
    //     super.componentDidMount();
    // }

    // public componentWillMount() {
    //     super.componentWillUnmount();
    // }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
        let obj = {"intent": "stop"};
        NLPApkControl.onRobotMessage('com.example.myfirstapp', JSON.stringify(obj));
    }

    private initListener = () => {
        this.nlpApkControlListener = new NLPApkControlListener();
        this.nlpApkControlListener.addListener(
            NLPApkControlListener.EVENT_ON_APP_NOT_RESPONDING ,
            (event: any) => {
                console.log(
                    TAG,
                    'EVENT_ON_APP_NOT_RESPONDING:' + JSON.stringify(event)
                );
            }
        );
        this.nlpApkControlListener.addListener(
            NLPApkControlListener.EVENT_ON_TRIGGER_COMMAND,
            (event: any) => {
                console.log(
                    TAG,
                    'EVENT_ON_TRIGGER_COMMAND:' + JSON.stringify(event)
                );
                if(event.eventdata){
                    let eventDataObj = JSON.parse(event.eventdata);
                    if(eventDataObj.command === "headUp"){
                        console.log(
                            TAG,
                            '1:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        //speechApi.playText(-1,text);
                        this.viewModel.setHeadAction("head");
                        let hMode = 'relative';
                        let hAngle = 0;
                        let vMode = 'relative';
                        let vAngle = -10;
                        if (eventDataObj.params !== "") {
                            //解析自己设置的参数，发送数据到APK
                            hMode = eventDataObj.params.hMode;
                            hAngle = eventDataObj.params.hAngle;
                            vMode = eventDataObj.params.vMode;
                            vAngle = eventDataObj.params.vAngle;
                        }
                        this.viewModel.onPressHeadUp(hMode, hAngle, vMode, vAngle);
                    } else if (eventDataObj.command === "headDown") {
                        console.log(
                            TAG,
                            '2:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        //speechApi.playText(-1,text);
                        this.viewModel.setHeadAction("head");
                        let hMode = 'relative';
                        let hAngle = 0;
                        let vMode = 'relative';
                        let vAngle = 10;
                        if (eventDataObj.params !== "") {
                            //解析自己设置的参数
                            hMode = eventDataObj.params.hMode;
                            hAngle = eventDataObj.params.hAngle;
                            vMode = eventDataObj.params.vMode;
                            vAngle = eventDataObj.params.vAngle;
                        }
                        this.viewModel.onPressHeadDown(hMode, hAngle, vMode, vAngle);
                    } else if (eventDataObj.command === "headLeft") {
                        console.log(
                            TAG,
                            '3:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        //speechApi.playText(-1,text);
                        this.viewModel.setHeadAction("head");
                        let hMode = 'relative';
                        let hAngle = -30;
                        let vMode = 'relative';
                        let vAngle = 0;
                        if (eventDataObj.params !== "") {
                            //解析自己设置的参数
                            hMode = eventDataObj.params.hMode;
                            hAngle = eventDataObj.params.hAngle;
                            vMode = eventDataObj.params.vMode;
                            vAngle = eventDataObj.params.vAngle;
                        }
                        this.viewModel.onPressTurnLeft(hMode, hAngle, vMode, vAngle);
                        //this.viewModel.onPressTurnLeft;
                    } else if (eventDataObj.command === "headRight") {
                        console.log(
                            TAG,
                            '4:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        //speechApi.playText(-1,text);
                        this.viewModel.setHeadAction("head");
                        let hMode = 'relative';
                        let hAngle = 30;
                        let vMode = 'relative';
                        let vAngle = 0;
                        if (eventDataObj.params !== "") {
                            //解析自己设置的参数
                            hMode = eventDataObj.params.hMode;
                            hAngle = eventDataObj.params.hAngle;
                            vMode = eventDataObj.params.vMode;
                            vAngle = eventDataObj.params.vAngle;
                        }
                        this.viewModel.onPressTurnRight(hMode, hAngle, vMode, vAngle);
                    } else if (eventDataObj.command === "bodyForward") {
                        console.log(
                            TAG,
                            '5:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        speechApi.playText(-1,text);
                        // this.viewModel.setHeadAction("body");
                        // this.bviewModel.onPressGoForward();
                        let lineSpeed = FORWARD_SPEED;
                        let angularSpeed = 0;
                        if (eventDataObj.params !== "") {
                            //解析自己设置的参数
                            lineSpeed = eventDataObj.params.lineSpeed;
                            angularSpeed = eventDataObj.params.angularSpeed;
                        }
                        RobotApi.motionArcWithObstacles(
                            this.callback ? this.callback.getId() : -1,
                            lineSpeed,
                            angularSpeed
                        );
                        this.return_obj.command = eventDataObj.command;
                        this.return_obj.text = eventDataObj.text;
                        this.return_obj.code = this.callback ? this.callback.getId() : -1;
                        let result = JSON.stringify(this.return_obj);
                        NLPApkControl.onRobotMessage('com.example.myfirstapp', result);
                    } else if (eventDataObj.command === "bodyBack") {
                        console.log(
                            TAG,
                            '6:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        speechApi.playText(-1,text);
                        // this.viewModel.setHeadAction("body");
                        // this.bviewModel.onPressGoBackward();
                        let lineSpeed = BACKWARD_SPEED;
                        let angularSpeed = 0;
                        if (eventDataObj.params !== "") {
                            //解析自己设置的参数
                            lineSpeed = eventDataObj.params.lineSpeed;
                            angularSpeed = eventDataObj.params.angularSpeed;
                        }
                        RobotApi.motionArcWithObstacles(
                            this.callback ? this.callback.getId() : -1,
                            lineSpeed,
                            angularSpeed
                        );
                        this.return_obj.command = eventDataObj.command;
                        this.return_obj.text = eventDataObj.text;
                        this.return_obj.code = this.callback ? this.callback.getId() : -1;
                        let result = JSON.stringify(this.return_obj);
                        NLPApkControl.onRobotMessage('com.example.myfirstapp', result);
                    } else if (eventDataObj.command === "bodyLeft") {
                        console.log(
                            TAG,
                            '7:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        speechApi.playText(-1,text);
                        // this.viewModel.setHeadAction("body");
                        // this.bviewModel.onPressTurnLeft();
                        let lineSpeed = 0;
                        let angularSpeed = LEFT_SPEED;
                        if (eventDataObj.params !== "") {
                            //解析自己设置的参数
                            lineSpeed = eventDataObj.params.lineSpeed;
                            angularSpeed = eventDataObj.params.angularSpeed;
                        }
                        RobotApi.motionArcWithObstacles(
                            this.callback ? this.callback.getId() : -1,
                            lineSpeed,
                            angularSpeed
                        );
                        this.return_obj.command = eventDataObj.command;
                        this.return_obj.text = eventDataObj.text;
                        this.return_obj.code = this.callback ? this.callback.getId() : -1;
                        let result = JSON.stringify(this.return_obj);
                        NLPApkControl.onRobotMessage('com.example.myfirstapp', result);
                    } else if (eventDataObj.command === "bodyRight") {
                        console.log(
                            TAG,
                            '8:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        speechApi.playText(-1,text);
                        // this.viewModel.setHeadAction("body");
                        // this.bviewModel.onPressTurnRight();
                        let lineSpeed = 0;
                        let angularSpeed = RIGHT_SPEED;
                        if (eventDataObj.params !== "") {
                            //解析自己设置的参数
                            lineSpeed = eventDataObj.params.lineSpeed;
                            angularSpeed = eventDataObj.params.angularSpeed;
                        }
                        RobotApi.motionArcWithObstacles(
                            this.callback ? this.callback.getId() : -1,
                            lineSpeed,
                            angularSpeed
                        );
                        this.return_obj.command = eventDataObj.command;
                        this.return_obj.text = eventDataObj.text;
                        this.return_obj.code = this.callback ? this.callback.getId() : -1;
                        let result = JSON.stringify(this.return_obj);
                        NLPApkControl.onRobotMessage('com.example.myfirstapp', result);
                    } else if (eventDataObj.command === "bodyStop") {
                        console.log(
                            TAG,
                            '9:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        // this.bviewModel.onPressStop();
                        // this.viewModel.setHeadAction("exit");
                        let lineSpeed = SPEED_NONE;
                        let angularSpeed = SPEED_NONE;
                        RobotApi.motionArcWithObstacles(
                            this.callback ? this.callback.getId() : -1,
                            lineSpeed,
                            angularSpeed
                        );
                        this.return_obj.command = eventDataObj.command;
                        this.return_obj.text = eventDataObj.text;
                        this.return_obj.code = this.callback ? this.callback.getId() : -1;
                        let result = JSON.stringify(this.return_obj);
                        NLPApkControl.onRobotMessage('com.example.myfirstapp', result);
                    } else if (eventDataObj.command === "traceFace") {
                        console.log(
                            TAG,
                            '10:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        //speechApi.playText(-1,text);
                        this.viewModel.setHeadAction("face");
                        this.fviewModel.onPressHeadUp();
                    } else if (eventDataObj.command === "stopTraceFace") {
                        console.log(
                            TAG,
                            '11:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        //speechApi.playText(-1,text);
                        this.fviewModel.onPressHeadDown();
                        this.viewModel.setHeadAction("exit");
                    } else if (eventDataObj.command === "map") {
                        console.log(
                            TAG,
                            '12:' + JSON.stringify(event)
                        );
                        this.viewModel.setHeadAction("mapSite");
                        this.mviewModel.getCurrPose().then(function(return_obj) {
                            console.log("输出当前坐标信息：" + return_obj);
                            let result = JSON.stringify(return_obj);
                            console.log("输出当前坐标数据信息：" + result);
                            NLPApkControl.onRobotMessage('com.example.myfirstapp',result);
                        });
                    } else if (eventDataObj.command === "currentPosition") {
                        console.log(
                            TAG,
                            '121:' + JSON.stringify(event)
                        );
                        //this.viewModel.setHeadAction("mapSite");
                        this.mviewModel.getCurrPosition().then(function(return_obj) {
                            console.log("输出当前坐标信息(不包含站点列表数据信息)：" + return_obj);
                            let result = JSON.stringify(return_obj);
                            console.log("输出当前坐标数据信息（字符串，不包含站点列表数据信息）：" + result);
                            NLPApkControl.onRobotMessage('com.example.myfirstapp',result);
                        });
                    } else if (eventDataObj.command === "gotoMapSite") {
                        console.log(
                            TAG,
                            '13:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        this.viewModel.setHeadAction("mapSite");
                        this.nviewModel.onPressStartNavigation(text);
                    } else if (eventDataObj.command === "stopMapSite") {
                        console.log(
                            TAG,
                            '14:' + JSON.stringify(event)
                        );
                        this.nviewModel.onPressStopNavigation();
                        this.viewModel.setHeadAction("exit");
                    } else if (eventDataObj.command === "speechPlay") {
                        console.log(
                            TAG,
                            '15:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        speechApi.playText(-1,text);
                        this.viewModel.setHeadAction("exit");
                        this.return_obj.command = eventDataObj.command;
                        this.return_obj.text = eventDataObj.text;
                        this.return_obj.code = 1;
                        let result = JSON.stringify(this.return_obj);
                        NLPApkControl.onRobotMessage('com.example.myfirstapp', result);
                    } else if (eventDataObj.command === "speechStop") {
                        console.log(
                            TAG,
                            '1:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        speechApi.stopTTS();
                        this.viewModel.setHeadAction("exit");
                        this.return_obj.command = eventDataObj.command;
                        this.return_obj.text = eventDataObj.text;
                        this.return_obj.code = 1;
                        let result = JSON.stringify(this.return_obj);
                        NLPApkControl.onRobotMessage('com.example.myfirstapp', result);
                    } else if (eventDataObj.command === "speechQuery") {
                        console.log(
                            TAG,
                            '16:' + JSON.stringify(event)
                        );
                        let text = eventDataObj.text;
                        speechApi.queryByText(text);
                        this.viewModel.setHeadAction("exit");
                        this.return_obj.command = eventDataObj.command;
                        this.return_obj.text = eventDataObj.text;
                        this.return_obj.code = 1;
                        let result = JSON.stringify(this.return_obj);
                        NLPApkControl.onRobotMessage('com.example.myfirstapp', result);
                    } else if (eventDataObj.command === "startCharge") {
                        console.log(
                            TAG,
                            '17:' + JSON.stringify(event)
                        );
                        console.log("开始充电");
                        this.viewModel.setHeadAction("charge");
                        this.cviewModel.onPressStartChargeStart();
                    } else if (eventDataObj.command === "stopCharge") {
                        console.log(
                            TAG,
                            '18:' + JSON.stringify(event)
                        );
                        console.log("停止充电");
                        this.cviewModel.onPressStopChargeStart();
                        this.viewModel.setHeadAction("exit");
                    } else if (eventDataObj.command === "triggerToOpk") {
                        console.log(
                            TAG,
                            '19:' + JSON.stringify(event)
                        );
                        console.log("OPK页面跳转操作");
                        this.triggerToOpk(eventDataObj.jumpNum);
                    } else if (eventDataObj.command === "exit") {
                        console.log(
                            TAG,
                            '20:' + JSON.stringify(event)
                        );
                        console.log("退出操作");
                        //NLPApkControl.forceStopPackage("com.example.myfirstapp");
                        this.goHome(this.viewModel.getTriggerNum());
                    }
                    
                }
            }
        );
        this.nlpApkControlListener.addListener(
            NLPApkControlListener.EVENT_ON_DATA_UPDATE,
            (event: any) => {
                console.log(
                    TAG,
                    'EVENT_ON_DATA_UPDATE:' + JSON.stringify(event)
                );
            }
        );
        this.nlpApkControlListener.addListener(
            NLPApkControlListener.EVENT_ON_PAGE_STATE_CHANGED,
            (event: any) => {
                console.log(
                    TAG,
                    'EVENT_ON_PAGE_STATE_CHANGED:' +
                        JSON.stringify(event)
                );
            }
        );
        this.nlpApkControlListener.addListener(
            NLPApkControlListener.EVENT_ON_PLAY_STATE_CHANGED,
            (event: any) => {
                console.log(
                    TAG,
                    'EVENT_ON_PLAY_STATE_CHANGED:' + JSON.stringify(event)
                );
            }
        );
        this.nlpApkControlListener.addListener(
            NLPApkControlListener.EVENT_ON_PROCESS_DIED,
            (event: any) => {
                console.log(TAG, 'EVENT_ON_PROCESS_DIED:' + JSON.stringify(event));
                this.goHome(this.viewModel.getTriggerNum());
            }
        );
        this.nlpApkControlListener.addListener(
            NLPApkControlListener.EVENT_ON_TOPACTIVITY_CHANGED,
            (event: any) => {
                console.log(
                    TAG,
                    'EVENT_ON_TOPACTIVITY_CHANGED:' + JSON.stringify(event)
                );
            }
        );
        this.nlpApkControlListener.addListener(
            NLPApkControlListener.EVENT_ON_PROCESS_VISIBLE,
            (event: any) => {
                console.log(TAG, 'EVENT_ON_PROCESS_VISIBLE:' + JSON.stringify(event));
            }
        );
        this.nlpApkControlListener.addListener(
            NLPApkControlListener.EVENT_ON_PROCESS_INVISIBLE,
            (event: any) => {
                console.log(
                    TAG,
                    'EVENT_ON_PROCESS_INVISIBLE:' + JSON.stringify(event)
                );
                NLPApkControl.forceStopPackage("com.example.myfirstapp");
                this.goHome(this.viewModel.getTriggerNum());
            }
        );
        this.nlpApkControlListener.addListener(
            NLPApkControlListener.EVENT_ON_SERVICE_CONNECTED,
            (event: any) => {
                console.log(
                    TAG,
                    'EVENT_ON_SERVICE_CONNECTED:' + JSON.stringify(event)
                );
            }
        );
        this.nlpApkControlListener.addListener(
            NLPApkControlListener.EVENT_ON_SERVICE_DISCONNECTED,
            (event: any) => {
                console.log(
                    TAG,
                    'EVENT_ON_SERVICE_DISCONNECTED:' + JSON.stringify(event)
                );
                this.goHome(this.viewModel.getTriggerNum());
            }
        );
        this.nlpApkControlListener.addListener(
            NLPApkControlListener.EVENT_ON_ROBOT_MESSENGER_READY,
            (event: any) => {
                console.log(
                    TAG,
                    'EVENT_ON_SERVICE_MESSENGER_READY:' + JSON.stringify(event)
                );
                let params_to_apk = this.props.navigation.state.params.result;
                let re_result = JSON.stringify(params_to_apk);
                NLPApkControl.onRobotMessage('com.example.myfirstapp', re_result);
            }
        );

        NLPApkControl.addListener(
            'com.example.myfirstapp',
            this.nlpApkControlListener.getId()
        );
    }

    private triggerToOpk = (jumpNum: number): void => {
        console.log(TAG, '跳转到wakeUp页面' + jumpNum);
        this.viewModel.setTriggerNum(jumpNum);
        //DeviceEventEmitter.emit("wakeup", "跳转到wakeUp页面信息");
        //this.nlpApkControlListener &&this.nlpApkControlListener.removeListener();
        console.log(TAG, '跳转到wakeUp页面1');
        //NLPApkControl.forceStopPackage("com.example.myfirstapp");
        this.return_obj.command = "shutDownAPP"+jumpNum;
        this.return_obj.text = "need close the running's app";
        this.return_obj.code = 1;
        let result = JSON.stringify(this.return_obj);
        NLPApkControl.onRobotMessage('com.example.myfirstapp', result);
        console.log(TAG, '跳转到wakeUp页面2');
        //this.viewModel.triggerToOpk();
    }

    private goHome(jumpNum: number): void {
        console.log(TAG, '跳转到gohome页面');
        this.viewModel.setHeadAction("exit");
        DeviceEventEmitter.emit("gohome", 0);
        this.nlpApkControlListener &&this.nlpApkControlListener.removeListener();
        this.viewModel.cancelCommand(jumpNum);
    }

    public render() {
        console.log('进入到了render方法' + "     getHeadAction方法获取的内容=====：" + this.viewModel.getHeadAction());
        if (this.viewModel.getHeadAction() == "") {
            // if (!this.nviewModel) {
            //     return null;
            // }
            // return (
            //     <>
            //         {/*导航*/}
            //         {this.nviewModel.isRunning() ? (
            //             <NavigationComponent
            //                 param={this.nviewModel.getParam()}
            //                 onStatusUpdate={this.nviewModel && this.nviewModel.onStatusUpdate}
            //                 onFinish={this.nviewModel && this.nviewModel.onFinish}/>
            //         ) : null}
            //         {/*界面*/}
            //         <NavigationView viewModel={this.nviewModel}/>
            //     </>
            // );
            // return(            
            //     <View>
            //         <Button title={"跳转到大眼睛页面"} onPress={this.triggerToOpk}/>
            //     </View>  
            // );
            let params_to_apk = this.props.navigation.state.params.result;
            this.viewModel.conDoctor(params_to_apk);
            return(null);
        } else if (this.viewModel.getHeadAction() == "head") {
            if (!this.viewModel) {
                return null;
            }
            console.log("进入到了render的0里面");
            return(
                <>
                    {/*头部运动组件*/}
                    {this.viewModel.isRunning() ? (
                        <HeadTurnComponent
                            param={this.viewModel.getHeadParam()}
                            onStatusUpdate={this.viewModel && this.viewModel.onStatusUpdate}
                            onFinish={this.viewModel&&this.viewModel.onFinish}/>
                    ) : null}
                    {/*界面*/}
                    <HeadTurnView viewModel={this.viewModel}/>
                </>
            );
        } else if (this.viewModel.getHeadAction() == "body") {
            if (!this.bviewModel) {
                return null;
            }
            console.log("进入到了render的1里面");
            return (
                <>
                    {/*运动组件*/}
                    {this.bviewModel.isRunning() ? (
                        <BasicMotionComponent
                            param={this.bviewModel.getParam()}
                            onFinish={this.bviewModel&&this.bviewModel.onFinish}/>
                    ) : null}
                    {/*界面*/}
                    <BasicMotionView viewModel={this.bviewModel}/>
                </>
            );
        } else if (this.viewModel.getHeadAction() == "face") {
            if (!this.fviewModel) {
                return null;
            }
            console.log("进入到了render的2里面");
            return (
                <>
                    {/*人脸跟随*/}
                    {this.fviewModel.isRunning() ? (
                        <StandardFaceTrackComponent
                            param={this.fviewModel.getParam()}
                            onStatusUpdate={this.fviewModel && this.fviewModel.onStatusUpdate}
                            onFinish={this.fviewModel && this.fviewModel.onFinish}/>
                    ) : null}
                    {/*界面*/}
                    <StandardFaceTrackView viewModel={this.fviewModel}/>
                </>
            );
        } else if (this.viewModel.getHeadAction() == "charge") {
            if (!this.cviewModel) {
                return null;
            }
            console.log("进入到了render的3里面");
            return (
                <>
                    {/*去充电*/}
                    {this.cviewModel.isRunning() ? (
                        <ChargeStartComponent
                            param={this.cviewModel.getParam()}
                            onStatusUpdate={this.cviewModel && this.cviewModel.onStatusUpdate}
                            onFinish={this.cviewModel && this.cviewModel.onFinish}/>
                    ) : null}
                    {/*界面*/}
                    <ChargeStartView viewModel={this.cviewModel}/>
                </>
            );
        } else if (this.viewModel.getHeadAction() == "mapSite") {
            if (!this.nviewModel) {
                return null;
            }
            return (
                <>
                    {/*导航*/}
                    {this.nviewModel.isRunning() ? (
                        <NavigationComponent
                            param={this.nviewModel.getParam()}
                            onStatusUpdate={this.nviewModel && this.nviewModel.onStatusUpdate}
                            onFinish={this.nviewModel && this.nviewModel.onFinish}/>
                    ) : null}
                    {/*界面*/}
                    <NavigationView viewModel={this.nviewModel}/>
                </>
            );
        } else if (this.viewModel.getHeadAction() == "exit") {
            console.log("进入到了render的null里面");
            // return(            
            //     <View>
            //         <Button title={"退出"} onPress={this.goHome}/>
            //     </View>  
            // );
            return (null);
        }
    }
}
