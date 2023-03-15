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
import {
    BaseViewModel,
    ComponentEvent,
    ComponentResultConst,
    ComponentErrorConst,
    ComponentStatusConst,
    StandardFaceTrackParam,
    NLPApkControl
} from 'orionos-eve-core';
import { ThirdApkInfo } from '../biz/base/ThirdApkInfo';
import { StandardFaceTrackModel } from './StandardFaceTrackModel';

export class StandardFaceTrackViewModel extends BaseViewModel {

    //数据模块
    private mModel: StandardFaceTrackModel;
    private return_obj = {"command": "", "text": "", "code": -1, "messaage": ""};
    /**
     * 构造函数
     */
    public constructor() {
        super('StandardFaceTrack');
        this.mModel = new StandardFaceTrackModel();
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

    /**
     * 点击开始人脸跟随
     */
    public onPressHeadUp = (): void => {
        this.mModel.startTrack();
    };

    /**
     * 点击结束人脸跟随
     */
    public onPressHeadDown = (): void => {
        this.mModel.finishRunning();
    };

    /**
     * 人脸跟随执行状态
     */
    public onStatusUpdate = (event?: ComponentEvent): boolean => {
        if (event && event.status) {
            switch (event.status) {
                case ComponentStatusConst.STATUS_TRACK_SUCCESS:
                    this.mModel.appendResultText(
                        'STATUS_TRACK_SUCCESS(' + event.status + '): 焦点跟随成功');
                    break;
                case ComponentStatusConst.STATUS_TRACK_END:
                    this.mModel.appendResultText(
                        'STATUS_TRACK_END(' + event.status + '): 单次焦点跟随结束，还会继续找人跟随');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 人脸跟随执行结果
     * @param event-结果参数
     */
    public onFinish = (event?: ComponentEvent): boolean => {
        this.mModel.finishRunning();
        if (event && event.status) {
            //身体 头部运动发送方式
            this.return_obj.command = "facAction";
            this.return_obj.text = "face action";
            this.return_obj.code = event.status;
            let result = JSON.stringify(this.return_obj);
            NLPApkControl.onRobotMessage(ThirdApkInfo.PACKAGE_NAME, result);
            switch (event.status) {
                case ComponentResultConst.RESULT_TIMEOUT:
                    this.mModel.appendResultText(
                        'RESULT_TIMEOUT(' + event.status + '): 执行超时');
                    break;
                case ComponentErrorConst.ERROR_OPEN_PERSON_DETECT_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_OPEN_PERSON_DETECT_FAILED(' + event.status + '): 获取人脸数据失败');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 获取跟随参数
     */
    public getParam(): StandardFaceTrackParam {
        return this.mModel.getParam();
    }

    /**
     * 是否正在跟随
     */
    public isRunning(): boolean {
        return this.mModel.isRunning();
    }

    /**
     * 获取跟随结果
     */
    public getResultText(): string {
        return this.mModel.getResultText();
    }

}