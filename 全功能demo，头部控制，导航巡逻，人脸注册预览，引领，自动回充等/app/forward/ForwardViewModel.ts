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
    ForwardParam
} from 'orionos-eve-core';
import { ForwardModel } from './ForwardModel';

export class ForwardViewModel extends BaseViewModel {

    //数据模块
    private mModel: ForwardModel;

    /**
     * 构造函数
     */
    public constructor() {
        super('Forward');
        this.mModel = new ForwardModel();
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
     * 点击前进
     */
    public onPressGoForward = (): void => {
        this.mModel.goForward();
    };

    /**
     * 点击后退
     */
    public onPressGoBackward = (): void => {
        this.mModel.goBackward();
    };

    /**
     * 点击停止按钮
     */
    public onPressStop = (): void => {
        this.mModel.finishRunning();
    };

    /**
     * 运动执行结果
     * @param event
     */
    public onFinish = (event?: ComponentEvent): boolean => {
        this.mModel.finishRunning();
        if (event && event.status) {
            switch (event.status) {
                case ComponentResultConst.RESULT_SUCCESS:
                    this.mModel.appendResultText(
                        'RESULT_SUCCESS(' + event.status + '): 执行成功');
                    break;
                case ComponentErrorConst.ERROR_PARAMS_DISTANCE_INVALID:
                    this.mModel.appendResultText(
                        'ERROR_PARAMS_DISTANCE_INVALID(' + event.status + '): 距离参数无效');
                    break;
                case ComponentErrorConst.ERROR_NOT_ESTIMATE:
                    this.mModel.appendResultText(
                        'ERROR_NOT_ESTIMATE(' + event.status + '): 未定位异常');
                    break;
                case ComponentErrorConst.ERROR_GET_CURRENT_POSE_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_GET_CURRENT_POSE_FAILED(' + event.status + '): 获取当前所在点失败');
                    break;
                case ComponentErrorConst.ERROR_FORWARD_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_FORWARD_FAILED(' + event.status + '): 带避障前进失败');
                    break;
                case ComponentErrorConst.ERROR_NAVIGATION_OUT_MAP:
                    this.mModel.appendResultText(
                        'ERROR_NAVIGATION_OUT_MAP(' + event.status + '): 目标点在地图外或在噪点上');
                    break;
                case ComponentErrorConst.ERROR_NAVIGATION_GLOBAL_PATH_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_NAVIGATION_GLOBAL_PATH_FAILED(' + event.status + '): 全局路径规划失败');
                    break;
                case ComponentErrorConst.ERROR_FORWARD_TIMEOUT:
                    this.mModel.appendResultText(
                        'ERROR_FORWARD_TIMEOUT(' + event.status + '): 带避障前进超时');
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
    public getParam(): ForwardParam {
        return this.mModel.getParam();
    }

    /**
     * 获取运动结果
     */
    public getResultText(): string {
        return this.mModel.getResultText();
    }

}