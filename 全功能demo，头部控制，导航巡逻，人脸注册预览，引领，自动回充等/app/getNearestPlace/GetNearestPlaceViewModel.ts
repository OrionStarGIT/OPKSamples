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
    ComponentErrorConst
} from 'orionos-eve-core';
import { GetNearestPlaceModel } from './GetNearestPlaceModel';

export class GetNearestPlaceViewModel extends BaseViewModel {

    //数据模块
    private mModel: GetNearestPlaceModel;

    /**
     * 构造函数
     */
    public constructor() {
        super('GetNearestPlace');
        this.mModel = new GetNearestPlaceModel();
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
     * 点击获取最近点
     */
    public onPressGetNearestPlace = (): void => {
        this.mModel.getNearestPlace();
    };

    /**
     * 获取最近点执行结果
     * @param event-结果参数
     */
    public onFinish = (event?: ComponentEvent): boolean => {
        this.mModel.stopRun();
        if (event && event.status) {
            switch (event.status) {
                case ComponentResultConst.RESULT_SUCCESS:
                    this.mModel.appendResultText(
                        'RESULT_SUCCESS(' + event.status + '): 获取成功');
                    if (event.data) {
                        let data = JSON.parse(event.data);
                        this.mModel.appendResultText(
                            '最近位置：' + data.name + '，    距离：' + data.distance);
                    }
                    break;
                case ComponentErrorConst.ERROR_NOT_ESTIMATE:
                    this.mModel.appendResultText(
                        'ERROR_NOT_ESTIMATE(' + event.status + '): 没有定位');
                    break;
                case ComponentErrorConst.ERROR_GET_PLACE_LIST_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_GET_PLACE_LIST_FAILED(' + event.status + '): 获取点位失败');
                    break;
                case ComponentErrorConst.ERROR_GET_PLACE_LIST_EMPTY:
                    this.mModel.appendResultText(
                        'ERROR_GET_PLACE_LIST_EMPTY(' + event.status + '): 没有点位');
                    break;
                case ComponentErrorConst.ERROR_GET_CURRENT_POSE_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_GET_CURRENT_POSE_FAILED(' + event.status + '): 获取当前位置失败');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 是否获取最近点中
     */
    public isRunning(): boolean {
        return this.mModel.isRunning();
    }

    /**
     * 获取执行结果
     */
    public getResultText(): string {
        return this.mModel.getResultText();
    }

}