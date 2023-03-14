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

import { ThirdApkInfo } from '../biz/base/ThirdApkInfo';
import {
    BaseViewModel,
    ComponentEvent,
    ComponentResultConst,
    ComponentErrorConst,
    ComponentStatusConst,
    NavigationParam,
    NLPApkControl
} from 'orionos-eve-core';
import { NavigationModel } from './NavigationModel';

const TAG = 'shadow_opk_for_android navigationViewModel.ts';
export class NavigationViewModel extends BaseViewModel {

    //数据模块
    private mModel: NavigationModel;
    private return_obj = {"command": "", "text": "", "code": -1, "messaage": ""};

    /**
     * 构造函数
     */
    public constructor() {
        super('Navigation');
        this.mModel = new NavigationModel();
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
     * 点击开始导航
     */
    public onPressStartNavigation = (placeName: string): void => {
        this.mModel.startNavigation(placeName);
    };

    /**
     * 视图文件使用此方法
     */
    public onPressStartNavigationView = (): void => {
        this.mModel.startNavigation("接待点");
    };

    /**
     * 点击结束导航
     */
    public onPressStopNavigation = (): void => {
        this.mModel.finishRunning();
    };

    /**
     * 导航执行状态
     */
    public onStatusUpdate = (event?: ComponentEvent): boolean => {
        if (event && event.status) {
            switch (event.status) {
                case ComponentStatusConst.STATUS_NAVIGATION_AVOID_START:
                    this.mModel.appendResultText(
                        'STATUS_NAVIGATION_AVOID_START(' + event.status + '): 堵死状态开始');
                    break;
                case ComponentStatusConst.STATUS_NAVIGATION_AVOID_END:
                    this.mModel.appendResultText(
                        'STATUS_NAVIGATION_AVOID_END(' + event.status + '): 堵死状态结束');
                    break;
                case ComponentStatusConst.STATUS_OBSTACLES_AVOID:
                    this.mModel.appendResultText(
                        'STATUS_OBSTACLES_AVOID(' + event.status + '): 避停状态');
                    break;
                case ComponentStatusConst.STATUS_START_NAVIGATION:
                    this.mModel.appendResultText(
                        'STATUS_START_NAVIGATION(' + event.status + '): 底盘启动导航成功');
                    break;
                case ComponentStatusConst.STATUS_NAVIGATION_AVOID:
                    this.mModel.appendResultText(
                        'STATUS_NAVIGATION_AVOID(' + event.status + '): 堵死计数上报');
                    break;
                case ComponentStatusConst.STATUS_ESTIMATE_LOST:
                    this.mModel.appendResultText(
                        'STATUS_ESTIMATE_LOST(' + event.status + '): 定位丢失');
                    break;
                case ComponentStatusConst.STATUS_DISTANCE_WITH_DESTINATION:
                    this.mModel.appendResultText(
                        'STATUS_DISTANCE_WITH_DESTINATION(' + event.status + '): 距离目标点' + event.data + '米');
                    break;
                case ComponentStatusConst.STATUS_NAVIGATION_NEAR_DESTINATION:
                    this.mModel.appendResultText(
                        'STATUS_NAVIGATION_NEAR_DESTINATION(' + event.status + '): 靠近目标点');
                    break;
                case ComponentStatusConst.STATUS_NAVIGATION_RESET_ESTIMATE_SUCCESS:
                    this.mModel.appendResultText(
                        'STATUS_NAVIGATION_RESET_ESTIMATE_SUCCESS(' + event.status + '): 运动任务中重定位成功');
                    break;
                case ComponentStatusConst.STATUS_NAVIGATION_AVOID_IMMEDIATELY:
                    this.mModel.appendResultText(
                        'STATUS_NAVIGATION_AVOID_IMMEDIATELY(' + event.status + '): 导航避障里面上报状态');
                    break;
                case ComponentStatusConst.STATUS_NAVIGATION_GO_STRAIGHT:
                    this.mModel.appendResultText(
                        'STATUS_NAVIGATION_GO_STRAIGHT(' + event.status + '): 导航直行');
                    break;
                case ComponentStatusConst.STATUS_NAVIGATION_TURN_LEFT:
                    this.mModel.appendResultText(
                        'STATUS_NAVIGATION_TURN_LEFT(' + event.status + '): 导航左转');
                    break;
                case ComponentStatusConst.STATUS_NAVIGATION_TURN_RIGHT:
                    this.mModel.appendResultText(
                        'STATUS_NAVIGATION_TURN_RIGHT(' + event.status + '): 导航右转');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 导航执行结果
     * @param event-结果参数
     */
    public onFinish = (event?: ComponentEvent): boolean => {
        this.mModel.finishRunning();
        if (event && event.status) {
            this.return_obj.command = "naviAction";
            this.return_obj.text = "navigation action";
            this.return_obj.code = event && event.status
            let result = JSON.stringify(this.return_obj);
            NLPApkControl.onRobotMessage(ThirdApkInfo.PACKAGE_NAME, result);
            console.log(TAG, "导航追踪" + JSON.stringify(event));
            switch (event.status) {
                case ComponentResultConst.RESULT_NAVIGATION_ARRIVED:
                    this.mModel.appendResultText(
                        'RESULT_NAVIGATION_ARRIVED(' + event.status + '): 成功到达目的地');
                    break;
                case ComponentResultConst.RESULT_NAVIGATION_FAILURE:
                    this.mModel.appendResultText(
                        'RESULT_NAVIGATION_FAILURE(' + event.status + '): 底盘启动导航任务失败');
                    break;
                case ComponentErrorConst.ERROR_PARAMS_PLACE_NAME_INVALID:
                    this.mModel.appendResultText(
                        'ERROR_PARAMS_PLACE_NAME_INVALID(' + event.status + '): 地点名称参数无效');
                    break;
                case ComponentErrorConst.ERROR_NOT_ESTIMATE:
                    this.mModel.appendResultText(
                        'ERROR_NOT_ESTIMATE(' + event.status + '): 未定位异常');
                    break;
                case ComponentErrorConst.ERROR_NAVIGATION_ALREADY_IN_DESTINATION:
                    this.mModel.appendResultText(
                        'ERROR_NAVIGATION_ALREADY_IN_DESTINATION(' + event.status + '): 已经处于目标点位置');
                    break;
                case ComponentErrorConst.ERROR_DESTINATION_NOT_EXIST:
                    this.mModel.appendResultText(
                        'ERROR_DESTINATION_NOT_EXIST(' + event.status + '): 目标点不存在');
                    break;
                case ComponentErrorConst.ERROR_REQUEST_RES_BUSY:
                    this.mModel.appendResultText(
                        'ERROR_REQUEST_RES_BUSY(' + event.status + '): 申请机器人底盘资源正在占用');
                    break;
                case ComponentErrorConst.ERROR_REQUEST_RES_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_REQUEST_RES_FAILED(' + event.status + '): 申请机器人底盘资源失败');
                    break;
                case ComponentErrorConst.ERROR_NAVIGATION_OUT_MAP:
                    this.mModel.appendResultText(
                        'ERROR_NAVIGATION_OUT_MAP(' + event.status + '): 目标点在地图外或在糟点上');
                    break;
                case ComponentErrorConst.ERROR_NAVIGATION_GLOBAL_PATH_FAILED:
                    this.mModel.appendResultText(
                        'ERROR_NAVIGATION_GLOBAL_PATH_FAILED(' + event.status + '): 全局路径规划失败');
                    break;
                case ComponentErrorConst.ERROR_NAVIGATION_RESET_ESTIMATE_FAIL:
                    this.mModel.appendResultText(
                        'ERROR_NAVIGATION_RESET_ESTIMATE_FAIL(' + event.status + '): 重定位失败');
                    break;
                case ComponentErrorConst.ERROR_DESTINATION_CAN_NOT_ARRIVE:
                    this.mModel.appendResultText(
                        'ERROR_DESTINATION_CAN_NOT_ARRIVE(' + event.status + '): 机器无位移超时');
                    break;
                case ComponentErrorConst.ERROR_NAVIGATION_AVOID_TIMEOUT:
                    this.mModel.appendResultText(
                        'ERROR_NAVIGATION_AVOID_TIMEOUT(' + event.status + '): 堵死状态超时');
                    break;
                case ComponentErrorConst.ERROR_PARAMS_JSON_PARSER_ERROR:
                    this.mModel.appendResultText(
                        'ERROR_PARAMS_JSON_PARSER_ERROR(' + event.status + '): 参数解析错误');
                    break;
                case ComponentErrorConst.ERROR_WHEEL_OVER_CURRENT_RUN_OUT    :
                    this.mModel.appendResultText(
                        'ERROR_WHEEL_OVER_CURRENT_RUN_OUT\t(' + event.status + '): 过流重试结束');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 获取导航参数
     */
    public getParam(): NavigationParam {
        return this.mModel.getParam();
    }

    /**
     * 是否正在导航
     */
    public isRunning(): boolean {
        return this.mModel.isRunning();
    }

    /**
     * 获取导航结果
     */
    public getResultText(): string {
        return this.mModel.getResultText();
    }
}