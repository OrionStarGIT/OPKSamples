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
    HeadTurnParam
} from 'orionos-eve-core';
import { HeadTurnModel } from './HeadTurnModel';

export class HeadTurnViewModel extends BaseViewModel {

    //数据模块
    private mModel: HeadTurnModel;

    /**
     * 构造函数
     */
    public constructor() {
        super('HeadTurn');
        this.mModel = new HeadTurnModel();
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
     * 点击抬头按钮
     */
    public onPressHeadUp = (): void => {
        this.mModel.headUp();
    };

    /**
     * 点击低头按钮
     */
    public onPressHeadDown = (): void => {
        this.mModel.headDown();
    };

    /**
     * 点击左转按钮
     */
    public onPressTurnLeft = (): void => {
        this.mModel.turnLeft();
    };

    /**
     * 点击右转按钮
     */
    public onPressTurnRight = (): void => {
        this.mModel.turnRight();
    };

    /**
     * 点击停止按钮
     */
    public onPressStop = (): void => {
        this.mModel.finishRunning();
    };

    /**
     * 运动执行状态
     */
    public onStatusUpdate = (event?: ComponentEvent): boolean => {
        if (event && event.status) {
            switch (event.status) {
                case ComponentStatusConst.STATUS_HEAD_TURN_START:
                    this.mModel.appendResultText(
                        'STATUS_HEAD_TURN_START(' + event.status + '): 开始执行');
                    break;
                case ComponentStatusConst.STATUS_TURN_HEAD_MAX_UP_ANGLE:
                    this.mModel.appendResultText(
                        'STATUS_TURN_HEAD_MAX_UP_ANGLE(' + event.status + '): 云台运动到了向上最大角度');
                    break;
                case ComponentStatusConst.STATUS_TURN_HEAD_MAX_DOWN_ANGLE:
                    this.mModel.appendResultText(
                        'STATUS_TURN_HEAD_MAX_DOWN_ANGLE(' + event.status + '): 云台运动到了向下最大角度');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
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
        this.mModel.finishRunning();
        if (event && event.status) {
            switch (event.status) {
                case ComponentResultConst.RESULT_HEAD_TURN_SUCCESS:
                    this.mModel.appendResultText(
                        'RESULT_HEAD_TURN_SUCCESS(' + event.status + '): 执行完成');
                    break;
                case ComponentErrorConst.ERROR_PARAMS_HEAD_TURN_BEAN_INVALID:
                    this.mModel.appendResultText(
                        'ERROR_PARAMS_HEAD_TURN_BEAN_INVALID(' + event.status + '): 参数无效');
                    break;
                case ComponentErrorConst.ERROR_HEAD_TURN_TIMEOUT:
                    this.mModel.appendResultText(
                        'ERROR_HEAD_TURN_TIMEOUT(' + event.status + '): 执行超时');
                    break;
                case ComponentErrorConst.ERROR_HEAD_TURN_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_HEAD_TURN_FAILED(' + event.status + '): 执行失败');
                    break;
                case ComponentErrorConst.ERROR_HEAD_TURN_INTERRUPT:
                    this.mModel.appendResultText(
                        'ERROR_HEAD_TURN_INTERRUPT(' + event.status + '): 执行被打断');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 是否运动
     */
    public isRunning(): boolean {
        return this.mModel.isRunning();
    }

    /**
     * 获取运动参数
     */
    public getParam(): HeadTurnParam {
        return this.mModel.getParam();
    }

    /**
     * 获取运动结果
     */
    public getResultText(): string {
        return this.mModel.getResultText();
    }

}