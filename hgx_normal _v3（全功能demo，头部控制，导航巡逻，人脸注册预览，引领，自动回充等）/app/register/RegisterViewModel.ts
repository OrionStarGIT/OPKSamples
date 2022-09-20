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
    RegisterParam
} from 'orionos-eve-core';
import { RegisterModel } from './RegisterModel';

export class RegisterViewModel extends BaseViewModel {

    //数据模块
    private mModel: RegisterModel;

    /**
     * 构造函数
     */
    public constructor() {
        super('Register');
        this.mModel = new RegisterModel();
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
     * 点击开始人脸注册
     */
    public onPressStartRegister = (): void => {
        this.mModel.startRegister('张三');
    };

    /**
     * 点击结束人脸注册
     */
    public onPressFinishRegister = (): void => {
        this.mModel.finishRunning();
    };

    /**
     * 人脸注册执行结果
     * @param event
     */
    public onFinish = (event?: ComponentEvent): boolean => {
        this.mModel.finishRunning();
        if (event && event.status) {
            switch (event.status) {
                case ComponentResultConst.RESULT_REGISTER_SUCCESS:
                    this.mModel.appendResultText(
                        'RESULT_REGISTER_SUCCESS(' + event.status + '): 注册成功');
                    break;
                case ComponentResultConst.RESULT_SUCCESS:
                    this.mModel.appendResultText(
                        'RESULT_SUCCESS(' + event.status + '): 注册成功');
                    break;
                case ComponentResultConst.RESULT_MODIFY_NAME_SUCCESS:
                    this.mModel.appendResultText(
                        'RESULT_MODIFY_NAME_SUCCESS(' + event.status + '): 修改名字成功');
                    break;
                case ComponentResultConst.RESULT_TIMEOUT:
                    this.mModel.appendResultText(
                        'RESULT_TIMEOUT(' + event.status + '): 注册超时');
                    break;
                case ComponentErrorConst.ERROR_PARAMS_REGISTER_ID_INVALID:
                    this.mModel.appendResultText(
                        'ERROR_PARAMS_REGISTER_ID_INVALID(' + event.status + '): 人物 ID 无效');
                    break;
                case ComponentErrorConst.ERROR_REGISTER_PICTURE_INVALID:
                    this.mModel.appendResultText(
                        'ERROR_REGISTER_PICTURE_INVALID(' + event.status + '): 图片无效');
                    break;
                default:
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 是否正在注册
     */
    public isRunning(): boolean {
        return this.mModel.isRunning();
    }

    /**
     * 获取注册参数
     */
    public getParam(): RegisterParam {
        return this.mModel.getParam();
    }

    /**
     * 获取注册结果
     */
    public getResultText(): string {
        return this.mModel.getResultText();
    }

}