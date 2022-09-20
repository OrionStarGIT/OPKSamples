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
    ResetEstimateParam
} from 'orionos-eve-core';
import { ResetEstimateModel } from './ResetEstimateModel';

export class ResetEstimateViewModel extends BaseViewModel {

    //数据模块
    private mModel: ResetEstimateModel;

    /**
     * 构造函数
     */
    public constructor() {
        super('ResetEstimate');
        this.mModel = new ResetEstimateModel();
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
     * 点击视觉重定位
     */
    public onPressVisionResetEstimate = (): void => {
        this.mModel.visionResetEstimate();
    };

    /**
     * 点击视觉重定位
     */
    public onPressChargingPoleResetEstimate = (): void => {
        this.mModel.chargingPoleResetEstimate();
    };

    /**
     * 点击停止按钮
     */
    public onPressStop = (): void => {
        this.mModel.finishRunning();
    };

    /**
     * 重定位执行结果
     * @param event
     */
    public onFinish = (event?: ComponentEvent): boolean => {
        this.mModel.finishRunning();
        if (event && event.status) {
            switch (event.status) {
                case ComponentResultConst.RESULT_SUCCESS:
                    this.mModel.appendResultText(
                        'RESULT_SUCCESS(' + event.status + '): 重定位成功');
                    break;
                case ComponentResultConst.RESULT_RESET_ESTIMATE_FAIL:
                    this.mModel.appendResultText(
                        'RESULT_RESET_ESTIMATE_FAIL(' + event.status + '): 重定位失败');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 是否重定位中
     */
    public isRunning(): boolean {
        return this.mModel.isRunning();
    }

    /**
     * 获取重定位参数
     */
    public getParam(): ResetEstimateParam {
        return this.mModel.getParam();
    }

    /**
     * 获取重定位结果
     */
    public getResultText(): string {
        return this.mModel.getResultText();
    }

}