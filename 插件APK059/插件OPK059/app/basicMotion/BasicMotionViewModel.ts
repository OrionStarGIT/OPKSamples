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
    ComponentErrorConst,
    ComponentEvent,
    ComponentResultConst,
    BasicMotionParam
} from 'orionos-eve-core';
import { BasicMotionModel } from './BasicMotionModel';

export class BasicMotionViewModel extends BaseViewModel {

    //数据模块
    private mModel: BasicMotionModel;

    /**
     * 构造函数
     */
    public constructor() {
        super('BasicMotion');
        this.mModel = new BasicMotionModel();
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
     * 点击前进按钮
     */
    public onPressGoForward = (): void => {
        this.mModel.goForward();
    };

    /**
     * 点击后退按钮
     */
    public onPressGoBackward = (): void => {
        this.mModel.goBackward();
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
     * 运动执行结果
     * @param event-结果参数
     */
    public onFinish = (event?: ComponentEvent): boolean => {
        this.mModel.finishRunning();
        if (event && event.status) {
            switch (event.status) {
                case ComponentResultConst.RESULT_SUCCESS:
                    this.mModel.appendResultText(
                        'RESULT_SUCCESS(' + event.status + '): 执行完成');
                    break;
                case ComponentResultConst.RESULT_MOTION_STOP_SUCCESS:
                    this.mModel.appendResultText(
                        'RESULT_MOTION_STOP_SUCCESS(' + event.status + '): 停止成功');
                    break;
                case ComponentErrorConst.ERROR_PARAMS_BASIC_MOTION_BEAN_INVALID:
                    this.mModel.appendResultText(
                        'ERROR_PARAMS_BASIC_MOTION_BEAN_INVALID(' + event.status + '): 参数无效');
                    break;
                case ComponentErrorConst.ERROR_PARAMS_JSON_PARSER_ERROR:
                    this.mModel.appendResultText(
                        'ERROR_PARAMS_JSON_PARSER_ERROR(' + event.status + '): 参数错误');
                    break;
                case ComponentErrorConst.ERROR_MOTION_AVOID_STOP:
                    this.mModel.appendResultText(
                        'ERROR_MOTION_AVOID_STOP(' + event.status + '): 遇障碍物停止');
                    break;
                case ComponentErrorConst.ERROR_REQUEST_RES_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_REQUEST_RES_FAILED(' + event.status + '): 请求底盘失败');
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
    public getParam(): BasicMotionParam {
        return this.mModel.getParam();
    }

    /**
     * 获取运动结果
     */
    public getResultText(): string {
        return this.mModel.getResultText();
    }
}