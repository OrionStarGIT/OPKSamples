/*
 *  Copyright (C) 2017 OrionStar Technology Project
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import IntentLauncher from 'react-native-intent-launcher';
import { action, observable } from 'mobx';
import {
    BaseViewModel,
    ComponentEvent,
    ComponentResultConst,
    ComponentErrorConst,
    ComponentStatusConst,
    HeadTurnParam,
    OpenAppApi,
    BasicMotionParam,
    NLPApkControl
} from 'orionos-eve-core';
import { HeadTurnModel } from './HeadTurnModel';
import { BasicMotionModel } from '../basicMotion/BasicMotionModel';

const TAG = 'shadow_opk_for_android HeadTurnViewModel.ts';
export class HeadTurnViewModel extends BaseViewModel {

    //头部数据模块
    private hModel: HeadTurnModel;
    //身体数据模块
    private bModel: BasicMotionModel;
    private headText: string | undefined;
    private return_obj = {"command": "", "text": "", "code": -1, "messaage": ""};

    /**
     * 构造函数
     */
    public constructor() {
        super('HeadTurn1199');
        this.hModel = new HeadTurnModel();
        this.bModel = new BasicMotionModel();
    }

    /**
     * 开始
     */
    public onStart(): void {

    }

    /**
     * 结束
     */
    public onStop(): void {

    }
    public triggerToOpk = (): void => {
        console.log(TAG, "trigger跳转到其他OPK页面");
        this._apiTrigger(36362227, '');
    }

    public cancelCommand = (jumpNum: number): void => {
        console.log(TAG, "退出");
        this._apiTrigger(jumpNum, '');
    };

    public exit() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1001, '');
    }

    public showSpeechText(text: string) {
        console.log('DemoVoice : set ' + text);
        HeadTurnModel.setInfoText(text);
    }

    /**
     * 点击抬头按钮
     */
    public onPressHeadUp = (hMode: string, hAngle: number, vMode: string, vAngle: number): void => {
        console.log("onPressHeadUp方法");
        this.hModel.headUp(hMode, hAngle, vMode, vAngle);
    };

    /**
     * 点击低头按钮
     */
    public onPressHeadDown = (hMode: string, hAngle: number, vMode: string, vAngle: number): void => {
        this.hModel.headDown(hMode, hAngle, vMode, vAngle);
    };

    /**
     * 点击左转按钮
     */
    public onPressTurnLeft = (hMode: string, hAngle: number, vMode: string, vAngle: number): void => {
        this.hModel.turnLeft(hMode, hAngle, vMode, vAngle);
    };

    /**
     * 点击右转按钮
     */
    public onPressTurnRight = (hMode: string, hAngle: number, vMode: string, vAngle: number): void => {
        this.hModel.turnRight(hMode, hAngle, vMode, vAngle);
    };

    /**
     * 运动执行状态
     */
    public onStatusUpdate = (event?: ComponentEvent): boolean => {
        if (event && event.status) {
            switch (event.status) {
                case ComponentStatusConst.STATUS_HEAD_TURN_START:
                    this.hModel.appendResultText(
                        'STATUS_HEAD_TURN_START(' + event.status + '): 开始执行');
                    break;
                case ComponentStatusConst.STATUS_TURN_HEAD_MAX_UP_ANGLE:
                    this.hModel.appendResultText(
                        'STATUS_TURN_HEAD_MAX_UP_ANGLE(' + event.status + '): 云台运动到了向上最大角度');
                    break;
                case ComponentStatusConst.STATUS_TURN_HEAD_MAX_DOWN_ANGLE:
                    this.hModel.appendResultText(
                        'STATUS_TURN_HEAD_MAX_DOWN_ANGLE(' + event.status + '): 云台运动到了向下最大角度');
                    break;
                default:
                    this.hModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 运动执行结果
     * @param event
     */
    public onFinish = (event?: ComponentEvent): boolean => {
        this.hModel.finishRunning();
        if (event && event.status) {
            this.return_obj.command = "headAction";
            this.return_obj.text = "head action";
            this.return_obj.code = event && event.status
            let result = JSON.stringify(this.return_obj);
            NLPApkControl.onRobotMessage('com.example.myfirstapp', result);
            console.log(TAG, "人脸追踪" + JSON.stringify(event));
            switch (event.status) {
                case ComponentResultConst.RESULT_HEAD_TURN_SUCCESS:
                    this.hModel.appendResultText(
                        'RESULT_HEAD_TURN_SUCCESS(' + event.status + '): 执行完成');
                    break;
                case ComponentErrorConst.ERROR_PARAMS_HEAD_TURN_BEAN_INVALID:
                    this.hModel.appendResultText(
                        'ERROR_PARAMS_HEAD_TURN_BEAN_INVALID(' + event.status + '): 参数无效');
                    break;
                case ComponentErrorConst.ERROR_HEAD_TURN_TIMEOUT:
                    this.hModel.appendResultText(
                        'ERROR_HEAD_TURN_TIMEOUT(' + event.status + '): 执行超时');
                    break;
                case ComponentErrorConst.ERROR_HEAD_TURN_FAILED:
                    this.hModel.appendResultText(
                        'ERROR_HEAD_TURN_FAILED(' + event.status + '): 执行失败');
                    break;
                case ComponentErrorConst.ERROR_HEAD_TURN_INTERRUPT:
                    this.hModel.appendResultText(
                        'ERROR_HEAD_TURN_INTERRUPT(' + event.status + '): 执行被打断');
                    break;
                default:
                    this.hModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 是否运动
     */
    public isRunning(): boolean {
        console.log("是否运动中。。。。");
        return this.hModel.isRunning();
    }

    /**
     * 获取头部参数
     */
    public getHeadParam(): HeadTurnParam {
        console.log("有没有进入到获取参数里面");
        return this.hModel.getParam();
    }

    /**
     * 获取运动参数
     */
    public getBodyParam(): BasicMotionParam {
        return this.bModel.getParam();
    }

    /**
     * 获取运动结果
     */
    public getResultText(): string {
        return this.hModel.getResultText();
    }

    public conDoctor = (obj: any): boolean => {
        //打开shadow_apk
        IntentLauncher.isAppInstalled('com.example.myfirstapp')
            .then((result: any) => {
                OpenAppApi.openThirdPartyAppIfKillRnForResult(
                    'com.example.myfirstapp',
                    'com.example.myfirstapp.MainActivity',
                    false
                ).then(() => {
                    // let re_result = JSON.stringify(obj);
                    // console.log("打开APK后发送语音指令数据信息：" + re_result);
                    // NLPApkControl.onRobotMessage('com.example.myfirstapp',re_result);
                });
            })
            .catch((error: any) => {
                console.log(TAG, 'IntentLauncher isAppInstalled: no', error);
                this._apiTrigger(1001, {});
            });
        return true;
    };

    /**
     * 获取运动结果
     */
    public getHeadAction(): string {
        return this.hModel.getInfoText();
    }

        /**
     * 获取运动结果
     */
    @action
    public setHeadAction(infoText: string) {
        this.hModel.setInfoText(infoText);
    }

    public setTriggerNum(jumpNum: number) {
        this.hModel.setTriggerNum(jumpNum);
    }

    public getTriggerNum(): number {
        return this.hModel.getTriggerNum();
    }

}