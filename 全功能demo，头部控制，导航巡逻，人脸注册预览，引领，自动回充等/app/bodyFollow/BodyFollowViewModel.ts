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
    BodyFollowParam,
    ComponentStatusConst
} from 'orionos-eve-core';
import { BodyFollowModel } from './BodyFollowModel';

export class BodyFollowViewModel extends BaseViewModel {

    //数据模块
    private mModel: BodyFollowModel;

    /**
     * 构造函数
     */
    public constructor() {
        super('BodyFollow');
        this.mModel = new BodyFollowModel();
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
     * 点击开始人体追踪
     */
    public onPressStartFollow = (): void => {
        this.mModel.startFollow();
    };

    /**
     * 点击停止人体追踪
     */
    public onPressStopFollow = (): void => {
        this.mModel.finishRunning();
    };

    /**
     * 追踪状态
     * @param event-状态参数
     */
    public onStatusUpdate = (event?: ComponentEvent): boolean => {
        if (event && event.status) {
            switch (event.status) {
                case ComponentStatusConst.STATUS_TRACK_SUCCESS:
                    this.mModel.appendResultText(
                        'STATUS_TRACK_SUCCESS(' + event.status + '): 追踪成功');
                    break;
                case ComponentStatusConst.STATUS_FIND_PERSON_WARNING:
                    this.mModel.appendResultText(
                        'STATUS_FIND_PERSON_WARNING(' + event.status + '): 找到人');
                    break;
                case ComponentStatusConst.STATUS_FOLLOW_GUEST_NEAR:
                    this.mModel.appendResultText(
                        'STATUS_FOLLOW_GUEST_NEAR(' + event.status + '): 目标太近');
                    break;
                case ComponentStatusConst.STATUS_OBSTACLES_AVOID:
                    this.mModel.appendResultText(
                        'STATUS_OBSTACLES_AVOID(' + event.status + '): 1米内有障碍物，避停');
                    break;
                case ComponentStatusConst.STATUS_OBSTACLE_DISAPPEAR:
                    this.mModel.appendResultText(
                        'STATUS_OBSTACLE_DISAPPEAR(' + event.status + '): 避停解除');
                    break;
                case ComponentStatusConst.STATUS_FOLLOW_TRACKING:
                    this.mModel.appendResultText(
                        'STATUS_FOLLOW_TRACKING(' + event.status + '): 正在追踪');
                    break;
                case ComponentStatusConst.STATUS_FOLLOW_GUEST_LOST:
                    this.mModel.appendResultText(
                        'STATUS_FOLLOW_GUEST_LOST(' + event.status + '): 人丢失');
                    break;
                case ComponentStatusConst.STATUS_FOLLOW_GUEST_APPEAR:
                    this.mModel.appendResultText(
                        'STATUS_FOLLOW_GUEST_APPEAR(' + event.status + '): 人出现');
                    break;
                case ComponentStatusConst.STATUS_FOLLOW_PERSON_NULL_STOP:
                    this.mModel.appendResultText(
                        'STATUS_FOLLOW_PERSON_NULL_STOP(' + event.status + '): 人丢失，停止直线运动');
                    break;
                case ComponentStatusConst.STATUS_FOLLOW_RESET_TRACK:
                    this.mModel.appendResultText(
                        'STATUS_FOLLOW_RESET_TRACK(' + event.status + '): 人体初始化失败重试');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 追踪执行结果
     * @param event-结果参数
     */
    public onFinish = (event?: ComponentEvent): boolean => {
        this.mModel.finishRunning();
        if (event && event.status) {
            switch (event.status) {
                case ComponentErrorConst.ERROR_PARAMS_JSON_PARSER_ERROR:
                    this.mModel.appendResultText(
                        'ERROR_PARAMS_JSON_PARSER_ERROR(' + event.status + '): 参数错误');
                    break;
                case ComponentErrorConst.ERROR_PARAMS_FOLLOW_PERSON_ID_ERROR:
                    this.mModel.appendResultText(
                        'ERROR_PARAMS_FOLLOW_PERSON_ID_ERROR(' + event.status + '): 特定的人 id 错误');
                    break;
                case ComponentErrorConst.ERROR_OPEN_PERSON_DETECT_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_OPEN_PERSON_DETECT_FAILED(' + event.status + '): 找人监听注册错误');
                    break;
                case ComponentErrorConst.ERROR_FIND_PERSON_TIMEOUT:
                    this.mModel.appendResultText(
                        'ERROR_FIND_PERSON_TIMEOUT(' + event.status + '): 找人超时');
                    break;
                case ComponentErrorConst.ERROR_HEAD_TRACK_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_HEAD_TRACK_FAILED(' + event.status + '): 云台追踪失败');
                    break;
                case ComponentErrorConst.ERROR_TRACK_TARGET_NOT_FOUND:
                    this.mModel.appendResultText(
                        'ERROR_TRACK_TARGET_NOT_FOUND(' + event.status + '): 追踪目标没有找到');
                    break;
                case ComponentErrorConst.ERROR_HEAD_GUEST_LOST:
                    this.mModel.appendResultText(
                        'ERROR_HEAD_GUEST_LOST(' + event.status + '): 追踪目标丢失时间超时');
                    break;
                case ComponentErrorConst.ERROR_HEAD_NAVI_BLIND_TIMEOUT:
                    this.mModel.appendResultText(
                        'ERROR_HEAD_NAVI_BLIND_TIMEOUT(' + event.status + '): 导航中人丢失超时 (避障跟随)');
                    break;
                case ComponentErrorConst.ERROR_HEAD_SET_TRACK_TIMEOUT:
                    this.mModel.appendResultText(
                        'ERROR_HEAD_SET_TRACK_TIMEOUT(' + event.status + '): 切人体跟随模式，人体初始化超时');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 是否追踪
     */
    public isRunning(): boolean {
        return this.mModel.isRunning();
    }

    /**
     * 获取追踪参数
     */
    public getParam(): BodyFollowParam {
        return this.mModel.getParam();
    }

    /**
     * 获取追踪结果
     */
    public getResultText(): string {
        return this.mModel.getResultText();
    }
}