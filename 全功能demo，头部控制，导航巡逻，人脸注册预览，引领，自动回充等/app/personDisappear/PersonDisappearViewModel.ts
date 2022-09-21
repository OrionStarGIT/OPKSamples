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
    PersonDisappearParam,
    ComponentStatusConst
} from 'orionos-eve-core';
import { PersonDisappearModel } from './PersonDisappearModel';

export class PersonDisappearViewModel extends BaseViewModel {

    //数据模块
    private mModel: PersonDisappearModel;

    /**
     * 构造函数
     */
    public constructor() {
        super('PersonDisappear');
        this.mModel = new PersonDisappearModel();
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
     * 点击开始人离开检测
     */
    public onPressStartPersonDisappear = (): void => {
        this.mModel.startPersonDisappear();
    };

    /**
     * 点击结束人离开检测
     */
    public onPressFinishPersonDisappear = (): void => {
        this.mModel.finishRunning();
    };

    /**
     * 人离开检测执行状态
     */
    public onStatusUpdate = (event?: ComponentEvent): boolean => {
        if (event && event.status) {
            switch (event.status) {
                case ComponentStatusConst.STATUS_PERSON_LOST_TIMEOUT:
                    this.mModel.appendResultText(
                        'STATUS_PERSON_LOST_TIMEOUT(' + event.status + '): 人离开');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 人离开检测执行结果
     * @param event
     */
    public onFinish = (event?: ComponentEvent): boolean => {
        this.mModel.finishRunning();
        if (event && event.status) {
            switch (event.status) {
                case ComponentResultConst.RESULT_TIMEOUT:
                    this.mModel.appendResultText(
                        'RESULT_TIMEOUT(' + event.status + '): 人离开超时退出');
                    break;
                case ComponentErrorConst.ERROR_OPEN_PERSON_DETECT_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_PARAMS_REGISTER_ID_INVALID(' + event.status + '): 获取人脸数据失败');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 是否正在检测
     */
    public isRunning(): boolean {
        return this.mModel.isRunning();
    }

    /**
     * 获取检测参数
     */
    public getParam(): PersonDisappearParam {
        return this.mModel.getParam();
    }

    /**
     * 获取检测结果
     */
    public getResultText(): string {
        return this.mModel.getResultText();
    }
}